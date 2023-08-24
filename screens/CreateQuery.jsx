import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import Loader from "../components/Loader.jsx";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import * as Location from "expo-location";
import { StackActions } from "@react-navigation/native";

const CreateCategory = ({ navigation, route }) => {
  const [area, setArea] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = useState("");
  const [locality, setLocality] = React.useState("");
  const [user, setUser] = useState({});

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
  const createQueryHandler = () => {
    setLoading(true);
    if (!area || !mobile || !locality) {
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
    myForm.append("area", area);
    myForm.append("mobile", mobile);
    myForm.append("budget", parseInt(categories.price)*parseInt(area));
    myForm.append("locality", locality);
    myForm.append("unit",categories.unit);
    myForm.append("materials", route.params.item.name);

    axios
      .post("http://64.227.172.50:5000/api/v1/createquery", myForm, {
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
              category: "Materials",
            })
          );
        } else {
          setLoading(false);
        }
      }).catch((err) => {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "Something went wrong",
        });
        setLoading(false);
      }
      );
  };

  const getAllCategories = () => {
    let apiUrl = "http://64.227.172.50:5000/api/v1/getAllCategories";
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    })
      .then(async (response) => {
        let data = await response.json();
        if (data) {

          for (let i = 0; i < data.categories.length; i++) {
            if (data.categories[i].name === route.params.item.name) {
              setCategories(data.categories[i]);
            }
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  
  useEffect(() => {
    getAllCategories();
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
            Material :- {route.params.item.name}
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
            placeholder={`Enter your quantity in ${categories.unit}`}
            value={area}
            onChangeText={setArea}
          
          />
          <View
            style={{
              width: "100%",
              fontSize: 17,
              fontFamily: "Poppins_400Regular",
            }}
          >
            <Text>
              {`Average price ${categories.price}rs/ ${categories.unit}`}
            </Text>
          </View>
          {area !== "" && (
            <View
              style={{
                width: "100%",
                fontSize: 17,
                fontFamily: "Poppins_400Regular",
              }}
            >
              <Text>Approximate budget</Text>
              <Text>
                {`${categories.price}rs/${categories.unit} * ${area}${
                  categories.unit
                } = ${categories.price * area}rs`}
              </Text>
            </View>
          )}
        

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

export default CreateCategory;

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


