import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import React from "react";

const Home = ({ navigation }) => {
  const getStartedHandler = async() => {
    try{
      navigation.navigate("login");
    }catch(err){
      console.log("Error getStartedHandler: ", err);
    }
     
  
  };
  return (
    <View style={Styles.container}>
      <View style={Styles.eclipsContainer}>
      <Image style={Styles.cornerimg} source={require("../assets/cornerdesign.jpg")} />
      </View>
      <Image style={Styles.img} source={require("../assets/getstarted.jpg")} />
      <Text style={Styles.heading}>Gets things done easily</Text>
      <View style={Styles.descContainer}>
        <Text style={Styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim earum
          ducimus odio, fugiat architecto voluptas fugiat architecto voluptas.
        </Text>
      </View>
      <View style={Styles.btnContainer}>
        <Button textColor={"white"} labelStyle={{fontSize: 25}} onPress={getStartedHandler}>
          <Text style={Styles.btnText}>Get Started</Text>
        </Button>
      </View>
    </View>
  );
};

export default Home;

const Styles = StyleSheet.create({
  container: {
    width: "100%",
    position:"relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eeeeee",
  },
  descContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  eclipsContainer:{
    position:"absolute",
    width: "100%",
    height: 220,
    top: 0,
    left: 0,
  },
  cornerimg: {
    position: "absolute",
    width: "100%",
    height: 250,
    top: 31,
    left: 0,
  },
  btnContainer: {
    position: "absolute",
    width: "90%",
    height:60,
    backgroundColor: "#49D9C8",
    alignItems:"center",
    justifyContent:"center",
    bottom:30
  },
  btnText: {
    fontSize:30,
    color:"white",
    lineHeight:60,
    fontFamily:"Poppins_600SemiBold"
    // fontStyle:"Poppins_700Bold"
  },
  img: {
    position: "absolute",
    width: 300,
    height:250,
    left: 50,
    top: 200,
  },
  heading: {
    marginTop: 220,
    fontWeight: 600,
    fontSize: 24,
    lineHeight: 30,
    textAlign: "center",
    letterSpacing: 1,
    fontFamily:"Poppins_600SemiBold"
  },
  desc: {
    width: "100%",
    fontSize:18,
    fontFamily:"Poppins_400Regular",
    textAlign:"center",
    letterSpacing:1,
  },
});
