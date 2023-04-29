import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Avatar } from "react-native-paper";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/AntDesign";
import {updateProfile} from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";


const Profile = ({ navigation, route }) => {
  // const {loading} = useSelector((state) => state.auth);
  const [user,setUser] = useState("");
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch();


  const [id, setId] = useState("");
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile !== 'XXXXXXXXXX' ?user.mobile:"");
  const [address, setAddress] = useState(user.address);
  console.log("url",avatar)
  const handleImage = () => {
    navigation.navigate("camera", {
      updateProfile: true,
    });
  };
  const updateProfileHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !mobile) {
      alert("Please fill all the information");
    } else {
      const myForm = new FormData();
      myForm.append("name", name);
      myForm.append("email", email);
      myForm.append("mobile", mobile);
      myForm.append("public_id", id);
      myForm.append("url", avatar);
      myForm.append("address",address)
      dispatch(updateProfile(myForm));
      navigation.navigate("home");

    }
  };
  const getUseretails  = ()=>{
    let apiUrl = "http://192.168.100.66:4000/api/v1/me"
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    })
      .then(async (response) => {
        let data = await response.json();
        setLoading(false)
        setUser(data.user)
        setName(data.user.name);
        setEmail(data.user.email);
        setMobile(data.user.mobile);
        setAddress(data.user.address);
        if(avatar !== data.user.avatar.url){
          setAvatar(data.user.avatar.url)
        }
        console.log("user",data.user)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getUseretails();

    if (route.params) {
      console.log("route",route.params)
      if (route.params.image) {
        setId(route.params.id);
        setAvatar(route.params.image);
        getUseretails();
      }
    }
  }, [route,loading]);


  return loading?(<Loader/>):(
    <View style={Styles.container}>
      <View style={Styles.round}></View>
      <View style={{ width: 400, height: 130, top: 130, position: "absolute" }}>
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 150,
            backgroundColor: "#fff",
            left: "35%",
          }}
        >
            <Avatar.Image
              size={120}
              source={{
                uri: avatar !== "" ? avatar : "https://res.cloudinary.com/dk0o7tdks/image/upload/v1681134668/images/user_cl1ttq.jpg",
              }}
              style={{ backgroundColor: "#900", zIndex: 99 }}
            />
          <TouchableOpacity onPress={handleImage} style={{ width: 300 }}>
            <Text
              style={{
                color: "#900",
                margin: 0,
                fontFamily: "Poppins_400Regular",
                fontSize: 16,
              }}
            >
              Change Photo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          width: "85%",
          height: "50%",
          top: "15%",
          left: -20,
        }}
      >
        <View
          style={{
            padding: 0,
            width: 390,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Icon2 name="user" size={40} style={Styles.icon2} />
          <TextInput
            style={Styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View
          style={{
            padding: 3,
            width: 390,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Icon3 name="mail" size={40} style={Styles.icon2} />
          <TextInput
            style={Styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View
          style={{
            padding: 3,
            width: 390,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Icon3 name="contacts" size={40} style={Styles.icon2} />
          <TextInput
            keyboardType="numeric"
            style={Styles.input}
            placeholder="Enter your phone no."
            value={mobile}
            onChangeText={setMobile}
          />
        </View>
        <View
          style={{
            padding: 3,
            paddingLeft: 5,
            width: 390,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Icon name="map-marker" size={40} style={Styles.icon3} />
          <TextInput
            style={Styles.input}
            placeholder="Enter your address"
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#49D9C8",
            flexDirection: "row",
            gap: 10,
            marginTop: 10,
            marginLeft: 85,
            borderRadius: 10,
            padding: 10,
            width: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={updateProfileHandler}
        >
          <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 20 }}>
            Update Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Profile;
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
  round: {
    width: "100%",
    height: 400,
    borderRadius: 200,
    backgroundColor: "#49D9C8",
    position: "absolute",
    top: -200,
    opacity: 0.6,
  },
  datePickerStyle: {
    width: 230,
  },
  icon: {
    color: "gray",
    opacity: 0.5,
    top: 5,
    left: 24,
    marginBottom: 20,
  },
  icon2: {
    color: "#49D9C8",
    opacity: 0.8,
    width: 40,
    position: "absolute",
    zIndex: 1,
    left: 22,
    top: 5,
  },
  icon3: {
    color: "#49D9C8",
    opacity: 0.8,
    width: 40,
    position: "absolute",
    zIndex: 1,
    left: 33,
    top: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    position: "relative",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 60,
    borderRadius: 22,
    marginLeft: 10,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    width: 350,
  },
});
