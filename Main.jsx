import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home.jsx";
import GetStarted from "./screens/GetStarted.jsx";
import Login from "./screens/Login.jsx";
import Footer from "./components/Footer.jsx";
import Register from "./screens/Register.jsx";
import UpdatePassword from "./screens/UpdatePassword.jsx";
import ForgotPassword from "./screens/ForgotPassword.jsx";
import Profile from "./screens/Profile.jsx";
import EditProfile from "./screens/EditProfile.jsx";
import Camera from "./screens/Camera.jsx";
import Loader from "./components/Loader.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";
import AllServices from "./components/Admin/AllServices.jsx";
import CreateService from "./components/Admin/CreateService.jsx";
import AllUsers from "./components/Admin/AllUsers.jsx";
import UpdateService from "./components/Admin/UpdateService.jsx";
import AllOrders from "./components/Admin/AllOrders.jsx";
import OrderDetails from "./components/Admin/OrderDetails.jsx";
import SellerDashboard from "./components/Seller/SellerDashboard.jsx";
import SellerAllServices from "./components/Seller/SellerAllServices.jsx";
import SellerCreateService from "./components/Seller/SellerCreateService.jsx";
import SellerAllOrders from "./components/Seller/SellerAllOrders.jsx";
import SellerUpdateService from "./components/Seller/SellerUpdateService.jsx";
import SellerOrderDetails from "./components/Seller/SellerOrderDetails.jsx";
import SellerDetails from "./screens/SellerDetails.jsx";
import CreateCategory from "./components/Admin/CreateCategory.jsx";

const Stack = createNativeStackNavigator();
import { loadUser, updateProfile } from "./redux/actions/userAction";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Main = () => {
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [onboarding, setOnboarding] = useState("false");

  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated,message } = useSelector((state) => state.auth);

  const getPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Please grant to  location");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    reverseGeocode(location);
  };
  const reverseGeocode = async (location) => {
    let address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    let name = address[0].name === null ? "" : address[0].name;
    let street = address[0].street === null ? "" : address[0].street;
    let district = address[0].district === null ? "" : address[0].district;
    let city = address[0].city === null ? "" : address[0].city;
    let country = address[0].country === null ? "" : address[0].country;
    let postalCode =
      address[0].postalCode === null ? "" : address[0].postalCode;

    let shortAddress = `${name} ${street} ${district} ${city} ${country} (${postalCode})`;
    setAddress(shortAddress);
    dispatch(loadUser());
  };
  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("onboarding");
      if (value === null) {
        setOnboarding("true");
      } else {
        setOnboarding("false");
      }
    } catch (err) {
      console.log("Error checkOnboarding: ", err);
    }
  };
  useEffect(() => {
    getPermission();
    checkOnboarding();

    if (user) {
      const formData = new FormData();
      formData.append("name", user.name && user.name);
      formData.append("email", user.email && user.email);
      formData.append("phone", user.phone ? user.phone : "");
      formData.append("address", address ? address : "");
      dispatch(updateProfile(formData));
      // alert('Profile Updated Successfully')
    }
  }, [message]);

  if (!fontsLoaded) {
    return <Loader />;
  } else {
    return loading ? (
      <Loader />
    ) : (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            onboarding === "true"
              ? "getstarted"
              : isAuthenticated
              ? "home"
              : "login"
          }
        >
          <Stack.Screen
            name="getstarted"
            component={GetStarted}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="myservices"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="editprofile"
            component={EditProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="camera"
            component={Camera}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="updatepassword"
            component={UpdatePassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="forgetpassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="allorders"
            component={AllOrders}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="allusers"
            component={AllUsers}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="allservices"
            component={AllServices}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="createservice"
            component={CreateService}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="updateservice"
            component={UpdateService}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="orderdetails"
            component={OrderDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="sellerdashboard"
            component={SellerDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="sellerallservices"
            component={SellerAllServices}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="sellercreateservice"
            component={SellerCreateService}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="sellerupdateservice"
            component={SellerUpdateService}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="sellerallorders"
            component={SellerAllOrders}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="sellerorderdetails"
            component={SellerOrderDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="sellerDetails"
            component={SellerDetails}
            options={{ headerShown: true,title:'Seller Details' }}
          />
          <Stack.Screen
            name="createcategory"
            component={CreateCategory}
            options={{ headerShown: true,title:'Create Category' }}
          />
          {/* <Stack.Screen name='verify' component={Verify} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
        {isAuthenticated && <Footer />}
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#fff"
          translucent={true}
        />
      </NavigationContainer>
    );
  }
};

export default Main;
// {{headerShown:false}}
// {isAuthenticated ? "home" : "login"}
