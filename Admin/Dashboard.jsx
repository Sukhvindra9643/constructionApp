import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon3 from "react-native-vector-icons/FontAwesome";
import LinkContainer from "../components/LinkContainer";
import axios from "axios";
import Loader from "../components/Loader";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const Dashboard = ({ navigation }) => {
  const [myMaterial, setMyMaterial] = useState([]);
  const [allMaterial, setAllMaterial] = useState([]);
  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [myQueryServices, setMyQueryService] = useState([]);

  const getAllMaterials = () => {
    let apiUrl = "http://64.227.172.50:5000/api/v1/getAllContact";
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
          setAllMaterial(data.contacts);
        }
      })
      .catch((err) => {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          message: "Something went wrong",
          duration: 2000,
        });
      });
  };
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
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          message: "Something went wrong",
          duration: 2000,
        });
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
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          message: "Something went wrong",
          duration: 2000,
        });
      });
  };
  const getAllUsers = async () => {
    const serverUrl = "http://64.227.172.50:5000/api/v1";

    const { data } = await axios.get(`${serverUrl}/admin/users`);
    setUsers(data.users);
  };
  const getMyQueryServices = () => {
    let apiUrl = "http://64.227.172.50:5000/api/v1/getAllServiceQuery";
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    })
      .then(async (response) => {
        let data = await response.json();
        if (data.success) {
          setMyQueryService(data.services);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };


  const totalEarningFromService = myServices.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  const totalEarningFromMaterial = allMaterial.reduce((acc, curr) => {
    return acc + curr.charge;
  }, 0);

  const totalEarningFromQueryServices = myQueryServices.reduce((acc, curr) => {
    return acc + curr.charge;
  }, 0);

  useEffect(() => {
    getMyMaterials();
    getMyServices();
    getAllMaterials();
    getAllUsers();
    getMyQueryServices();
  }, []);

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ backgroundColor: "#eeeeee" }}>
        <LinkContainer navigation={navigation} />
          <View style={Styles.dashboardContainer}>
            <Text style={Styles.heading}>Dashboard</Text>
            <View
              style={{
                backgroundColor: "lightblue",
                width: "95%",
                alignItems: "center",
                padding: 5,
              }}
            >
              <Text style={Styles.priceheading}>
                Total Earning From Service
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Icon3 name="rupee" size={16} />
                <Text style={Styles.price}>{totalEarningFromService}</Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "lightblue",
                width: "95%",
                alignItems: "center",
                padding: 5,
              }}
            >
              <Text style={Styles.priceheading}>
                Total Earning From Material Commision
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Icon3 name="rupee" size={16} />
                <Text style={Styles.price}>
                  {Math.round(totalEarningFromMaterial)}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "lightblue",
                width: "95%",
                alignItems: "center",
                padding: 5,
              }}
            >
              <Text style={Styles.priceheading}>
                Total Earning From Service Commision
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Icon3 name="rupee" size={16} />
                <Text style={Styles.price}>
                  {Math.round(totalEarningFromQueryServices)}
                </Text>
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
            <View style={Styles.circle}>
              <Text style={Styles.text}>Users</Text>
              <Text style={Styles.text}>{users && users.length}</Text>
            </View>
          </View>
      </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const Styles = new StyleSheet.create({
  dashboardContainer: {
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 10,
  },
  heading: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Poppins_400Regular",
  },
  priceheading: {
    fontSize: 17,
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
