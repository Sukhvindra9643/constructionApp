import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";


const AllQueries = ({ navigation }) => {
  const [allMaterials, setAllMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  const [myMaterial, setMyMaterial] = useState([]);
  const [selected, setSelected] = useState("Material");
  const [allQueryServices, setAllQueryServices] = useState([]);
  const [myQueryServices, setMyQueryService] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllMaterials();
    getUserDetails();
  }, []);

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
        setLoading(false);
        setRefreshing(false);
        setUser(data.user);
      })
      .catch((err) => {
        setLoading(false);
        setRefreshing(false);
      });
  };
  const getAllMaterials = () => {
    let apiUrl = "http://64.227.172.50:5000/api/v1/getAllQueries";
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
          setRefreshing(false);
          setAllMaterials(data.queries);
        }
      })
      .catch((err) => {
        setLoading(false);
        setRefreshing(false);
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
          let id = data.mycontact.map((m) => m.queryId);
          setMyMaterial(id);
          setLoading(false);
          setRefreshing(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const getAllQueryServices = () => {
    let apiUrl = "http://64.227.172.50:5000/api/v1/getAllQueryServices";
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
          setRefreshing(false);
          setAllQueryServices(data.queries);
        }
      })
      .catch((err) => {
        setLoading(false);
        setRefreshing(false);
      });
  };
  const getMyServices = () => {
    let apiUrl = "http://64.227.172.50:5000/api/v1/myQueryService"
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    })

      .then(async (response) => {
        let data = await response.json();
        if (data.success) {
          let id = data.myqueryservices.map((m) => m.serviceId);
          setMyQueryService(id);
          setLoading(false);
          setRefreshing(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const handlePayment = (query,category) => {
    if (user.wallet >= 0 && user.wallet < query.budget * 0.02) {
      navigation.navigate("payment", {
        query,
        category: category,
        seller: user,
      });
    } else if (user.wallet >= query.budget * 0.02) {
      navigation.navigate("pay", { query, category: category, seller: user });
    }
  };
  useEffect(() => {
    getMyMaterials();
    getAllMaterials();
    getUserDetails();
    getAllQueryServices();
    getMyServices();
  }, []);

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity
          onPress={() => setSelected("Material")}
          style={{
            backgroundColor: selected === "Material" ? "#000" : "gray",
            padding: 10,
            width: "50%",
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            Material Queries
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelected("Service")}
          style={{
            backgroundColor: selected === "Service" ? "#000" : "gray",
            padding: 10,
            width: "50%",
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            Service Queries
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{marginBottom: 50}}
      >
        {selected === "Material" && <View style={styles.container}>
          {allMaterials.length > 0 &&
            allMaterials.map(
              (query, index) =>
                !myMaterial.includes(query._id) && (
                  <View key={index} style={styles.card}>
                    <Text style={styles.title}>{query.name}</Text>
                    <Text style={styles.budget}>Budget : ₹ {query.budget}</Text>
                    <Text style={styles.area}>
                      Quantity : {query.area} {query.unit}
                    </Text>
                    <Text style={styles.phone}>
                      Contact no. : {query.mobile.toString().substring(0, 5)}
                      XXXXX
                    </Text>
                    <Text style={styles.phone}>
                      Locality : {query.locality.split(",").splice(2)}
                    </Text>
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
                      onPress={() => handlePayment(query,"Material")}
                    >
                      <Text style={{ color: "#fff", textAlign: "center" }}>
                        Get Contact Details
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
                          style={{
                            width: 27,
                            height: 27,
                            marginLeft: -5,
                            marginBottom: 5,
                          }}
                        />
                        <Text style={styles.budget}>
                          {Math.round(query.budget * 0.02)}
                        </Text>
                      </View>
                    </View>
                  </View>
                )
            )}
        </View>}
        {selected === "Material" && allMaterials.length == 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: "Poppins_400Regular" }}>
              No Materials Query found
            </Text>
          </View>
        )}
        {selected === "Service" && <View style={styles.container}>
          {allQueryServices &&
            allQueryServices.map(
              (query, index) =>
                !myQueryServices.includes(query._id) && (
                  <View key={index} style={styles.card}>
                    <Text style={styles.title}>{query.name}</Text>
                    <Text style={styles.budget}>Budget : ₹ {query.budget}</Text>
                    <Text style={styles.phone}>
                      Contact no. : {query.mobile.toString().substring(0, 5)}
                      XXXXX
                    </Text>
                    <Text style={styles.phone}>
                      Locality : {query.locality.split(",").splice(2)}
                    </Text>
                    <Text style={styles.phone}>
                      CreatedAt : {query.createdAt.substring(0, 10)}
                    </Text>
                    <View style={{ borderWidth: 0.5, opacity: 0.4 }}></View>
                    <Text style={{fontSize:18}}>Service Name :- {query.serviceName}</Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#000",
                        padding: 10,
                        borderRadius: 10,
                        marginTop: 10,
                      }}
                      onPress={() => handlePayment(query,"Service")}
                    >
                      <Text style={{ color: "#fff", textAlign: "center" }}>
                        Get Contact Details
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
                          style={{
                            width: 27,
                            height: 27,
                            marginLeft: -5,
                            marginBottom: 5,
                          }}
                        />
                        <Text style={styles.budget}>
                          {Math.round(query.budget * 0.02)}
                        </Text>
                      </View>
                    </View>
                  </View>
                )
            )}
        </View>}
        {selected === "Service" && allMaterials.length == 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: "Poppins_400Regular" }}>
              No Service Query found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AllQueries;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
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
  swipScreen: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 35,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    // backgroundColor:"blue",
    padding: 10,
    marginTop: 0,
  },
  btnText: {
    fontSize: 24,
    fontFamily: "Poppins_500Medium",
  },
  underline: {
    textTransform: "uppercase",
    borderBottomColor: "gray",
    borderBottomWidth: 5,
  },
  nonunderline: {
    textTransform: "uppercase",
    marginBottom: 5,
  },
});
