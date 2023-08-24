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
import Loader from "../components/Loader";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { StackActions } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const EditProfile = ({ navigation, route }) => {
  const [user,setUser] = useState("");
  const [loading,setLoading] = useState(true)
  const [id, setId] = useState("");
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile);
  const [address, setAddress] = useState(user.address);


  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Permission to access camera roll is required!",
      });
      return;
    }

    const data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    const source = await FileSystem.readAsStringAsync(data.assets[0].uri, {
      encoding: "base64", 
    });

    if (!data.canceled) {
      console.log("");
    }
    setLoading(true);
    if (source) {
      let base64Img = `data:image/jpg;base64,${source}`;
      let apiUrl = "https://api.cloudinary.com/v1_1/dk0o7tdks/image/upload/";
      let data = {
        file: base64Img,
        upload_preset: "myUploadPreset",
      };
      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      }).then(async (response) => {
          let data = await response.json();
          if (data.secure_url) {
            setLoading(false);
            setAvatar(data.secure_url);
            setId(data.public_id);
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Success",
              textBody: "Upload successful",
            });
          }
        }).catch((err) => {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            textBody: "Cannot upload image",
          });
          setLoading(false);
        });
    }
  };
  const updateProfileHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !mobile) {
       Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Please fill all the fields",
      });
    } else {
      setLoading(true);
      const myForm = new FormData();
      myForm.append("name", name);
      myForm.append("email", email);
      myForm.append("mobile", mobile);
      myForm.append("public_id",id);
      myForm.append("url",avatar);
      myForm.append("address",address);

      axios
      .put("http://64.227.172.50:5000/api/v1/me/update", myForm, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.success) {
          storeData(response.data.user);
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: "Profile Updated Successfully",
          });
          setLoading(false)
          navigation.dispatch(   
            StackActions.replace('main', { screen: 'home',user:user }) 
        );
        } else {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            textBody: "Something went wrong",
          });
          setLoading(false)
        }
      });
      

    }
  };
  const getUserDetails  = ()=>{
    let apiUrl = "http://64.227.172.50:5000/api/v1/me"
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
        setMobile(data.user.mobile === 'XXXXXXXXXX' ?"":data.user.mobile);
        setAddress(data.user.address);
        if(avatar !== data.user.avatar.url){
          setAvatar(data.user.avatar.url)
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "Something went wrong",
        })
      });
  }
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user', jsonValue)
    } catch (e) {
      // saving error
    }
  }
  useEffect(() => {
    getUserDetails();
  }, []);


  return loading?(<Loader loading={loading}/>):(
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
          <TouchableOpacity onPress={openImagePickerAsync} style={{ width: 300 }}>
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
            editable={false}
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
export default EditProfile;
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
