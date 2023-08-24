import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
  Modal,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { Rating } from "react-native-ratings";
import axios from "axios";

const MyQueries = ({ route }) => {
  const [myMaterialQueries, setMyMaterialQueries] = useState([]);
  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(
    route.params.info.category || "Materials"
  );
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState("");
  const [id, setId] = useState("");
  const [myQueryServices, setMyQueryService] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMyMaterialQueries();
    getMyServices();
  }, []);

  const getMyMaterialQueries = () => {
    let apiUrl = "http://64.227.172.50:5000/api/v1/myqueries";
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    })
      .then(async (response) => {
        let data = await response.json();
        if (data.success) {
          setMyMaterialQueries(data.myqueries);
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
    let apiUrl = "http://64.227.172.50:5000/api/v1/getmyservicequery";
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
    let apiUrl = "http://64.227.172.50:5000/api/v1/myqueryservices";
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    })
      .then(async (response) => {
        let data = await response.json();
        if (data.success) {
          setMyQueryService(data.myqueries);
        }
      })
      .catch((err) => {
        setLoading(false);
        setRefreshing(false);
      });
  };
  const handleRating = async () => {
    const serverUrl = "http://64.227.172.50:5000/api/v1";
    const { data } = await axios.post(`${serverUrl}/rating`, {
      rating,
      id,
    });
    setModalVisible(false);
    getMyServices();
  };
  useEffect(() => {
    getMyMaterialQueries();
    getMyServices();
    getMyQueryServices();
  }, []);
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
            {myMaterialQueries &&
              myMaterialQueries.map((contact, index) => (
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
                </View>
              ))}
          </View>
          {myMaterialQueries.length == 0 && (
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
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        lineHeight: 20,
                      }}
                    >
                      {contact.sellername}
                    </Text>
                    <View
                      style={{
                        alignItems: "flex-start",
                        paddingVertical: 5,
                        lineHeight: 15,
                      }}
                    >
                      <Rating
                        type="star"
                        ratingCount={5}
                        imageSize={15}
                        startingValue={
                          contact.sellerratings.totalratings /
                          contact.sellerratings.noofusers
                        }
                        readonly
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        lineHeight: 15,
                      }}
                    >
                      Visiting price : ₹{contact.price}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "700",
                        lineHeight: 15,
                      }}
                    >
                      Hourly price : ₹{contact.hourlyPrice}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "400",
                        lineHeight: 17,
                      }}
                    >
                      Contact no.: {contact.sellermobile}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "400",
                        lineHeight: 17,
                      }}
                    >
                      Booking Date : {contact.createdAt.substring(0, 10)}
                    </Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "black",
                        width: 120,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 8,
                        marginTop: 5,
                      }}
                      onPress={() => {
                        setId(contact.sellerId);
                        setModalVisible(true);
                      }}
                    >
                      <Text style={{ color: "white" }}>Give Feedback</Text>
                    </TouchableOpacity>
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
                    Contact no. : {query.mobile}
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
                </View>
              ))}
          </View>
          {myQueryServices.length == 0 && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 20, fontFamily: "Poppins_400Regular" }}>
                No Services Query found
              </Text>
            </View>
          )}
        </ScrollView>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                alignItems: "flex-start",
                paddingVertical: 5,
                marginBottom: 20,
              }}
            >
              <Rating
                type="star"
                ratingCount={5}
                imageSize={25}
                startingValue={0}
                onFinishRating={(rating) => setRating(rating)}
              />
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleRating()}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyQueries;

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
  tableHeader: {
    backgroundColor: "#DCDCDC",
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 5,
    elevation: 2,
    width: 80,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginTop: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
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
    height: 170,
  },
  avatarContainer: {
    width: "40%",
    height: 180,
    borderBottomColor: "black",
    padding: 10,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 120,
    height: 140,
    borderRadius: 10,
  },
  content: {
    width: "70%",
    height: 150,
    padding: 10,
  },
});
