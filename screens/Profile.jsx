import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/AntDesign";
import Icon4 from "react-native-vector-icons/MaterialCommunityIcons";
import { logout } from "../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { Avatar } from "react-native-paper";
import Loader from "../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";

const Profile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const logoutHandler = () => {
    dispatch(logout());
    storeData();
    navigation.reset({
      index: 0,
      routes: [{ name: "login" }],
    });
  };
  const getUserDetails = () => {
    let apiUrl = "http://64.227.172.50:5000/api/v1/me";
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    }).then(async (response) => {
      let data = await response.json();
      if (data.success) {
        setUser(data.user);
      }
      setLoading(false);
    });
  };
  const storeData = async () => {
    try {
      await AsyncStorage.setItem("user", "null");
    } catch (e) {
      // saving error
    }
  };
  const handleDeleteAccount = () => {
    setLoading(true);
    logoutHandler();
    let apiUrl = `http://64.227.172.50:5000/api/v1/deleteMe/${user._id}`;
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "DELETE",
    }).then(async (response) => {
      let data = await response.json();
      if (data.success) {
        setLoading(false);
      }
    });
  };
  const sessionExpired = () => {
    logoutHandler();
    navigation.reset({
      index: 0,
      routes: [{ name: "login" }],
    });
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <View>
      {user && (
        <View style={Styles.container}>
          <View style={Styles.round}></View>
          <View
            style={{ width: 395, height: 130, top: 130, position: "absolute" }}
          >
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
                  uri: user.avatar.url,
                }}
                style={{ backgroundColor: "#900", zIndex: 99 }}
              />
            </View>
          </View>

          <View style={Styles.profileContainer}>
            <View
              style={{
                padding: 7,
                width: 350,
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Icon2 name="user" size={40} style={Styles.icon2} />
              <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
                {user.name}
              </Text>
            </View>
            <View
              style={{
                width: 350,
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                padding: 7,
                width: 350,
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Icon3 name="mail" size={40} style={Styles.icon2} />
              <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
                {user.email}
              </Text>
            </View>

            <View
              style={{
                width: 350,
                borderBottomWidth: 1,
              }}
            />

            <View
              style={{
                padding: 7,
                width: 350,
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Icon3 name="contacts" size={40} style={Styles.icon2} />
              <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
                {user.mobile !== "XXXXXXXXXX"
                  ? user.mobile
                  : "Please Update your mobile no."}
              </Text>
            </View>
            <View
              style={{
                width: 350,
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                padding: 7,
                width: 345,
                flexDirection: "row",
                gap: 5,
                paddingLeft: 15,
                alignItems: "center",
              }}
            >
              <Icon name="map-marker" size={40} style={Styles.icon2} />
              <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
                {user.address ? user.address : "Please Update your address"}
              </Text>
            </View>

            <View
              style={{
                width: 350,
                borderBottomWidth: 1,
              }}
            />

            {user && user?.role !== "user" && (
              <View
                style={{
                  padding: 7,
                  width: 345,
                  flexDirection: "row",
                  gap: 5,
                  paddingLeft: 15,
                  alignItems: "center",
                }}
              >
                {/* <Image
                  source={require("../assets/rupee.png")}
                  style={{
                    width: 35,
                    height: 35,
                    marginLeft: -5,
                    marginRight: 10,
                  }}
                /> */}
                <Icon2 name="wallet" size={30} style={Styles.icon2} />

                <Text
                  style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}
                >
                  {user.wallet && Math.round(user.wallet)} coins
                </Text>
              </View>
            )}

            {user && user?.role !== "user" && (
              <View
                style={{
                  width: 350,
                  borderBottomWidth: 1,
                }}
              />
            )}
            <View
              style={{
                padding: 7,
                width: 350,
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Icon3 name="key" size={40} style={Styles.icon2} />
              <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
                Change password
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("updatepassword")}
              >
                <Icon2 name="edit" size={35} style={Styles.icon3} />
              </TouchableOpacity>
            </View>
            {user && user.role === "user" && (
              <View
                style={{
                  width: 350,
                  borderBottomWidth: 1,
                }}
              />
            )}
            {user && user.role === "user" && (
              <View
                style={{
                  padding: 7,
                  width: 350,
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Icon2 name="user" size={40} style={Styles.icon2} />

                <Text
                  style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}
                >
                  Delete Account
                </Text>
                <TouchableOpacity onPress={() => handleDeleteAccount()}>
                  <Icon2
                    name="trash"
                    size={35}
                    style={{ color: "red", marginLeft: 115 }}
                  />
                </TouchableOpacity>
              </View>
            )}
            <View
              style={{
                width: 350,
                borderBottomWidth: 1,
              }}
            />
            <View style={{ flexDirection: "row", gap: 5 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#49D9C8",
                  flexDirection: "row",
                  gap: 10,
                  marginTop: 20,
                  borderRadius: 10,
                  padding: 10,
                }}
                onPress={() => navigation.navigate("editprofile")}
              >
                <Text
                  style={{ fontFamily: "Poppins_600SemiBold", fontSize: 20 }}
                >
                  Edit Profile
                </Text>
                <Icon2 name="edit" size={30} style={{ marginLeft: 0 }} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#49D9C8",
                  flexDirection: "row",
                  gap: 10,
                  marginTop: 20,
                  borderRadius: 10,
                  padding: 10,
                }}
                onPress={() => Linking.openURL(`https://wa.me/+917015491562`)}
              >
                <Text
                  style={{ fontFamily: "Poppins_600SemiBold", fontSize: 20 }}
                >
                  Contact Us
                </Text>
                <Icon2 name="whatsapp" size={30} style={{ marginLeft: 0 }} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#49D9C8",
                flexDirection: "row",
                gap: 10,
                marginTop: 20,
                borderRadius: 10,
                padding: 5,
                width: 350,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={logoutHandler}
            >
              <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 24 }}>
                Logout
              </Text>
              <Icon4 name="logout" size={30} style={{ marginLeft: 0 }} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!user && (
        <View
          style={{
            marginTop: 50,
            justifyContent: "center",
            alignItems: "center",
            height: 200,
            width: 300,
            backgroundColor: "white",
            borderRadius: 10,
            alignSelf: "center",
            position: "absolute",
          }}
        >
          <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 24 }}>
            Session Expired
          </Text>
          <TouchableOpacity
            onPress={() => sessionExpired()}
            style={{
              backgroundColor: "#49D9C8",
              paddingHorizontal: 10,
              borderRadius: 10,
              paddingTop: 5,
            }}
          >
            <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 20 }}>
              Go to login
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default Profile;
const Styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  round: {
    width: "100%",
    height: 400,
    borderRadius: 200,
    // backgroundColor: "#CC3FFD",
    backgroundColor: "#49D9C8",
    position: "absolute",
    top: -200,
    opacity: 0.6,
    alignItems: "center",
  },
  datePickerStyle: {
    width: 230,
  },
  icon: {
    color: "gray",
    opacity: 0.5,
    top: 5,
    left: 24,
  },
  icon2: {
    color: "#49D9C8",
    opacity: 0.8,
    width: 40,
  },
  icon3: {
    color: "#000",
    opacity: 0.5,
    width: 40,
    marginLeft: 90,
  },
  profileContainer: {
    height: "auto",
    width: 390,
    position: "absolute",
    top: 250,
    padding: 10,
    alignItems: "center",
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
});
