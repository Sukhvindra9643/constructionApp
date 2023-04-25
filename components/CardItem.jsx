import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'

const CardItem = ({service}) => {
  return (
    <View style={{alignItems:"center"}}>
    <View style={Styles.cardContainer}>
      <Image
        style={Styles.loginImg}
        source={{uri:service.url !== ""?service.url:"https://m.media-amazon.com/images/I/31qu4ixHZ3L._SY355_.jpg"}}
      />
    </View>
    <Text style={Styles.text}>{service.name}</Text>
  </View>
  )
}

export default CardItem
const Styles = new StyleSheet.create({
  cardContainer: {
    width: 100,
    height: 70,
    backgroundColor: "#eeeeee",
    opacity: 0.7,
    alignItems:"center",
    justifyContent:"center"
  },
  loginImg: {
    width: 100,
    height: 70,
  },
  text:{
    fontSize:12,
    fontFamily:"Poppins_400Regular"
  }
});