import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import React, { useState,useEffect } from "react";
import { Button } from "react-native-paper";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { StackActions } from '@react-navigation/native';
import Loader from "../components/Loader";


const UpdatePassword = ({ navigation }) => {
  const [oldpass, setOldPass] = useState("");
  const [newpass, setNewPass] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [user,setUser] = useState({});
  const [loading,setLoading] = useState(true)

  
  const updataPassHandler = async () => {
    setLoading(true);
    if (newpass !== cpassword) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Confirm Password does not match",
      });
      setLoading(false);
      return;
    }
    const data = {
      oldPassword: oldpass,
      newPassword: newpass,
      confirmPassword: cpassword,
    };
    axios
      .put(`http://64.227.172.50:5000/api/v1/password/update`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (res) => {
        if (res.data.success) {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: "Password Updated Successfully",
          });
          setLoading(false)
          navigation.dispatch(   
            StackActions.replace('main', { screen: 'profile',user:user}) 
        );
        }
      })
      .catch((error) => {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: error.response.data.message,
        });
        setLoading(false)
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
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return loading ? (<Loader loading={loading}/>):(
    <View style={Styles.container}>
      <Image
        style={Styles.cornerimg}
        source={require("../assets/cornerdesign.jpg")}
      />
      <View style={Styles.forgotPasswordForm}>
        <View style={Styles.inputContainer}>
          <TextInput
            style={Styles.input}
            placeholder="Old Password"
            value={oldpass}
            onChangeText={setOldPass}
          />
          <TextInput
            style={Styles.input}
            placeholder="New Password"
            value={newpass}
            onChangeText={setNewPass}
          />

          <TextInput
            secureTextEntry
            style={Styles.input}
            placeholder="Confirm Password"
            value={cpassword}
            onChangeText={setCPassword}
          />
          <Button
            disabled={!newpass || !cpassword}
            textColor={"white"}
            labelStyle={{ fontSize: 25 }}
            onPress={updataPassHandler}
            style={Styles.btnContainer}
          >
            <Text style={Styles.btnText}>Change Password</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default UpdatePassword;

const Styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eeeeee",
  },
  forgotPasswordForm: {
    width: "90%",
    height: "55%",
    top: "15%",
  },
  inputContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnContainer: {
    height: 60,
    backgroundColor: "#49D9C8",
    marginTop: 10,
    borderRadius: 22,
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 26,
    color: "white",
    lineHeight: 60,
    fontFamily: "Poppins_600SemiBold",
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 22,
    marginVertical: 5,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },
  cornerimg: {
    position: "absolute",
    width: "100%",
    height: 200,
    top: 35,
    left: 0,
  },
});
