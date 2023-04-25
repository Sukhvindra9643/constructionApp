import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Rating} from "react-native-ratings";
import Icon from "react-native-vector-icons/FontAwesome";
const MostCard = ({item}) => {
  const [rate, setRate] = useState(4);
  return (
    <View
      style={{
        alignItems: "flex-start",
        width: 120,
        marginRight: 0,
        marginBottom:100
      }}
    >
      <View style={Styles.imgContainer}>
        <Image
          style={Styles.loginImg}
          source={{uri:item.images[0].url[0] !== ""?item.images[0].url[0]:"https://m.media-amazon.com/images/I/31qu4ixHZ3L._SY355_.jpg"}}
        />
      </View>
      <View style={{paddingLeft:5,alignItems:"flex-start"}}>
        <Text style={Styles.text}>{item.name}</Text>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={15}
          startingValue={rate}
          readonly
        />
        <View style={{ flexDirection: "row",gap:5, alignItems: "flex-start"}}>
          <Text style={Styles.price}>
            <Icon name="rupee" size={13} />
            {item.price}
          </Text>

          <Text
            style={[Styles.price,{textDecorationLine: "line-through",textDecorationStyle: "solid"}]}
          >
            <Icon name="rupee" size={13} />
            {Math.round(item.price*1.10)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MostCard;
const Styles = new StyleSheet.create({
  imgContainer: {
    width: 110,
    height: 120,
    backgroundColor: "#eeeeee",
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  loginImg: {
    width: 110,
    height: 120,
    borderRadius: 15,
  },
  text: {
    textAlign: "left",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  price: {
    paddingLeft: 0,
    textAlign: "left",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
});
