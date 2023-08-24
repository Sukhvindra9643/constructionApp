import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
  } from "react-native";
  import React from "react";
  
  const SearchCard = ({ service, getItem }) => {
    return (
      <View style={{flexDirection:"row",gap:10 }} onPress={() => getItem(service)}>
        <View style={Styles.cardContainer}>
          <TouchableHighlight onPress={() => getItem(service)}>
            <Image
              style={Styles.loginImg}
              source={{ uri: service.url !== "" ? service.url:"https://m.media-amazon.com/images/I/31qu4ixHZ3L._SY355_.jpg" }}
            />
          </TouchableHighlight>
        </View>
        <Text style={Styles.text} onPress={() => getItem(service)}>
          {service.name}
        </Text>
      </View>
    );
  };
  
  export default SearchCard;
  
  const Styles = new StyleSheet.create({
    cardContainer: {
      width: 100,
      height: 70,
      backgroundColor: "#eeeeee",
      opacity: 0.7,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    },
    loginImg: {
      width: 100,
      height: 80,
    },
    text: {
      fontSize: 16,
      fontFamily: "Poppins_400Regular",
    },
  });
  