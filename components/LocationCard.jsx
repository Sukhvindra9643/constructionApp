import { View, Text,StyleSheet} from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/SimpleLineIcons"
const LocationCard = ({user}) => {
    const {address} = user && user;
    let address1 = address.split(" ");


  return (
    <View style={Styles.locationContainer}>
        <Text style={Styles.heading}>{address1[0]+" "+address1[1]}</Text>
        <Icon name='arrow-down' size={17} style={Styles.Icon}/>
        <Text style={Styles.smheading}>{address}</Text>
    </View>
  )
}

export default LocationCard

const Styles = new StyleSheet.create({
    locationContainer:{
        width:"100%",
        backgroundColor:"white",
        paddingVertical:10,
        paddingHorizontal:30
    },
    heading:{
        fontSize:16,
        fontFamily:"Poppins_500Medium",
        height:22
    },
    smheading:{
        position:"relative",
        fontSize:13,
        fontFamily:"Poppins_400Regular",
    },
    Icon:{
        position:"absolute",
        top:13,
        left:200
    }
})