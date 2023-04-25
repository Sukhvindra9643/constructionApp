import { View, Text,Image,StyleSheet } from "react-native";
import React,{ useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import SellerCard from "../components/cards/SellerCard";
import Loader from "../components/Loader";

const SellerDetails = ({ route }) => {
  const [sellers, setSellers] = React.useState([]);
  const [loading,setLoading] = React.useState(true);

  console.log(sellers)
  const dispatch = useDispatch();
  
  const getAllSellers = async () => {
    const serverUrl = "http://192.168.54.195:4000/api/v1";

    const { data } = await axios.get(`${serverUrl}/admin/allsellers`);
    setSellers(data.sellers);
    setLoading(false);
  };
  useEffect(() => {
    getAllSellers();
  }, []);
  return loading ? (<Loader/>):(
      <View>
        <View style={Styles.bannerContainer}>
          <Image style={Styles.banner} source={require("../assets/banner/servicesbanner.jpg")} />
        </View>
        <View style={{alignItems:"center"}}>
          {sellers && sellers.map((seller) => (
            <SellerCard key={seller._id} seller={seller} />
          ))}
        </View>
        <Text>{route.params.id}</Text>
      </View>

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