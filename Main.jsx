import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import React, { useEffect, useState } from "react";
import { StatusBar, View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";

// Admin Screens
import AllCategory from "./Admin/AllCategory.jsx";
import AllMaterial from "./Admin/AllMaterial.jsx";
import AllServices from "./Admin/AllServices.jsx";
import AllUsers from "./Admin/AllUsers.jsx";
import CreateCategory from "./Admin/CreateCategory.jsx";
import CreateMaterial from "./Admin/CreateMaterial.jsx";
import CreateService from "./Admin/CreateService.jsx";
import CreateServiceQuery from "./Admin/CreateServiceQuery.jsx";
import Dashboard from "./Admin/Dashboard.jsx";
import UpdateCategory from "./Admin/UpdateCategory.jsx";
import UpdateService from "./Admin/UpdateService.jsx";

// Seller Screens
import SellerAllServices from "./Seller/SellerAllServices.jsx";
import SellerCreateService from "./Seller/SellerCreateService.jsx";
import SellerDashboard from "./Seller/SellerDashboard.jsx";

// Other Screens
import AllQueries from "./screens/AllQueries.jsx";
import CreateQuery from "./screens/CreateQuery.jsx";
import EditProfile from "./screens/EditProfile.jsx";
import ForgotPassword from "./screens/ForgotPassword.jsx";
import Home from "./screens/Home.jsx";
import Login from "./screens/Login.jsx";
import MyContact from "./screens/MyContact.jsx";
import MyQueries from "./screens/MyQueries.jsx";
import Pay from "./screens/Pay.jsx";
import Payment from "./screens/Payment.jsx";
import Profile from "./screens/Profile.jsx";
import Register from "./screens/Register.jsx";
import SellerDetails from "./screens/SellerDetails.jsx";
import SellerList from "./screens/SellerList.jsx";
import SellerRegisterDetail from "./screens/SellerRegisterDetail.jsx";
import Splash from "./screens/Splash.jsx";
import UpdatePassword from "./screens/UpdatePassword.jsx";
import Verify from "./screens/Verify.jsx";


import { loadUser } from "./redux/actions/userAction.js";

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Main = () => {
  const [user, setUser] = React.useState(null);
  const [isConnected, setIsConnected] = useState(true);

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const getUserDetails = () => {
    let apiUrl = "http://64.227.172.50:5000/api/v1/me";
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    })
      .then(async (response) => {
        let data = await response.json();
        if (data.success) {
          setUser(data.user);
          storeData(data.user);
        }
      })
  };
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  function BottomTab({ route }) {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={28} color="#003580" />
              ) : (
                <AntDesign name="home" size={28} color="black" />
              ),
          }}
        />
        {route.params.user.role === "user" && (
          <Tab.Screen
            name="myqueries"
            component={MyQueries}
            initialParams={{info: route.params}}
            options={{
              tabBarLabel: "My Queries",
              tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" },
              headerShown: true,
              title: "My Queries",
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Ionicons name="basket" size={28} color="#003580" />
                ) : (
                  <Ionicons name="basket-outline" size={28} color="black" />
                ),
            }}
          />
        )}
        {route.params.user.role !== "user" && (
          <Tab.Screen
            name="mycontact"
            component={MyContact}
            initialParams={{info: route.params}}
            options={{
              tabBarLabel: "My Contacts",
              tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" },
              headerShown: true,
              title: "My Contacts",
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <MaterialCommunityIcons
                    name="contacts"
                    size={28}
                    color="#003580"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="contacts-outline"
                    size={28}
                    color="black"
                  />
                ),
            }}
          />
        )}
        {route.params.user.role !== "user" && (
          <Tab.Screen
            name="allqueries"
            component={AllQueries}
            options={{
              tabBarLabel: "All Queries",
              tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" },
              headerShown: true,
              title: "All Queries",
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Ionicons name="notifications" size={28} color="#003580" />
                ) : (
                  <Ionicons
                    name="notifications-outline"
                    size={28}
                    color="black"
                  />
                ),
            }}
          />
        )}
        {route.params.user.role === "admin" && (
          <Tab.Screen
            name="dashboard"
            component={Dashboard}
            options={{
              tabBarLabel: "Dashboard",
              tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <MaterialCommunityIcons
                    name="view-dashboard"
                    size={28}
                    color="#003580"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="view-dashboard-outline"
                    size={28}
                    color="black"
                  />
                ),
            }}
          />
        )}
        {route.params.user.role === "seller" && (
          <Tab.Screen
            name="sellerdashboard"
            component={SellerDashboard}
            options={{
              tabBarLabel: "Dashboard",
              tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <MaterialCommunityIcons
                    name="view-dashboard"
                    size={28}
                    color="#003580"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="view-dashboard-outline"
                    size={28}
                    color="black"
                  />
                ),
            }}
          />
        )}
        <Tab.Screen
          name="profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={28} color="#003580" />
              ) : (
                <Ionicons name="person-outline" size={28} color="black" />
              ),
          }}
        /> 
      </Tab.Navigator>
    );
  }
  const checkConnectivity = () => {
    NetInfo.fetch().then((state) => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
      setIsConnected(state.isConnected);
    });
  };
  useEffect(() => {
    getUserDetails();
    dispatch(loadUser());
  }, [token]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (isConnected) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"splash"}>
          <Stack.Screen
            name="main"
            component={BottomTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="allcategory"
            component={AllCategory}
            options={{ headerShown: true, title: "All Categories" }}
          />
          <Stack.Screen
            name="allmaterial"
            component={AllMaterial}
            options={{
              headerShown: true,
              title: "All Materials and Services",
            }}
          />
          <Stack.Screen
            name="allservices"
            component={AllServices}
            options={{ headerShown: true, title: "All Services" }}
          />
          <Stack.Screen
            name="allusers"
            component={AllUsers}
            options={{ headerShown: true, title: "All Users" }}
          />
          <Stack.Screen
            name="createcategory"
            component={CreateCategory}
            options={{ headerShown: true, title: "Create Category" }}
          />
          <Stack.Screen
            name="creatematerial"
            component={CreateMaterial}
            options={{
              headerShown: true,
              title: "Create Materials and Services",
            }}
          />
          <Stack.Screen
            name="createservice"
            component={CreateService}
            options={{ headerShown: true, title: "Create Service" }}
          />
          <Stack.Screen
            name="createservicequery"
            component={CreateServiceQuery}
            options={{ headerShown: true, title: "Create Service Query" }}
          />
          <Stack.Screen
            name="dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="updatecategory"
            component={UpdateCategory}
            options={{ headerShown: true, title: "Update Category" }}
          />
          <Stack.Screen
            name="updateservice"
            component={UpdateService}
            options={{ headerShown: true, title: "Update Service" }}
          />

          <Stack.Screen
            name="sellerallservices"
            component={SellerAllServices}
            options={{
              headerShown: true,
              title: "All Services and Materials",
            }}
          />
          <Stack.Screen
            name="sellercreateservice"
            component={SellerCreateService}
            options={{
              headerShown: true,
              title: "Create Service and Material",
            }}
          />
          <Stack.Screen
            name="sellerdashboard"
            component={SellerDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="allqueries"
            component={AllQueries}
            options={{ headerShown: true, title: "All Queries" }}
          />
          <Stack.Screen
            name="createQuery"
            component={CreateQuery}
            options={{ headerShown: true, title: "Create Query" }}
          />
          <Stack.Screen
            name="editprofile"
            component={EditProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="forgetpassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="mycontact"
            component={MyContact}
            options={{ headerShown: true, title: "My Contact" }}
          />
          <Stack.Screen
            name="myqueries"
            component={MyQueries}
            options={{ headerShown: true, title: "My Queries" }}
          />
          <Stack.Screen
            name="pay"
            component={Pay}
            options={{ headerShown: true, title: "Pay" }}
          />
          <Stack.Screen
            name="payment"
            component={Payment}
            options={{ headerShown: true, title: "Payment" }}
          />
          <Stack.Screen
            name="profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="sellerDetails" options={{ headerShown: false }}>
            {(props) => <SellerDetails {...props} user={user} />}
          </Stack.Screen>
          <Stack.Screen
            name="sellerList"
            component={SellerList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="sellerRegisterDetail"
            component={SellerRegisterDetail}
            options={{ headerShown: true,title:"Seller Business Info" }}
          />
          <Stack.Screen
            name="splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="updatepassword"
            component={UpdatePassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="verify"
            component={Verify}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#fff"
          translucent={true}
        />
      </NavigationContainer>
    );
    //   );
    // }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <Image
          source={require("./assets/nointernet.jpg")}
          style={{ width: 250, height: 150 }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            padding: 10,
            width: 100,
            borderRadius: 10,
          }}
          onPress={() => checkConnectivity()}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Main;
