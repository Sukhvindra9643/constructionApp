import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon3 from "react-native-vector-icons/FontAwesome";
import LinkContainer from "../LinkContainer";
import { useSelector } from "react-redux";

const SellerDashboard = ({ navigation }) => {
 const {services} = useSelector(state => state.services);

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
          >
            <Text style={Styles.text} onPress={() => navigation.navigate("sellerallservices")}>Services</Text>
            <Text style={Styles.text} onPress={() => navigation.navigate("sellerallservices")}>{services && services.length}</Text>
          </View>
          <View
            style={Styles.circle}
          >
            <Text style={Styles.text} onPress={() => navigation.navigate("sellerallorders")}>Orders</Text>
            <Text style={Styles.text} onPress={() => navigation.navigate("sellerallorders")}>60</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SellerDashboard;

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
