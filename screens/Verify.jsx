import {StyleSheet, Text, TextInput, View,TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const Verify = ({ navigation, route }) => {
  const [otp, setOtp] = useState("");
  const { email, password, role } = route.params;
  const dispatch = useDispatch();

  const verifyHandler = () => {
    axios
      .post(
        `http://64.227.172.50:5000/api/v1/verify`,
        { email, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        dispatch({ type: "loginSuccess", payload: res.data });
        storeData(res.data.user);
         
        if(role === "seller"){
          navigation.reset({
            index: 0,
            routes: [{ name: "sellerRegisterDetail" }],
          });
        }else{
          navigation.reset({
            index: 0,
            routes: [{ name: "splash", params: { success: true } }],
          });
        }
      })
      .catch((err) => {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: err.response.data.message || `Something went wrong`,
        });
      });
  };
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      // saving error
    }
  };
  const resendOtpHandler = () => {
    axios
      .post(
        `http://64.227.172.50:5000/api/v1/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: "Otp send successfully check your mail",
          });
        }
      })
      .catch((err) => {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: err.response.data.message || `Something went wrong`,
        });
      });
  };


  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <View style={styles.card}>
          <TextInput
            placeholder="Enter OTP"
            onChangeText={setOtp}
            style={{
              width: "90%",
              borderWidth: 1,
              borderRadius: 8,
              padding: 10,
              paddingHorizontal: 20,
              fontSize: 20,
            }}
          />

          <TouchableOpacity onPress={() => resendOtpHandler()} style={styles.smbtn}>
            <Text style={styles.btnText}>Resend OTP</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("login")}
            style={{
              backgroundColor: "green",
              padding: 10,
              borderRadius: 8,
              width: "90%",
            }}
          >
            <Text style={styles.btnText}>Change Email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => verifyHandler()}
            style={{
              backgroundColor: "darkblue",
              padding: 10,
              borderRadius: 8,
              width: "90%",
            }}
          >
            <Text style={styles.btnText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Verify;

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: 300,
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  smbtn: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 8,
    width: "90%",
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
