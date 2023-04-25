import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {login } from "../redux/actions/userAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Login = ({ navigation }) => {
  const { error,message,isAuthenticated } = useSelector(state => state.auth)

    const dispatch = useDispatch();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async() => {
        // await AsyncStorage.removeItem("onboarding");
        await AsyncStorage.setItem("onboarding","false");
        dispatch(login(email, password));
    }
  return (
    <View style={Styles.container}>
      <Image
        style={Styles.cornerimg}
        source={require("../assets/cornerdesign.jpg")}
      />

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
        <Button
            disabled={!email || !password}
            textColor={"white"}
            labelStyle={{ fontSize: 25 }}
            onPress={loginHandler}
            style={Styles.buttonContainer}
          >
            <Text style={Styles.btnText}>Login</Text>
          </Button>
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
  },
  inputContainer: {
    position: "absolute",
    width: "80%",
    top: "58%",
  },
  buttonContainer: {
    height: 60,
    backgroundColor: "#49D9C8",
  },
  btnText: {
    fontSize: 26,
    color: "white",
    lineHeight: 60,
    fontFamily: "Poppins_600SemiBold",
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
  loginContainer:{
    width:"70%",
    borderWidth:2,
    borderStyle:"dashed",borderColor:"gray"
  },
  cornerimg: {
    position: "absolute",
    width: "100%",
    height: 200,
    top: 35,
    left: 0,
  },
  loginImg: {
    width: "100%",
    height: 150,
    borderWidth: 2,
    borderBottomRightRadius: 20,
  },
});
