import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import React from "react";

const Cards = ({ service, getItem }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <View style={Styles.cardContainer}>
        <TouchableHighlight onPress={() => getItem(service)}>
          <Image
            style={Styles.loginImg}
            source={{ uri: service.url !== "" ? service.url : "https://m.media-amazon.com/images/I/31qu4ixHZ3L._SY355_.jpg" }}
          />
        </TouchableHighlight>
      </View>
      <View style={{width:100,alignItems:"center"}}>
        <Text style={Styles.text} onPress={() => getItem(service)}>
          {service.name}
        </Text>
      </View>

    </View>
  );
};

export default Cards;

const Styles = new StyleSheet.create({
  cardContainer: {
    width: 100,
    height: 70,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  loginImg: {
    width: 100,
    height: 70,
  },
  text: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
});
