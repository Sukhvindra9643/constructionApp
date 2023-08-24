import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SellerCard from "../components/cards/SellerCard";
import Loader from "../components/Loader";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";
import { Rating } from "react-native-ratings";


const data = [
  { label: "Ratings (Low to High)", value: "Ratings (Low to High)" },
  { label: "Ratings (High to Low)", value: "Ratings (High to Low)" },
];
const SellerDetails = ({ navigation, route }) => {
  const [sellers, setSellers] = React.useState([]);
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const item = route.params.item;

  const getAllSellers = async () => {
    const serverUrl = "http://64.227.172.50:5000/api/v1";

    const { data } = await axios.get(
      `${serverUrl}/allsellers?shopInfo=${item.name.toLowerCase()}&sort=-1`
    );
    setSellers(data.sellers);
    setLoading(false);
  };

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
  const handleFilter = async () => {
    setShowFilter(false);
    setLoading(true);
    if (value === "Ratings (Low to High)") {
      const serverUrl = "http://64.227.172.50:5000/api/v1";

      const { data } = await axios.get(
        `${serverUrl}/allsellers?shopInfo=${item.name.toLowerCase()}&sort=1`
      );
      setSellers(data.sellers);
    }
    if (value === "Ratings (High to Low)") {
      const serverUrl = "http://64.227.172.50:5000/api/v1";

      const { data } = await axios.get(
        `${serverUrl}/allsellers?shopInfo=${item.name.toLowerCase()}&sort=-1`
      );
      setSellers(data.sellers);
    }
    setLoading(false);
  };

  const getUserDetails = () => {
    let apiUrl = "http://64.227.172.50:5000/api/v1/me";
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    }).then(async (response) => {
      let data = await response.json();
      if (data.success) {
        setUser(data.user);
      }
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
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Our Top Service Provider ({item.name})
          </Text>
        </View>
        <TouchableOpacity onPress={() => setShowFilter(!showFilter)}>
          <AntDesign name="filter" size={35} color="black" />
        </TouchableOpacity>
      </View>
      {showFilter && (
        <View
          style={{
            position: "absolute",
            backgroundColor: "white",
            zIndex: 99,
            top: "30%",
            left: "2.5%",
            width: "95%",
            height: "214%",
          }}
        >
          <View>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={value}
              // mode="modal"
              onChange={(item) => {
                setValue(item.value);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="Safety"
                  size={20}
                />
              )}
              renderItem={renderItem}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "lightblue",
                paddingHorizontal: 10,
                paddingVertical: 10,
                width: "70%",
                borderRadius: 10,
              }}
              onPress={() => handleFilter()}
            >
              <Text
                style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}
              >
                Apply Filter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <ScrollView style={{ height: "100%" }}>
        <View>
          <View>
            {sellers.length > 0 ? (
              sellers.map((seller, index) =>
                item.category === "Service" ? (
                  <View style={{ alignItems: "center" }} key={seller._id}>
                    <SellerCard
                      seller={seller}
                      item={item}
                      navigation={navigation}
                      user={user}
                    />
                  </View>
                ) : (
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
                        source={{ uri: seller.avatar.url }}
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
                      <Text style={{ fontSize: 15 }}>
                        {seller.mobile.slice(0, 5)}XXXXX
                      </Text>
                      <View style={{ alignItems: "flex-start", marginTop: 5 }}>
                        <Rating
                          type="star"
                          ratingCount={5}
                          imageSize={15}
                          startingValue={
                            seller.ratings !== ""
                              ? seller.ratings.totalratings /
                                seller.ratings.noofuser
                              : 2
                          }
                          readonly
                        />
                      </View>
                    </View>
                  </View>
                )
              )
            ) : (
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
                  No Service Provider Found
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      {sellers.length > 0 && user.role === "user" && item.category !== "Service" && (
        <View style={{ position: "absolute", bottom: 80, left: "18%" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "lightblue",
              paddingHorizontal: 10,
              paddingVertical: 10,
              width: 250,
              borderRadius: 10,
            }}
            onPress={() =>
              navigation.navigate("createservicequery", { item: item })
            }
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Create Service Query
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SellerDetails;
const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
