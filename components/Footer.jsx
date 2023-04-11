import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Icon1 from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        padding: 2,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("home")}>
        <Icon name="home" size={30} color="#900" />
        <Text>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("mycourse")}>
        <Icon1
          style={{ marginLeft: 15 }}
          name="library-outline"
          size={30}
          color="#900"
        />
        <Text>My Courses</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("downloads")}>
        <Icon
          style={{ marginLeft: 12 }}
          name="download"
          size={30}
          color="#900"
        />

        <Text>Downloads</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("profile")}>
        <Icon style={{ marginLeft: 5 }} name="user" size={30} color="#900" />
        <Text>Profiles </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
