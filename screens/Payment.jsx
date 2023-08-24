import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import { useStripe } from "@stripe/stripe-react-native";
import axios from "axios";
import SubscribeCard from "react-native-subscribe-card";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Payment = ({ navigation, route }) => {
  const [select, setSelect] = React.useState(3);
  const [price, setPrice] = React.useState(1500);
  const [disable, setDisable] = React.useState(false);
  const stripe = useStripe();

  const { query,seller,category } = route.params;

  const handlePayment = async () => {
    setDisable(true);
    try {
      const d = {
        name: seller.name,
        amount: price,
        email: seller.email,
      };
      const response = await fetch("http://64.227.172.50:5000/api/v1/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d),
      });

      const resData = await response.json();
      if (!response.ok) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Payment failed",
          textBody: resData.message,
        });
        setDisable(false);
        return;
      }
      const clientSecret = resData.clientSecret;

      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Construction Bazaar",
        googlePay: true,
      });

      if (initSheet.error) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Payment failed",
          textBody: initSheet.error ? initSheet.error.message : "Something went wrong!",
        });
        console.log(initSheet.error)
        setDisable(false);
        return;
      }
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "Payment Cancelled",
          textBody: "You have cancelled the payment",
        });
        setDisable(false);
        return;
      }

      const myForm = new FormData();

      myForm.append("wallet", seller.wallet+d.amount*2);
      axios
        .put("http://64.227.172.50:5000/api/v1/me/update", myForm, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.success) {
            storeData(response.data.user);
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Success",
              textBody: "Payment successfully added to your wallet",
            });
            setDisable(false);
            navigation.navigate("pay", { query:query,seller:seller,category:category })
          } else {
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: "Error",
              textBody: "Something went wrong!, try again later",
            });
            setDisable(false);
          }
        });
    } catch (err) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: err.response.data.message,
      });
      setDisable(false);
    }
  };
  function handleSelect(cardIndex, price) {
    setPrice(price);
    setSelect(cardIndex);
  }
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      // saving error
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.pricingContainer}>
        <Text style={styles.heading}>Subscription Plan</Text>
        <Text style={styles.subheading}>
          Choose a subscription plan to unlock all the functionality of the
          application
        </Text>
      </View>
      <SubscribeCard
        discountText="Save 100%"
        title="Basic plan"
        descriptionPrice="₹500"
        description=" You will get 1000 coins"
        currency="₹"
        price={500}
        timePostfix="/6mo"
        isSelected={select === 1 ? "false" : ""}
        onPress={() => handleSelect(1, 500)}
      />
      <SubscribeCard
        discountText="Save 100%"
        title="Silver plan"
        descriptionPrice="₹1000"
        description=" You will get 2000 coins"
        currency="₹"
        price={1000}
        timePostfix="/6mo"
        isSelected={select === 2 ? "false" : ""}
        onPress={() => handleSelect(2, 1000)}
      />
      <SubscribeCard
        discountText="Save 100%"
        title="Gold plan"
        descriptionPrice="₹1500"
        description=" You will get 3000 coins"
        currency="₹"
        price={1500}
        timePostfix="/6mo"
        isSelected={select === 3 ? "false" : ""}
        onPress={() => handleSelect(3, 1500)}
      />
      <SubscribeCard
        discountText="Save 100%"
        title="Platinum plan"
        descriptionPrice="₹2000"
        description=" You will get 4000 coins"
        currency="₹"
        price={2000}
        isSelected={select === 4 ? "false" : ""}
        timePostfix="/6mo"
        onPress={() => handleSelect(4, 2000)}
      />
      <TouchableOpacity onPress={handlePayment} style={styles.btn} disabled={disable}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  pricingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
  },
  subheading: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
  btn: {
    backgroundColor: "rgb(101, 78, 180)",
    width: "90%",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    cursor: "pointer",
  },
  btnText: {
    color: "#fff",
    fontSize: 25,
  },
});
