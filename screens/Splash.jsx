import { View, Image } from "react-native";
import React, { useEffect} from "react";


const Splash = ({ navigation, route }) => {
  useEffect(() => {
    getUserDetails();
  }, [route.params]);


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
        setTimeout(() => {
          navigation.replace("main", { user: data.user });
        }, 2000);
      } else {
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "login" }],
          });
        }, 2000);
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Image
        source={require("../assets/splash.png")}
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "contain",
          borderRadius: 1,
        }}
      />
    </View>
  );
};

export default Splash;
