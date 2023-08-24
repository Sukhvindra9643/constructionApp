import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { StackActions } from "@react-navigation/native";

const Pay = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = React.useState({});
  const { query, category } = route.params;

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
        setUser(data.user);
      })
      .catch((err) => {});
  };

  const handlePayment = ({
    _id,
    name,
    budget,
    area,
    mobile,
    materials,
    locality,
    unit,
  }) => {
    if (user.wallet >= budget * 0.02) {
      setLoading(true);
      const myForm1 = new FormData();
      myForm1.append("queryId", _id);
      myForm1.append("name", name);
      myForm1.append("area", area);
      myForm1.append("mobile", mobile);
      myForm1.append("budget", budget);
      myForm1.append("materials", materials);
      myForm1.append("charge", budget * 0.02);
      myForm1.append("unit", unit);
      myForm1.append("locality", locality);
      myForm1.append("userId", query.user);

      axios
        .post("http://64.227.172.50:5000/api/v1/createcontact", myForm1, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.success) {
            setLoading(false);
            const amount = user.wallet - budget * 0.02;
            const myForm = new FormData();
            myForm.append("wallet", amount);
            axios
              .put(`http://64.227.172.50:5000/api/v1/me/update`, myForm, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                if (response.data.success) {
                  Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: "Success",
                    textBody: "Payment Successfull!",
                  });
                  navigation.dispatch(
                    StackActions.replace("main", {
                      screen: "mycontact",
                      user: user,
                      category: "Materials",
                    })
                  );
                }
              });
          }
        });
    } else {
      navigation.navigate("payment", {
        query,
        category: category,
        seller: user,
      });
    }
  };
  const handleServicePayment = (query) => {
    if (user.wallet >= query.budget * 0.02) {
      setLoading(true);
      const myForm1 = new FormData();
      myForm1.append("name", query.name);
      myForm1.append("mobile", query.mobile);
      myForm1.append("budget", query.budget);
      myForm1.append("charge", query.budget * 0.02);
      myForm1.append("serviceId", query._id);
      myForm1.append("serviceName", query.serviceName);
      myForm1.append("locality", query.locality);
      myForm1.append("userId", query.user);

      axios
        .post(
          "http://64.227.172.50:5000/api/v1/createservicecontact",
          myForm1,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            setLoading(false);
            const amount = user.wallet - query.budget * 0.02;
            const myForm = new FormData();
            myForm.append("wallet", amount);
            axios
              .put(`http://64.227.172.50:5000/api/v1/me/update`, myForm, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                if (response.data.success) {
                  Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: "Success",
                    textBody: "Payment Successfull!",
                  });
                  navigation.dispatch(
                    StackActions.replace("main", {
                      screen: "mycontact",
                      user: user,
                      category: "ServicesQuery",
                    })
                  );
                }
              });
          }
        });
    } else {
      navigation.navigate("payment", {
        query,
        category: category,
        seller: user,
      });
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          backgroundColor: "#fff",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Icon name="wallet" size={20} style={styles.icon} />
          <Text style={styles.text1}>Current Balance</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Image
            source={require("../assets/rupee.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text style={styles.text1}>
            {user.wallet && Math.round(user.wallet)}
          </Text>
        </View>
      </View>
      {category === "Material" && (
        <View
          style={{
            alignItems: "center",
            marginTop: 5,
            backgroundColor: "white",
          }}
        >
          <View style={styles.card}>
            <Text style={styles.title}>{query.name}</Text>
            <Text style={styles.budget}>Budget : ₹ {query.budget}</Text>
            <Text style={styles.area}>
              Area : {query.area} {query.unit}
            </Text>
            <Text style={styles.phone}>
              Contact no. : {query.mobile.toString().substring(0, 5)}XXXXX
            </Text>
            <Text style={styles.phone}>Locality : {query.locality}</Text>
            <Text style={styles.phone}>
              CreatedAt : {query.createdAt.substring(0, 10)}
            </Text>
            <View style={{ borderWidth: 0.5, opacity: 0.4 }}></View>
            <Text style={styles.heading}>Material list</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {query.materials &&
                query.materials.map((m, index) => (
                  <View style={styles.badge} key={index}>
                    <Text style={styles.materials}>{m}</Text>
                  </View>
                ))}
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#000",
                padding: 10,
                borderRadius: 10,
                marginTop: 10,
              }}
              onPress={() => handlePayment(query)}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Pay {Math.round(query.budget * 0.02)}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                right: 12,
                top: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  justifyContent: "center",
                  width: 50,
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/rupee.png")}
                  style={{ width: 25, height: 25, marginBottom: 5 }}
                />
                <Text style={styles.budget}>
                  {Math.round(query.budget * 0.02)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
      {category === "Service" && (
        <View
          style={{
            alignItems: "center",
            marginTop: 5,
            backgroundColor: "white",
          }}
        >
          <View style={styles.card}>
            <Text style={styles.title}>{query.name}</Text>
            <Text style={styles.budget}>Budget : ₹ {query.budget}</Text>
            <Text style={styles.phone}>
              Contact no. : {query.mobile.toString().substring(0, 5)}XXXXX
            </Text>
            <Text style={styles.phone}>Locality : {query.locality}</Text>
            <Text style={styles.phone}>
              CreatedAt : {query.createdAt.substring(0, 10)}
            </Text>
            <View style={{ borderWidth: 0.5, opacity: 0.4 }}></View>
            <Text style={{ fontSize: 17, fontFamily: "Poppins_400Regular" }}>
              Service Name : {query.serviceName}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#000",
                padding: 10,
                borderRadius: 10,
                marginTop: 10,
              }}
              onPress={() => handleServicePayment(query)}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Pay {Math.round(query.budget * 0.02)}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                right: 12,
                top: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  justifyContent: "center",
                  width: 50,
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/rupee.png")}
                  style={{ width: 25, height: 25, marginBottom: 5 }}
                />
                <Text style={styles.budget}>
                  {Math.round(query.budget * 0.02)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#eeeeee",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    paddingLeft: 10,
  },
  icon: {
    opacity: 0.8,
    width: 40,
  },
  text1: {
    fontSize: 16,
  },
  card: {
    width: "90%",
    backgroundColor: "white",
    shadowColor: "white",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 10,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  heading: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    textTransform: "uppercase",
  },
  budget: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },
  area: {
    fontSize: 17,
    fontFamily: "Poppins_400Regular",
  },
  phone: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  materials: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    color: "#fff",
  },
  badge: {
    backgroundColor: "gray",
    opacity: 0.8,
    borderRadius: 10,
    padding: 5,
    margin: 5,
    shadowColor: "white",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 10,
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderBottomColor: "black",
    padding: 10,
    marginLeft: 10,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  content: {
    width: "70%",
    height: 150,
    padding: 10,
  },
});
