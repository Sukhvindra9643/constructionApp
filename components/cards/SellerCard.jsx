import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Rating } from "react-native-ratings";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useStripe } from "@stripe/stripe-react-native";
import axios from "axios";
import { StackActions } from "@react-navigation/native";
import Loader from "../Loader";


const SellerCard = ({ seller, item, navigation,user }) => {
  const stripe = useStripe();
  const [disable, setDisable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleServicePayment = (query, seller) => {
    setLoading(true);
    const myForm1 = new FormData();
    myForm1.append("servicename", query.name);
    myForm1.append("price", query.price);
    myForm1.append("hourlyPrice",query.hourlyPrice);
    myForm1.append("public_id", query.public_id);
    myForm1.append("url", query.url);
    myForm1.append("sellerId", seller._id);
    myForm1.append("sellername", seller.name);
    myForm1.append("sellermobile", seller.mobile);
    myForm1.append("totalratings", seller.ratings.totalratings);
    myForm1.append("noofuser", seller.ratings.noofuser);
    myForm1.append("user", user._id);

    axios
      .post("http://64.227.172.50:5000/api/v1/createservicequery", myForm1, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.success) {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: "Payment Successfull!",
          });
          setDisable(false);
          setLoading(false);
          navigation.dispatch(
            StackActions.replace("main", {
              screen: "myqueries",
              user: user,
              category: "Services",
            })
          );
        }
      }).catch((err)=>{
        setDisable(false)
        setLoading(false);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "Something went wrong!",
        });
      })
  };
  const handlePayment = async (query, seller) => {
    setDisable(true);
    try {
      const d = {
        name: user.name,
        amount: query.price,
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
          textBody: "Something went wrong!, try again later",
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
          textBody: "Something went wrong!, try again later",
        });
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
      handleServicePayment(query,seller)
    } catch (err) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Something went wrong!, try again later",
      });
      setDisable(false);
    }
  };

  return loading ? (<Loader loading={loading}/>) :(
    <View style={Styles.container}>
      <View style={Styles.avatarContainer}>
        <Image style={Styles.img} source={{ uri: seller.avatar.url }} />
      </View>
      <View style={Styles.content}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{seller.name}</Text>
        <View style={{ alignItems: "flex-start" }}>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={15}
            startingValue={
              seller.ratings !== ""
                ? seller.ratings.totalratings / seller.ratings.noofuser
                : 2
            }
            readonly
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            ₹ {item.price} Visiting price
          </Text>
        </View>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          ₹ {item.hourlyPrice}/hour
        </Text>
        {user.role === "user" && (
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              padding: 5,
              marginTop: 5,
              borderRadius: 5,
              width: 120,
            }}
            onPress={() => handlePayment(item, seller)}
            disabled={disable}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Contact Now
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SellerCard;

const Styles = StyleSheet.create({
  container: {
    width: "95%",
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    borderRadius: 10,
  },
  avatarContainer: {
    width: "30%",
    padding: 10,
    marginHorizontal: 10,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  content: {
    width: "70%",
    padding: 10,
  },
});
