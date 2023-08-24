import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import axios from "axios";
import Loader from "../components/Loader.jsx"
import AsyncStorage from "@react-native-async-storage/async-storage";


const Login = ({ navigation }) => {
  const [loading,setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    if (!email || !password) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Please enter your email or password",
      });
      return;
    }
    // await dispatch(login(email, password));
    setLoading(true)
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
        if(email === "guest9670@gmail.com"){
        storeData(res.data.user);
          navigation.reset({
            index: 0,
            routes: [{ name: "splash", params: { success: true } }],
          });
          return;
        }

        if (res.data.success) {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: `Otp sent to ${email}`,
          });
          setLoading(false)
          navigation.navigate("verify", {email:email,password:password });
         
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: err.response.data.message || `Something went wrong`,
        });
        setLoading(false)
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
  return loading? (<Loader loading={loading}/>):(
    <View style={Styles.container}>
      {/* <Image
        style={Styles.cornerimg}
        source={require("../assets/cornerdesign.jpg")}
      /> */}

      <View style={Styles.imgContainer}>
        <Text style={Styles.heading}>Welcome Back!</Text>
        <View style={Styles.loginContainer}>
          <Image
            style={Styles.loginImg}
            source={require("../assets/login.jpg")}
          />
        </View>
      </View>
      <View style={Styles.inputContainer}>
        <TextInput
          style={Styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          secureTextEntry
          style={Styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => navigation.navigate("forgetpassword")}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Poppins_400Regular",
              color: "#50C2C9",
            }}
          >
            {" "}
            Forget Password{" "}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            flexDirection: "row",
            gap: 5,
          }}
        >
          <Text
            style={{
              color: "#900",
              textAlign: "center",
              fontFamily: "Poppins_400Regular",
              color: "#000",
            }}
          >
            Don't have an account ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("register")}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Poppins_400Regular",
                color: "#50C2C9",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={Styles.buttonContainer} onPress={loginHandler}>
          <Text style={Styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const Styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eeeeee",
    height:"100%"
  },
  inputContainer: {
    position: "absolute",
    width: "80%",
    top: "58%",
  },
  buttonContainer: {
    height: 55,
    backgroundColor: "#49D9C8",
    borderRadius:15,
  },
  btnText: {
    fontSize: 28,
    color: "white",
    lineHeight: 60,
    fontFamily: "Poppins_600SemiBold",
    textAlign:"center"
  },
  heading: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
  sub_heading: {
    fontSize: 18,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 22,
    marginVertical: 3,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },

  btn: {
    backgroundColor: "#50C2C9",
    padding: 5,
    width: "100%",
    borderRadius: 0,
  },
  imgContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "35%",
    width: "95%",
    height: 35,
  },
  loginContainer: {
    width: "70%",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "gray",
  },
  cornerimg: {
    position: "absolute",
    width: "100%",
    height: 200,
    top: "3%",
    left: 0,
  },
  loginImg: {
    width: "100%",
    height: 150,
    borderWidth: 2,
    borderBottomRightRadius: 20,
  },
});
