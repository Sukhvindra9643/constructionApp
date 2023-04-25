import { View, Text, StyleSheet } from "react-native";
import React,{useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon3 from "react-native-vector-icons/FontAwesome";
import LinkContainer from "../LinkContainer";
import { useSelector } from "react-redux";
import axios from "axios";

const Dashboard = ({ navigation }) => {
  const [users, setUsers] = React.useState([]);

  const {services} = useSelector(state => state.services);

  const getAllUsers = async () => {
    const serverUrl = "http://192.168.54.195:4000/api/v1";

    const { data } = await axios.get(`${serverUrl}/admin/users`);
    setUsers(data.users);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "#eeeeee" }}>
        <LinkContainer navigation={navigation}/>
        <View style={Styles.dashboardContainer}>
          <Text style={Styles.heading}>Dashboard</Text>
          <View
            style={{
              backgroundColor: "lightblue",
              width: "90%",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={Styles.priceheading}>Total Amount</Text>
            <Text style={Styles.price}>
              <Icon3 name="rupee" size={13} />
              499
            </Text>
          </View>
        </View>
        <View style={Styles.circleContainer}>
          <View
            style={Styles.circle}
            onPress={() => navigation.navigate("allservices")}
          >
            <Text style={Styles.text}>Services</Text>
            <Text style={Styles.text}>{services && services.length}</Text>
          </View>
          <View
            style={Styles.circle}
            onPress={() => navigation.navigate("allorders")}
          >
            <Text style={Styles.text}>Orders</Text>
            <Text style={Styles.text}>60</Text>
          </View>
          <View
            style={Styles.circle}
            onPress={() => navigation.navigate("allusers")}
          >
            <Text style={Styles.text}>Users</Text>
            <Text style={Styles.text}>{users && users.length}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const Styles = new StyleSheet.create({
  dashboardContainer: {
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 10,
    padding: 10,
  },
  heading: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Poppins_400Regular",
  },
  priceheading: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
  },
  price: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  text: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
    gap: 10,
  },
  circle: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
});
