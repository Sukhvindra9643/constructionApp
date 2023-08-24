import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/SimpleLineIcons"
import Loader from './Loader';
import { add } from 'react-native-reanimated';
import * as Location from "expo-location";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const LocationCard = () => {
    const [user,setUser]= useState("")
    const [loading,setLoading] = useState(true);
    const [address,setAddress] = useState([]);
    // const [location,setLocation] = useState("");


    let address1 = address && address.split(" ");
    const getUseretails = () => {
        let apiUrl = "http://64.227.172.50:5000/api/v1"
        fetch(apiUrl, {
            headers: {
                "content-type": "application/json",
            },
            method: "GET",
        })
            .then(async (response) => {
                let data = await response.json();
                if(data){
                    setUser(data.user)
                    setLoading(false)
                } 
            })
            .catch((err) => {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: "Error",
                    message: "Something went wrong",
                    duration: 2000,
                  });
            });
    }



    const reverseGeocode = async (location) => {
        let address = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });
        let name = address[0].name === null ? "" : address[0].name;
        let street = address[0].street === null ? "" : address[0].street;
        let district = address[0].district === null ? "" : address[0].district;
        let city = address[0].city === null ? "" : address[0].city;
        let country = address[0].country === null ? "" : address[0].country;
        let postalCode =
            address[0].postalCode === null ? "" : address[0].postalCode;

        let shortAddress = `${name} ${street} ${district} ${city} ${country} (${postalCode})`;
        setAddress(shortAddress);
        getUseretails();
    };

    const getPermission = async () => {
        // let { status } = await Location.requestForegroundPermissionsAsync();
        let { status } = await Location.requestBackgroundPermissionsAsync();
        if (status !== "granted") {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: "Warning",
                textBody: "Please grant to  location",
              });
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        reverseGeocode(location);
    };
   
   
    useEffect(() => {
        getUseretails();
        getPermission();
        // reverseGeocode(location);
    }, [])

    return loading ? (<Loader />) : (
        <View style={Styles.locationContainer}>
            <Text style={Styles.heading}>{address && address1[0] + " " + address1[1]}</Text>
            <Icon name='arrow-down' size={17} style={Styles.Icon} />
            <Text style={Styles.smheading}>{address}</Text>
        </View>
    )
}

export default LocationCard

const Styles = new StyleSheet.create({
    locationContainer: {
        width: "100%",
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    heading: {
        fontSize: 16,
        fontFamily: "Poppins_500Medium",
        height: 22
    },
    smheading: {
        position: "relative",
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
    },
    Icon: {
        position: "absolute",
        top: 13,
        left: 200
    }
})