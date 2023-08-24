import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const QueryServiceCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={{ alignItems: "center",borderWidth:1,borderColor:"gray",borderRadius:5 }}>
      <View style={Styles.cardContainer}>
        <TouchableHighlight
          onPress={() => navigation.navigate("sellerDetails", { item: item })}
        >
          <Image
            style={Styles.loginImg}
            source={{
              uri:
                item.url[0] !== ""
                  ? item.url[0]
                  : "https://m.media-amazon.com/images/I/31qu4ixHZ3L._SY355_.jpg",
            }}
          />
        </TouchableHighlight>
      </View>
      <View
        style={{ width: 100, alignItems: "center" }}
        onPress={() => navigation.navigate("sellerDetails", { item: item })}
      >
        <Text style={Styles.text}>{item.name}</Text>
      </View>
    </View>
  );
};

export default QueryServiceCard;

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
