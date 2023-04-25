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
import Icon from "react-native-vector-icons/AntDesign";
import { forgetPassword } from "../redux/actions/userAction";
const UpdatePassword = ({ navigation }) => {
  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const loginHandler = () => {
    dispatch(forgetPassword(email));
  };

  useEffect(() => {
    if (error) {
      alert("fpass",error)
      dispatch({ type: "clearError" });
    }
  }, [error, dispatch, alert]);

  return (
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
              secureTextEntry
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
            onPress={loginHandler}
            style={Styles.btnContainer}
          >
            <Text style={Styles.btnText}>Forgot Password</Text>
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
  icon: {
    position: "absolute",
    top: 13,
    zIndex: 99,
    left: 10,
    color:"#49D9C8"
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
    position:"relative"
  },
  cornerimg: {
    position: "absolute",
    width: "100%",
    height: 200,
    top: 35,
    left: 0,
  },
});
