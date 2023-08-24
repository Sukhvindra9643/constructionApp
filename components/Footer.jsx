import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Icon1 from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const Footer = ({user}) => {
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

      {user && user.role === "user" && (
        <TouchableOpacity onPress={() => navigation.navigate("myqueries")}>
          <Icon1
            style={{ marginLeft: 15 }}
            name="library-outline"
            size={30}
            color="#900"
          />
          <Text>My Queries</Text>
        </TouchableOpacity>
      )}
      {user && user.role !== "user" && (
        <TouchableOpacity onPress={() => navigation.navigate("mycontact")}>
          <Icon2
            style={{ marginLeft: 15 }}
            name="perm-contact-cal"
            size={30}
            color="#900"
          />
          <Text>My Contact</Text>
        </TouchableOpacity>
      )}
      {user && user.role !== "user" && (
        <TouchableOpacity onPress={() => navigation.navigate("allqueries")}>
          <Icon1
            style={{ marginLeft: 15 }}
            name="library-outline"
            size={30}
            color="#900"
          />
          <Text>All Queries</Text>
        </TouchableOpacity>
      )}

      {user && user.role === "admin" && (
        <TouchableOpacity onPress={() => navigation.navigate("dashboard")}>
          <Icon2
            style={{ marginLeft: 12 }}
            name="dashboard"
            size={30}
            color="#900"
          />

          <Text>Dashboard</Text>
        </TouchableOpacity>
      )}
      {user && user.role === "seller" && (
        <TouchableOpacity
          onPress={() => navigation.navigate("sellerdashboard")}
        >
          <Icon2
            style={{ marginLeft: 12 }}
            name="dashboard"
            size={30}
            color="#900"
          />

          <Text>Dashboard</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate("profile")}>
        <Icon style={{ marginLeft: 5 }} name="user" size={30} color="#900" />
        <Text>Profiles </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
