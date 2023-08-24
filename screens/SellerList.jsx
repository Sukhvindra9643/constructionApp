import { View, Text, Image, TouchableOpacity } from "react-native";
import React, {useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { Rating } from "react-native-ratings";
import Loader from "../components/Loader";
import axios from "axios";

const SellerList = ({ navigation, route }) => {
  const [sellers, setSellers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({});

  const getAllSellers = async () => {
    const serverUrl = "http://64.227.172.50:5000/api/v1";
    const { data } = await axios.get(
      `${serverUrl}/allsellers?shopInfo=${route.params.item.name.toLowerCase()}&sort=-1`
    );
    setSellers(data.sellers);
    setLoading(false);
  };

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
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllSellers();
    getUserDetails();
  }, []);


  return loading ? (
    <Loader loading={loading} />
  ) : (
    <SafeAreaView>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderBottomWidth: 0.5,
          borderBottomColor: "gray",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Our Top Seller ({route.params.item.name})
        </Text>
      </View>
      <ScrollView
        style={{ height: "83%", marginBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {sellers.length > 0 &&
          sellers.map((seller, index) => (
            <View
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
                marginHorizontal: 10,
                flexDirection: "row",
                gap: 20,
                marginVertical: 5,
              }}
              key={index}
            >
              <View>
                <Image
                  source={{uri : seller.avatar.url}}
                  style={{ width: 80, height: 80, borderRadius: 40 }}
                />
              </View>
              <View>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {seller.name}
                </Text>
                <Text style={{ fontSize: 17, fontWeight: "500" }}>
                  {seller.bname}
                </Text>
                <Text style={{ fontSize: 15 }}>{seller.mobile.slice(0,5)}XXXXX</Text>
                <View style={{ alignItems: "flex-start", marginTop: 5 }}>
                  <Rating
                    type="star"
                    ratingCount={5}
                    imageSize={15}
                    startingValue={seller.ratings !== ""? seller.ratings.totalratings/seller.ratings.noofuser : 2}
                    readonly
                  />
                </View>
              </View>
            </View>
          ))}
        {sellers.length === 0 && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: 700,
            }}
          >
            <Text
              style={{
                fontSize: 24,
              }}
            >
              No Sellers Found
            </Text>
          </View>
        )}
      </ScrollView>
      {sellers.length > 0 && user && user.role === "user" && (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "lightblue",
              paddingHorizontal: 10,
              paddingVertical: 10,
              width: "70%",
              
              borderRadius: 10,
            }}
            onPress={() =>
              navigation.navigate("createQuery", { item: route.params.item })
            }
          >
            <Text
              style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}
            >
              Create Query
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SellerList;
