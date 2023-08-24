import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useEffect } from "react";
import { Button } from "react-native-paper";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import * as Location from "expo-location";
import Loader from "../components/Loader";
import { StackActions } from "@react-navigation/native";


const CreateServiceQuery = ({ navigation,route }) => {
  const [mobile, setMobile] = React.useState("");
  const [locality, setLocality] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({});

  const reverseGeocode = async (location) => {
    let address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    let name = address[0].name ? address[0].name : "";
    let city = address[0].city ? address[0].city : "";
    let country = address[0].country ? address[0].country : "";
    let region = address[0].region ? address[0].region : "";
    let postalCode = address[0].postalCode ? address[0].postalCode : "";
    let street = address[0].street ? address[0].street : "";
    let subregion = address[0].subregion ? address[0].subregion : "";

    let actualAddress =
      name +
      ", " +
      street +
      ", " +
      city +
      ", " +
      subregion +
      ", " +
      region +
      ", " +
      country +
      ", " +
      postalCode;
    setLocality(actualAddress);
  };

  const getPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    // let { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Please grant to  location",
      });
      return;
    }
    Location.getCurrentPositionAsync({ enableHighAccuracy: true })
      .then((location) => {
        reverseGeocode(location);
      })
      .catch((error) => {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "Error",
          textBody: "Something went wrong",
        });
      });
  };

  const createQueryHandler = () => {
    setLoading(true);
    if (!mobile || !locality || !budget) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Please fill all the fields",
      });
      setLoading(false);
      return;
    }
    if(mobile.length !== 10){
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Please enter valid mobile number",
      });
      setLoading(false);
      return;
    }
    const myForm = new FormData();
    myForm.append("serviceName", route.params.item.name);
    myForm.append("mobile", mobile);
    myForm.append("locality", locality);
    myForm.append("budget", budget);

    axios.post("http://64.227.172.50:5000/api/v1/createqueryservice", myForm, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.success) {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: "Query created successfully",
          });
          setLoading(false);

          navigation.dispatch(
            StackActions.replace("main", {
              screen: "myqueries",
              user: user,
              category : "ServicesQuery"
            })
          );
        }else{
          setLoading(false);
        }
      })
      .catch((err) => {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "Something went wrong",
        });
        setLoading(false);
      });
  };
  const getUserDetails = () => {
    let apiUrl = "http://64.227.172.50:5000/api/v1/me";
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    })
      .then(async (response) => {
        let data = await response.json();
        if (data.success) {
          setUser(data.user);
        }
      })
  };
  useEffect(() => {
    getUserDetails();
    getPermission();
  }, []);

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <View style={Styles.container}>
      <View style={Styles.cardContainer}>
        <View
          style={{
            width: 300,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontFamily: "Poppins_500Medium" }}>
            Service :- {route.params.item.name}
          </Text>
        </View>

        <View style={Styles.inputContainer}>
          <TextInput
            style={Styles.input}
            placeholder="Enter your locality"
            value={locality}
            onChangeText={setLocality}
            multiline={true}
            numberOfLines={2}
          />
          <TextInput
            style={Styles.input}
            placeholder="Enter your mobile no."
            value={mobile}
            onChangeText={setMobile}
          />
          <TextInput
            style={Styles.input}
            placeholder="Enter your budget"
            value={budget}
            onChangeText={setBudget}
          />
          <Button
            textColor={"white"}
            labelStyle={{ fontSize: 25 }}
            onPress={createQueryHandler}
            style={Styles.buttonContainer}
          >
            <Text style={Styles.btnText}>Create Query</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default CreateServiceQuery;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "#eeeeee",
    padding: 10,
    alignItems: "center",
    height: "100%",
  },
  cardContainer: {
    backgroundColor: "white",
    width: "90%",
    alignItems: "center",
    // height: "100%",
  },
  inputContainer: {
    width: 300,
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  input: {
    width: "100%",
    padding: 7,
    fontSize: 17,
    fontFamily: "Poppins_400Regular",
    borderRadius: 12,
    borderWidth: 1,
  },
  buttonContainer: {
    height: 60,
    width: 300,
    backgroundColor: "#49D9C8",
  },
  btnText: {
    fontSize: 26,
    color: "white",
    lineHeight: 60,
    fontFamily: "Poppins_600SemiBold",
  },
  loginImg: {
    width: 75,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
});
