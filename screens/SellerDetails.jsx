import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from 'react'
import axios from 'axios'
import SellerCard from "../components/cards/SellerCard";
import Loader from "../components/Loader";
import { SafeAreaView } from "react-native-safe-area-context";
const SellerDetails = ({ route }) => {
  const [sellers, setSellers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const item = route.params.item;

  const getAllSellers = async () => {
    const serverUrl = "http://192.168.100.66:4000/api/v1";

    const { data } = await axios.get(`${serverUrl}/allsellers?shopInfo=${item.name.toLowerCase()}`);
    setSellers(data.sellers);
    setLoading(false);
  };
  useEffect(() => {
    getAllSellers();
  }, []);
  return loading ? (<Loader />) : (
    <SafeAreaView>
      <View>
        <View style={Styles.bannerContainer}>
          <Image style={Styles.banner} source={require("../assets/banner/servicesbanner.jpg")} />
        </View>
        <View style={{ alignItems: "center" }}>
          {sellers && sellers.map((seller) => (
            <SellerCard key={seller._id} seller={seller} item={item} />
          ))}
        </View>
        <Text>{route.params.id}</Text>
      </View>
    </SafeAreaView>

  );
};

export default SellerDetails;

const Styles = StyleSheet.create({
  bannerContainer: {
    width: "100%",
    height: 200,
  },
  banner: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
});