import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { register } from "../redux/actions/userAction";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";


const Register = ({ navigation }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toggle, setToggle] = useState("false");

  const userRegisterHandler = () => {
    let shopInfo = [];
    let ratings = [
      {
        totalratings: 5,
        noofuser: 1,
      },
    ];
    if(name==="" || email==="" || mobile==="" || address==="" || password==="" || confirmPassword===""){
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning!",
        textBody: "Please fill all the fields",
      });
      return
    }
    if(mobile.length!==10){
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning!",
        textBody: "Please enter a valid mobile number",
      });
      return
    }
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("mobile", mobile);
    myForm.append("address", address);
    myForm.append("password", password);
    myForm.append("role", "user");
    myForm.append("shopInfo", shopInfo);
    myForm.append("totalratings", 5);
    myForm.append("noofuser", 1);

    if (password !== confirmPassword) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning!",
        textBody: "Password does not match",
      });
    } else {
      dispatch(register(myForm));
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "verify",
            params: { email: email, password: password, role: "user" },
          },
        ],
      });
    }
  };
  const sellerRegisterHandler = () => {
    const shopInfo = [];
    if(name==="" || email==="" || mobile==="" || address==="" || password==="" || confirmPassword===""){
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning!",
        textBody: "Please fill all the fields",
      });
      return
    }
    if(mobile.length!==10){
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning!",
        textBody: "Please enter a valid mobile number",
      });
      return
    }

    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("mobile", mobile);
    myForm.append("address", address);
    myForm.append("password", password);
    myForm.append("role", "seller");
    myForm.append("shopInfo", shopInfo);
    myForm.append("totalratings", 2);
    myForm.append("noofuser", 1);

    if (password !== confirmPassword) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning!",
        textBody: "Password does not match",
      });
    } else {
      dispatch(register(myForm));
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "verify",
            params: { email: email, password: password, role: "seller" },
          },
        ],
      });
    }
  };

  return (
    <View style={Styles.container}>
      {/* <Image
        style={Styles.cornerimg}
        source={require("../assets/cornerdesign.jpg")}
      /> */}
      <View style={{ top: "0%" }}>
        <Text style={Styles.heading}>Welcome Onboard</Text>
        <Text style={Styles.sub_heading}>
          Let's help you meet up your tasks
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 1,
          width: "85%",
          padding: 0,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 0,
          top: "0%",
        }}
      >
        <TouchableOpacity
          style={{ width: "49%" }}
          onPress={() => setToggle("true")}
        >
          <Text
            style={{
              backgroundColor: toggle === "true" ? "#50C2C9" : "gray",
              textAlign: "center",
              fontFamily: "Poppins_400Regular",
              color: "#fff",
              padding: 5,
              marginBottom: 2,
              fontSize: 17,
            }}
          >
            Seller Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "49%" }}
          onPress={() => setToggle("false")}
        >
          <Text
            style={{
              backgroundColor: toggle === "false" ? "#50C2C9" : "gray",
              textAlign: "center",
              fontFamily: "Poppins_400Regular",
              color: "#fff",
              padding: 5,
              marginBottom: 2,
              fontSize: 17,
            }}
          >
            User Register
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ marginTop: 5 }}
        behavior="padding"
        keyboardVerticalOffset={0}
        enabled
      >
        <View
          style={{
            display: toggle === "true" ? "none" : "flex",
            width: "85%",
            height: "50%",
            top: "2%",
            gap: 5,
          }}
        >
          <View
            style={{
              padding: 5,
              width: 350,
              flexDirection: "row",
              gap: 15,
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "gray",
            }}
          >
            <Icon2 name="user" size={30} style={Styles.icon2} />
            <TextInput
              style={Styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View
            style={{
              padding: 5,
              width: 350,
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "gray",
            }}
          >
            <Icon name="mail" size={30} style={Styles.icon2} />
            <TextInput
              style={Styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View
            style={{
              padding: 5,
              width: 350,
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "gray",
            }}
          >
            <Icon name="contacts" size={30} style={Styles.icon2} />
            <TextInput
              style={Styles.input}
              placeholder="Phone Number"
              value={mobile}
              onChangeText={setMobile}
            />
          </View>
          <View
            style={{
              padding: 5,
              width: 350,
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "gray",
            }}
          >
            <Icon2
              name="map-marker-alt"
              size={30}
              style={[Styles.icon2, { paddingLeft: 5 }]}
            />
            <TextInput
              style={Styles.input}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />
          </View>
          <View
            style={{
              padding: 5,
              width: 350,
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "gray",
            }}
          >
            <Icon2 name="lock" size={30} style={Styles.icon2} />
            <TextInput
              secureTextEntry
              style={Styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View
            style={{
              padding: 5,
              width: 350,
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "gray",
            }}
          >
            <Icon name="key" size={30} style={Styles.icon2} />
            <TextInput
              style={Styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              gap: 5,
              top: "0%",
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
              Already have an account ?
            </Text>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Poppins_400Regular",
                    color: "#50C2C9",
                  }}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button
            disabled={!email || !password}
            textColor={"white"}
            labelStyle={{ fontSize: 25 }}
            onPress={userRegisterHandler}
            style={Styles.buttonContainer}
          >
            <Text style={Styles.btnText}>User Register</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>

      <KeyboardAvoidingView
        style={{ marginTop: 5 }}
        behavior="padding"
        keyboardVerticalOffset={0}
        enabled
      >
        <View
          style={{
            display: toggle === "true" ? "flex" : "none",
            width: "85%",
            height: "50%",
            top: "0%",
            gap: 5,
          }}
        >
          <View
            style={{
              padding: 5,
              width: 350,
              flexDirection: "row",
              gap: 15,
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "gray",
            }}
          >
            <Icon2 name="user" size={30} style={Styles.icon2} />
            <TextInput
              style={Styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View
            style={{
              padding: 5,
              width: 350,
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "gray",
            }}
          >
            <Icon name="mail" size={30} style={Styles.icon2} />
            <TextInput
              style={Styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View
            style={{
              padding: 5,
              width: 350,
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "gray",
            }}
          >
            <Icon name="contacts" size={30} style={Styles.icon2} />
            <TextInput
              style={Styles.input}
              placeholder="Phone Number"
              value={mobile}
              onChangeText={setMobile}
            />
          </View>
          <View
            style={{
              padding: 5,
              width: 350,
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "gray",
            }}
          >
            <Icon2
              name="map-marker-alt"
              size={30}
              style={[Styles.icon2, { paddingLeft: 5 }]}
            />
            <TextInput
              style={Styles.input}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />
          </View>
          <View
            style={{
              padding: 5,
              width: 350,
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "gray",
            }}
          >
            <Icon2 name="lock" size={30} style={Styles.icon2} />
            <TextInput
              secureTextEntry
              style={Styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View
            style={{
              padding: 5,
              width: 350,
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "gray",
            }}
          >
            <Icon name="key" size={30} style={Styles.icon2} />
            <TextInput
              style={Styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              gap: 5,
              top: "0%",
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
              Already have an account ?
            </Text>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Poppins_400Regular",
                    color: "#50C2C9",
                  }}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button
            disabled={!email || !password}
            textColor={"white"}
            labelStyle={{ fontSize: 25 }}
            onPress={sellerRegisterHandler}
            style={Styles.buttonContainer}
          >
            <Text style={Styles.btnText}>Seller Register</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;

const Styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eeeeee",
  },
  heading: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
  sub_heading: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },

  buttonContainer: {
    height: 50,
    backgroundColor: "#49D9C8",
  },
  btnText: {
    fontSize: 26,
    color: "white",
    lineHeight: 45,
    fontFamily: "Poppins_600SemiBold",
  },
  cornerimg: {
    position: "absolute",
    width: "100%",
    height: 200,
    top: "3%",
    left: 0,
  },
  input: {
    width: "88%",
    height: 40,
    fontSize: 18,
  },
});
