import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";

const LinkContainer = ({navigation}) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <View style={Styles.linkContainer}>
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        paddingVertical: 10,
      }}
    >
      <Icon
        name="dashboard"
        size={25}
        onPress={() => navigation.navigate(user.role === 'admin'?"dashboard":"sellerdashboard")}
      />
      <Text
        style={Styles.text}
        onPress={() => navigation.navigate(user.role === 'admin'?"dashboard":"sellerdashboard")}
      >
        Dashboard
      </Text>
    </View>
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        paddingVertical: 10,
      }}
    >
      <Icon
        name="miscellaneous-services"
        size={25}
        onPress={() => navigation.navigate(user.role === 'admin'?"allorders":"sellerallorders")}
      />
      <Text
        style={Styles.text}
        onPress={() => navigation.navigate(user.role === 'admin'?"allorders":"sellerallorders")}
      >
        Orders
      </Text>
    </View>
    {user.role === 'admin' && <View
      style={{
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        paddingVertical: 10,
      }}
    >
      <Icon2
        name="users"
        size={25}
        onPress={() => navigation.navigate("allusers")}
      />
      <Text
        style={Styles.text}
        onPress={() => navigation.navigate("allusers")}
      >
        Users
      </Text>
    </View>}
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        paddingVertical: 10,
      }}
    >
      <Icon
        name="home-repair-service"
        size={25}
        style={{ paddingBottom: 7 }}
        onPress={() => navigation.navigate(user.role === 'admin'?"allservices":"sellerallservices")}
      />
      <Text
        style={Styles.text}
        onPress={() => navigation.navigate(user.role === 'admin'?"allservices":"sellerallservices")}
      >
        All Services
      </Text>
    </View>
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        paddingVertical: 10,
      }}
    >
      <Icon1
        name="pluscircleo"
        size={25}
        onPress={() => navigation.navigate(user.role === 'admin'?"createservice":"sellercreateservice")}
      />
      <Text
        style={Styles.text}
        onPress={() => navigation.navigate(user.role === 'admin'?"createservice":"sellercreateservice")}
      >
        Create Service
      </Text>
    </View>
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        paddingVertical: 10,
      }}
    >
      <Icon1
        name="pluscircleo"
        size={25}
        onPress={() => navigation.navigate("createcategory")}
      />
      <Text
        style={Styles.text}
        onPress={() => navigation.navigate("createcategory")}
      >
        Create Category
      </Text>
    </View>
  </View>
  );
};

export default LinkContainer;

const Styles = new StyleSheet.create({
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 30,
    flexWrap: "wrap",
    gap:10
  },
  text: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },
});
