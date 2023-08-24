import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon3 from "react-native-vector-icons/FontAwesome";
import LinkContainer from "../components/LinkContainer";
import Loader from "../components/Loader";


const SellerDashboard = ({ navigation }) => {
  const [myMaterial, setMyMaterial] = useState([]);
  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyMaterials = () => {
    let apiUrl = "http://64.227.172.50:5000/api/v1/mycontact";
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    })
      .then(async (response) => {
        let data = await response.json();
        if (data.success) {
          setLoading(false);
          setMyMaterial(data.mycontact);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const getMyServices = () => {
    let apiUrl = "http://64.227.172.50:5000/api/v1/getsellerservicequery";
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    })
      .then(async (response) => {
        let data = await response.json();
        if (data.success) {
          setLoading(false);
          setMyServices(data.serviceQueries);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const totolEarningFromService = myServices.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  useEffect(() => {
    getMyMaterials();
    getMyServices();
  }, []);

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <SafeAreaView>
      <View style={{ backgroundColor: "#eeeeee" }}>
        <LinkContainer navigation={navigation} />
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
            <Text style={Styles.priceheading}>Total Earning From Service</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <Icon3 name="rupee" size={16} />
              <Text style={Styles.price}>{totolEarningFromService}</Text>
            </View>
          </View>
        </View>
        <View style={Styles.circleContainer}>
          <View style={Styles.circle}>
            <Text style={Styles.text}>Services</Text>
            <Text style={Styles.text}>{myServices && myServices.length}</Text>
          </View>
          <View style={Styles.circle}>
            <Text style={Styles.text}>Materials</Text>
            <Text style={Styles.text}>{myMaterial && myMaterial.length}</Text>
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
