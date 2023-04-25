import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/AntDesign";
import Icon4 from "react-native-vector-icons/MaterialCommunityIcons";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import {logout} from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "react-native-paper";
import Loader from "../components/Loader";

const Profile = ({ navigation}) => {
  const dispatch = useDispatch();
  const { user,loading } = useSelector((state) => state.auth);

  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate(), "YYYY/MM/DD")
  );
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(startDate);

  const handleOnPress = () => {
    setOpen(!open);
  };
  const handleChange = (propDate) => {
    setDate(propDate);
  };
  const logoutHandler = () => {
    dispatch(logout());
    navigation.navigate("login")
  };

  {return loading ? (<Loader/>):(
    <View style={Styles.container}>
      <View style={Styles.round}></View>
      <View style={{ width: 395, height: 130, top: 130, position: "absolute" }}>
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 150,
            backgroundColor: "#fff",
            left: "35%",
          }}
        >
            <Avatar.Image
              size={120}
              source={{
                uri: (user.avatar.url !== "none") ? user.avatar.url : "https://res.cloudinary.com/dk0o7tdks/image/upload/v1681134668/images/user_cl1ttq.jpg",
              }}
              style={{ backgroundColor: "#900", zIndex: 99 }}
            />
        </View>
      </View>

      <View style={Styles.profileContainer}>
        <View
          style={{
            padding: 7,
            width: 350,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Icon2 name="user" size={40} style={Styles.icon2} />
          <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
            {user.name}
          </Text>
        </View>
        <View
          style={{
            width: 350,
            borderBottomWidth: 1,
          }}
        />
        <View
          style={{
            padding: 7,
            width: 350,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Icon3 name="mail" size={40} style={Styles.icon2} />
          <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
            {user.email}
          </Text>
        </View>
        <View
          style={{
            width: 350,
            borderBottomWidth: 1,
          }}
        />
        <TouchableOpacity
          onPress={handleOnPress}
          style={{
            padding: 7,
            flexDirection: "row",
            alignItems: "center",
            width: 350,
            gap: 12,
          }}
        >
          <Icon3 name="calendar" size={40} style={Styles.icon2} />
          <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
            {date}
          </Text>
          <TouchableOpacity
            onPress={handleOnPress}
          >
            <Icon3 name="calendar" size={35} style={{marginLeft:140,color: "#000",opacity: 0.6,}} />
          </TouchableOpacity>
        </TouchableOpacity>
        <View
          style={{
            width: 350,
            borderBottomWidth: 1,
          }}
        />
        <Modal animationType="slide" transparent={true} visible={open}>
          <View style={Styles.centeredView}>
            <View style={Styles.modalView}>
              <DatePicker
                mode="calendar"
                selected={date}
                minimumDate={startDate}
                onDateChange={handleChange}
              />
              <TouchableOpacity onPress={handleOnPress}>
                <Text style={{fontFamily:"Poppins_400Regular",fontSize:18}}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View
          style={{
            padding: 7,
            width: 350,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Icon3 name="contacts" size={40} style={Styles.icon2} />
          <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
            {user.mobile !== 'XXXXXXXXXX'? user.mobile : "Please Update your mobile no."}
          </Text>
        </View>
        <View
          style={{
            width: 350,
            borderBottomWidth: 1,
          }}
        />
        <View
          style={{
            padding: 7,
            width: 345,
            flexDirection: "row",
            gap: 5,
            paddingLeft: 15,
            alignItems: "center",
          }}
        >
          <Icon name="map-marker" size={40} style={Styles.icon2} />
          <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
            {user.address ? user.address : "Please Update your address"}
          </Text>
        </View>
        <View
          style={{
            width: 350,
            borderBottomWidth: 1,
          }}
        />
        <View
          style={{
            padding: 7,
            width: 350,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Icon3 name="key" size={40} style={Styles.icon2} />
          <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
            Change password
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("updatepassword")}
          >
            <Icon2 name="edit" size={35} style={Styles.icon3} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: 350,
            borderBottomWidth: 1,
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#49D9C8",
            flexDirection: "row",
            gap: 10,
            marginTop: 20,
            borderRadius: 10,
            padding: 10,
          }}
          onPress={() => navigation.navigate("editprofile")}
        >
          <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 20 }}>
            Edit Profile
          </Text>
          <Icon2 name="edit" size={30} style={{ marginLeft: 0 }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#49D9C8",
            flexDirection: "row",
            gap: 10,
            marginTop: 20,
            borderRadius: 10,
            padding: 5,
            width: 350,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={logoutHandler}
        >
          <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 24 }}>
            Logout
          </Text>
          <Icon4 name="logout" size={30} style={{ marginLeft: 0 }} />
        </TouchableOpacity>
      </View>
    </View>
  )};
};
export default Profile;
const Styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  round: {
    width: 392,
    height: 400,
    borderRadius: 200,
    // backgroundColor: "#CC3FFD",
    backgroundColor: "#49D9C8",
    position: "absolute",
    top: -200,
    opacity: 0.6,
  },
  datePickerStyle: {
    width: 230,
  },
  icon: {
    color: "gray",
    opacity: 0.5,
    top: 5,
    left: 24,
  },
  icon2: {
    color: "#49D9C8",
    opacity: 0.8,
    width: 40,
  },
  icon3: {
    color: "#000",
    opacity: 0.5,
    width: 40,
    marginLeft: 90,
  },
  profileContainer: {
    height: "auto",
    width: 390,
    position: "absolute",
    top: 250,
    padding: 10,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
