import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import Icon from "react-native-vector-icons/FontAwesome";

const MostCard = ({ item, getItem }) => {
  const [rate, setRate] = useState(4);
  return (
    <View
      style={{
        alignItems: "flex-start",
        width: 120,
        marginRight: 0,
        marginBottom: 100,
        borderWidth: 0.5,
        padding: 5,
      }}
      onPress={() => getItem(item)}
    >
      <View style={Styles.imgContainer}>
        <TouchableHighlight onPress={() => getItem(item)}>
          <Image
            style={Styles.loginImg}
            source={{
              uri:
                item.images[0].url[0] !== ""
                  ? item.images[0].url[0]
                  : "https://m.media-amazon.com/images/I/31qu4ixHZ3L._SY355_.jpg",
            }}
          />
        </TouchableHighlight>
      </View>
      <View style={{ paddingLeft: 5, alignItems: "flex-start" }}>
        <Text style={Styles.text} onPress={() => getItem(item)}>
          {item.name}
        </Text>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={15}
          startingValue={rate}
          readonly
        />
        <View
          style={{ flexDirection: "row", gap: 5, alignItems: "flex-start" }}
        >
          <Text style={Styles.price}>
            <Icon name="rupee" size={13} />
            {item.price}
          </Text>

          <Text
            style={[
              Styles.price,
              {
                textDecorationLine: "line-through",
                textDecorationStyle: "solid",
              },
            ]}
          >
            <Icon name="rupee" size={13} />
            {Math.round(item.price * 1.1)}
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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  loginImg: {
    width: 110,
    height: 120,
    borderRadius: 5,
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
