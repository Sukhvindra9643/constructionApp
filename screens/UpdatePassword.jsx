import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../redux/actions/userAction";
const UpdatePassword = ({navigation}) => {
  const { error } = useSelector((state) => state.auth);
  const { isUpdated } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const [oldpass, setOldPass] = useState("");
  const [newpass, setNewPass] = useState("");
  const [cpassword, setCPassword] = useState("");

  const updataPassHandler = () => {
    if (newpass !== cpassword) {
      alert("Confirm Password does not match");
    }
    dispatch(updatePassword(oldpass, newpass,cpassword));
  };


  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearError" });
    }
    console.log("isUpdated",isUpdated);

    if (isUpdated) {
      dispatch({ type: "updatePasswordReset" });
      alert("Password Updated Successfully");
      navigation.navigate("profile");
    }
  }, [dispatch, error,isUpdated]);
  
  return (
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
