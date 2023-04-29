import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";

const SellerCard = ({ seller,item }) => {
  const [rate, setRate] = useState(4);

  return (
    <View style={Styles.container}>
      <View style={Styles.avatarContainer}>
        <Image style={Styles.img} source={{ uri: seller.avatar.url }} />
      </View>
      <View style={Styles.content}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{seller.name}</Text>
        <View style={{alignItems:"flex-start",paddingVertical:5}}>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={15}
            startingValue={rate}
            readonly
          />
        </View>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          ₹{item.price}
        </Text>
        <Text>
          Classic
        </Text>
      </View>
    </View>
  );
};

export default SellerCard;

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
    paddingLeft:10
  },
  avatarContainer: {
    width: "40%",
    height: 150,
    borderBottomColor: "black",
    padding: 10,
    marginLeft:10
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
