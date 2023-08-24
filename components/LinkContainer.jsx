import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Loader from "./Loader";

const LinkContainer = ({ navigation }) => {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

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
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return loading ? (
    <Loader />
  ) : (
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
          onPress={() =>
            navigation.navigate(
              user.role === "admin" ? "dashboard" : "sellerdashboard"
            )
          }
        />
        <Text
          style={Styles.text}
          onPress={() =>
            navigation.navigate(
              user.role === "admin" ? "dashboard" : "sellerdashboard"
            )
          }
        >
          Dashboard
        </Text>
      </View>
      {user.role === "admin" && (
        <View
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
        </View>
      )}
      {user.role === "admin" && (
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
            onPress={() => navigation.navigate("allmaterial")}
          />
          <Text
            style={Styles.text}
            onPress={() => navigation.navigate("allmaterial")}
          >
            All Material
          </Text>
        </View>
      )}

      {user.role === "admin" && (
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
            onPress={() =>
              navigation.navigate(
                user.role === "admin" ? "allcategory" : "allcategory"
              )
            }
          />
          <Text
            style={Styles.text}
            onPress={() =>
              navigation.navigate(
                user.role === "admin" ? "allcategory" : "allcategory"
              )
            }
          >
            All Category
          </Text>
        </View>
      )}

      {user.role === "admin" && (
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
      )}
      {user.role === "admin" && (
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
            onPress={() => navigation.navigate("creatematerial")}
          />
          <Text
            style={Styles.text}
            onPress={() => navigation.navigate("creatematerial")}
          >
            Add Material
          </Text>
        </View>
      )}
      {user.role === "admin" && (
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
            onPress={() =>
              navigation.navigate("createservice")}
          />
          <Text
            style={Styles.text}
            onPress={() => navigation.navigate("createservice")}
          >
            Create Query Service
          </Text>
        </View>
      )}
      {user.role === "admin" && (
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
            onPress={() =>
              navigation.navigate(
                user.role === "admin" ? "allservices" : "sellerallservices"
              )
            }
          />
          <Text
            style={Styles.text}
            onPress={() =>
              navigation.navigate(
                user.role === "admin" ? "allservices" : "sellerallservices"
              )
            }
          >
            All Query Services
          </Text>
        </View>
      )}
      {user.role === "seller" && (
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
            onPress={() => navigation.navigate("sellercreateservice")}
          />
          <Text
            style={Styles.text}
            onPress={() => navigation.navigate("sellercreateservice")}
          >
            Add Materials & Services
          </Text>
        </View>
      )}
      {user.role === "seller" && (
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
            onPress={() => navigation.navigate("sellerallservices")}
          />
          <Text
            style={Styles.text}
            onPress={() => navigation.navigate("sellerallservices")}
          >
            All Materials & Services
          </Text>
        </View>
      )}
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
    gap: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },
});
