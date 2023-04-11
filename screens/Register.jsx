import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, {useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch} from "react-redux";
import { register } from "../redux/actions/userAction";
const Register = ({ navigation }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bName, setBName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toggle, setToggle] = useState("false");


  const userRegisterHandler = () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("role", "user");
    if(password !== confirmPassword){
      alert("Password does not match")
    }else{
      dispatch(register(myForm));
      navigation.navigate('profile');
    }
  };
  const sellerRegisterHandler = () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("bname", bName);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("role", "seller");
    if(password !== confirmPassword){
      alert("Password does not match")
    }else{
      dispatch(register(myForm));
      navigation.navigate('profile');
    }
  };


  return (
    <View style={Styles.container}>
      <Image
        style={Styles.cornerimg}
        source={require("../assets/cornerdesign.jpg")}
      />
      <View style={{ top: "6%" }}>
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
          marginBottom: 10,
          top: "12%",
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
              marginBottom: 5,
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
              marginBottom: 5,
              fontSize: 17,
            }}
          >
            User Register
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: toggle === "true" ? "none" : "flex",
          width: "85%",
          height: "50%",
          top: "6%",
        }}
      >
        <TextInput
          style={Styles.inputUser}
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={Styles.inputUser}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          secureTextEntry
          style={Styles.inputUser}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          secureTextEntry
          style={Styles.inputUser}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
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
      <View
        style={{
          display: toggle === "true" ? "flex" : "none",
          width: "85%",
          height: "50%",
          top: "6%",
        }}
      >
        <TextInput
          style={Styles.inputSeller}
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={Styles.inputSeller}
          placeholder="Enter your business name"
          value={bName}
          onChangeText={setBName}
        />
        <TextInput
          style={Styles.inputSeller}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          secureTextEntry
          style={Styles.inputSeller}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          secureTextEntry
          style={Styles.inputSeller}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
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

  inputUser: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    // paddingLeft: 10,
    borderRadius: 22,
    marginVertical: 3,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },
  inputSeller: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 10,
    borderRadius: 22,
    marginVertical: 3,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
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
  cornerimg: {
    position: "absolute",
    width: "100%",
    height: 200,
    top: 35,
    left: 0,
  },
});
