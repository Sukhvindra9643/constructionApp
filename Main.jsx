import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import React, { useEffect,useSelector } from "react";
import { StatusBar } from "react-native";
import { useDispatch} from "react-redux";
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

const Stack = createNativeStackNavigator();
import { loadUser } from "./redux/actions/userAction";

const Main = () => {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const dispatch = useDispatch();
  // const {loading,isAuthenticated} = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // console.log(message)
  let loading = false;
  let isAuthenticated = false;
  if (!fontsLoaded) {
    return <Loader />;
  } else {
    return loading ? (
      <Loader />
    ) : (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isAuthenticated ? "home" : "getstarted"}>
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
          {/* 
        // 
        <Stack.Screen name='verify' component={Verify} options={{ headerShown: false }} />
        <Stack.Screen name='profile' component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name='changepassword' component={ChangePassword} options={{ headerShown: false }} />
        <Stack.Screen name='resetpassword' component={ResetPassword} options={{ headerShown: false }} /> */}
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
