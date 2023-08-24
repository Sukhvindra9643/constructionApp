import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import Loader from "../components/Loader";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import axios from "axios";
const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const forgotPasswordHandler = async () => {
    setLoading(true);
    axios
      .post(
        `http://64.227.172.50:5000/api/v1/password/forgot`,
        { email},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async(res) => {
        if(res.data.success){
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: `New Password Sent to your Email ${email}`,
          });
          setLoading(false);
          navigation.navigate("login"); 
        }else{
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            textBody: "Something went wrong, try again",
          });
        }
        setLoading(false)
      })
      .catch((err) => {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: err.response.data.message || `Something went wrong`,
        });
        setLoading(false)
      });
  };

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <View style={Styles.container}>
      <Image
        style={Styles.cornerimg}
        source={require("../assets/cornerdesign.jpg")}
      />
      <View style={Styles.forgotPasswordForm}>
        <View style={Styles.inputContainer}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Icon name="mail" size={30} style={Styles.icon} />
            <TextInput
              style={Styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Button
            disabled={!email}
            textColor={"white"}
            labelStyle={{ fontSize: 25 }}
            onPress={forgotPasswordHandler}
            style={Styles.btnContainer}
          >
            <Text style={Styles.btnText}>Forgot Password</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

const Styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eeeeee",
  },
  icon: {
    position: "absolute",
    top: 13,
    zIndex: 99,
    left: 10,
    color: "#49D9C8",
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
    paddingLeft: 50,
    borderRadius: 22,
    marginVertical: 5,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    position: "relative",
  },
  cornerimg: {
    position: "absolute",
    width: "100%",
    height: 200,
    top: 35,
    left: 0,
  },
});
