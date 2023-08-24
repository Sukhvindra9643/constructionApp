import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { Rating } from "react-native-ratings";
import { FontAwesome } from "@expo/vector-icons";
import * as Linking from "expo-linking";

const MyContact = ({ route }) => {
  const [myMaterial, setMyMaterial] = useState([]);
  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { success } = route.params ? route.params : false;
  const [screen, setScreen] = useState(
    route.params.info.category || "Materials"
  );
  const [rate, setRate] = useState(4);
  const [refreshing, setRefreshing] = React.useState(false);
  const [myQueryServices, setMyQueryService] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMyMaterials();
    getMyServices();
  }, []);

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
          setMyMaterial(data.mycontact);
          setLoading(false);
          setRefreshing(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setRefreshing(false);
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
          setMyServices(data.serviceQueries);
          setLoading(false);
          setRefreshing(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setRefreshing(false);
      });
  };
  const getMyQueryServices = () => {
    let apiUrl = "http://64.227.172.50:5000/api/v1/myQueryService";
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    })
      .then(async (response) => {
        let data = await response.json();
        if (data.success) {
          setMyQueryService(data.myqueryservices);
        }
      })
      .catch((err) => {
        setLoading(false);
        setRefreshing(false);
      });
  };
  useEffect(() => {
    getMyMaterials();
    getMyServices();
    getMyQueryServices();
  }, [success]);

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <View>
      <View>
        <View style={styles.swipScreen}>
          <TouchableOpacity onPress={() => setScreen("Materials")}>
            <Text
              style={[
                styles.btnText,
                screen === "Materials" ? styles.underline : styles.nonunderline,
              ]}
            >
              Materials
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setScreen("Services")}>
            <Text
              style={[
                styles.btnText,
                screen === "Services" ? styles.underline : styles.nonunderline,
              ]}
            >
              Services
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setScreen("ServicesQuery")}>
            <Text
              style={[
                styles.btnText,
                screen === "ServicesQuery"
                  ? styles.underline
                  : styles.nonunderline,
              ]}
            >
              Services Query
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {screen === "Materials" && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 80 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.container}>
            {myMaterial &&
              myMaterial.map((contact, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.title}>{contact.name}</Text>
                  <Text style={styles.budget}>Budget : ₹ {contact.budget}</Text>
                  <Text style={styles.area}>
                    Quantity : {contact.area} {contact.unit}
                  </Text>
                  <Text style={styles.phone}>
                    Contact no. : {contact.mobile.toString().substring(0, 10)}
                  </Text>
                  <Text style={styles.phone}>
                    Locality : {contact.locality}
                  </Text>
                  <Text style={styles.phone}>
                    CreatedAt : {contact.createdAt.substring(0, 10)}
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
                    {contact.materials &&
                      contact.materials.map((m, index) => (
                        <View style={styles.badge} key={index}>
                          <Text style={styles.materials}>{m}</Text>
                        </View>
                      ))}
                  </View>
                  <View style={{flexDirection:"row",gap:10}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "black",
                      width: 120,
                      padding: 7,
                      borderRadius: 8,
                      flexDirection: "row",
                      gap: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                    onPress={() => Linking.openURL(`tel:${contact.mobile}`)}
                  >
                    <FontAwesome name="phone" size={24} color="white" />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      Call now
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "green",
                      width: 120,
                      padding: 7,
                      borderRadius: 8,
                      flexDirection: "row",
                      gap: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                    onPress={() => Linking.openURL(`https://wa.me/+91${contact.mobile}`)}
                  >
                    <FontAwesome name="whatsapp" size={24} color="white" />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      Whatsapp
                    </Text>
                  </TouchableOpacity>
                  </View>
                </View>
              ))}
          </View>
          {myMaterial.length == 0 && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 20, fontFamily: "Poppins_400Regular" }}>
                No Material found
              </Text>
            </View>
          )}
        </ScrollView>
      )}

      {screen === "Services" && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 80 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.container}>
            {myServices &&
              myServices.map((contact, index) => (
                <View style={Styles.container} key={index}>
                  <View style={Styles.avatarContainer}>
                    <Image style={Styles.img} source={{ uri: contact.url }} />
                  </View>
                  <View style={Styles.content}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {contact.sellername}
                    </Text>
                    <View
                      style={{ alignItems: "flex-start", paddingVertical: 5 }}
                    >
                      <Rating
                        type="star"
                        ratingCount={5}
                        imageSize={15}
                        startingValue={rate}
                        readonly
                      />
                    </View>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      ₹{contact.price}
                    </Text>

                    <Text>Contact no.: {contact.user.mobile}</Text>
                    <Text numberOfLines={2}>
                      Address: {contact.user.address}
                    </Text>
                    <Text>
                      CreatedAt : {contact.createdAt.substring(0, 10)}
                    </Text>

                    <View style={{flexDirection:"row",gap:5}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "black",
                      width: 100,
                      padding: 7,
                      borderRadius: 8,
                      flexDirection: "row",
                      gap: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                    onPress={() => Linking.openURL(`tel:${contact.user.mobile}`)}
                  >
                    <FontAwesome name="phone" size={24} color="white" />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      Call now
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "green",
                      width: 115,
                      padding: 7,
                      borderRadius: 8,
                      flexDirection: "row",
                      gap: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                    onPress={() => Linking.openURL(`https://wa.me/${contact.user.mobile}`)}
                  >
                    <FontAwesome name="whatsapp" size={24} color="white" />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      Whatsapp
                    </Text>
                  </TouchableOpacity>
                  </View>
                  </View>
                </View>
              ))}
          </View>
          {myServices.length == 0 && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 20, fontFamily: "Poppins_400Regular" }}>
                No Service found
              </Text>
            </View>
          )}
        </ScrollView>
      )}
      {screen === "ServicesQuery" && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 80 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.container}>
            {myQueryServices &&
              myQueryServices.map((query, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.title}>{query.name}</Text>
                  <Text style={styles.budget}>Budget : ₹ {query.budget}</Text>
                  <Text style={styles.phone}>
                    Contact no. : {query.mobile.toString()}
                  </Text>
                  <Text style={styles.phone}>Locality : {query.locality}</Text>
                  <Text style={styles.phone}>
                    CreatedAt : {query.createdAt.substring(0, 10)}
                  </Text>
                  <View style={{ borderWidth: 0.5, opacity: 0.4 }}></View>
                  <Text
                    style={{ fontSize: 17, fontFamily: "Poppins_400Regular" }}
                  >
                    Service Name :- {query.serviceName}
                  </Text>
                
                  <View style={{flexDirection:"row",gap:10}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "black",
                      width: 120,
                      padding: 7,
                      borderRadius: 8,
                      flexDirection: "row",
                      gap: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                    onPress={() => Linking.openURL(`tel:${query.mobile}`)}
                  >
                    <FontAwesome name="phone" size={24} color="white" />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      Call now
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "green",
                      width: 120,
                      padding: 7,
                      borderRadius: 8,
                      flexDirection: "row",
                      gap: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                    onPress={() => Linking.openURL(`https://wa.me/${query.mobile}`)}
                  >
                    <FontAwesome name="whatsapp" size={24} color="white" />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      Whatsapp
                    </Text>
                  </TouchableOpacity>
                  </View>
                </View>
              ))}
          </View>
          {myQueryServices.length == 0 && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 20, fontFamily: "Poppins_400Regular" }}>
                No Service Query found
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default MyContact;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
    gap: 15,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    marginTop: 0,
  },
  btnText: {
    fontSize: 18,
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

const Styles = StyleSheet.create({
  container: {
    width: "95%",
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
  avatarContainer: {
    width: "40%",
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
    height: 190,
    padding: 10,
  },
});
