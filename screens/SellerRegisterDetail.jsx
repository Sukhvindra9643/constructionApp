import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import Icon1 from "react-native-vector-icons/Ionicons";
import Loader from "../components/Loader";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";
import { MultiSelect } from "react-native-element-dropdown";

const SellerRegisterDetail = ({ navigation }) => {
  const [selected, setSelected] = useState([]);
  const [businessInfo, setBusinessInfo] = useState([]);
  const [bName, setBName] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);


  const AddHandler = (e) => {
    e.preventDefault();
    if(!bName){
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Please enter your business name",
      });
      return;
    }
    if (selected.length < 1) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Please select atleast one material or service",
      });
      return;
    } else {
      const myForm = new FormData();
      myForm.append("bname", bName);
      myForm.append("shopInfo", selected);

      setLoading(true);
      axios
        .put("http://64.227.172.50:5000/api/v1/me/updateshopInfo", myForm, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.success) {
            setLoading(false);
            navigation.replace("main", { user: user });
          } else {
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: "Error",
              textBody: "Something went wrong",
            });
            setLoading(false);
          }
        });
    }
  };
  const getAllCategories = () => {
    let apiUrl = "http://64.227.172.50:5000/api/v1/getAllCategories";
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    })
      .then(async (response) => {
        let data = await response.json();
        if (data) {
          let Data = [];
          for (let i = 0; i < data.categories.length; i++) {
            Data.push({
              label: data.categories[i].name.toLowerCase(),
              value: data.categories[i].name.toLowerCase(),
            });
          }
          const res = await axios.get(`http://64.227.172.50:5000/api/v1/getAllServices`);

          for(let i = 0;i < res.data.services.length;i++){
            Data.push({
              label: res.data.services[i].name.toLowerCase(),
              value: res.data.services[i].name.toLowerCase(),
            });
          }
          setBusinessInfo(Data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      </View>
    );
  };
  const getUserDetails = () => {
    let apiUrl = "http://64.227.172.50:5000/api/v1/me";
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    })
      .then(async (response) => {
        let data = await response.json();
        if (data.success) {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getAllCategories();
    getUserDetails();
  }, []);

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <View
      style={{
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            width: "90%",
            alignItems: "center",
            padding: 15,
            shadowColor: "#fff",
            shadowOffset: {
              width: 2,
              height: 2,
            },
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              padding: 5,
              width: 350,
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "gray",
            }}
          >
            <Icon1 name="business-outline" size={30} style={Styles.icon2} />
            <TextInput
              style={Styles.input}
              placeholder="Enter your business name"
              value={bName}
              onChangeText={setBName}
            />
          </View>
          <View
            style={{
              marginVertical: 5,
              alignItems: "center",
              width: 350,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 8,
              padding: 10,
            }}
          >
            <View
              style={{
                width: 340,
              }}
            >
              <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={businessInfo}
                labelField="label"
                valueField="value"
                placeholder="Select Your Materials or Services"
                value={selected}
                search
                searchPlaceholder="Search..."
                onChange={(item) => {
                  setSelected(item);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color="black"
                    name="Safety"
                    size={20}
                  />
                )}
                renderItem={renderItem}
                renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                    <View style={styles.selectedStyle}>
                      <Text style={styles.textSelectedStyle}>{item.label}</Text>
                      <AntDesign color="black" name="delete" size={17} />
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
            <Pressable onPress={AddHandler} style={Styles.buttonContainer}>
              <Text style={Styles.btnText}>Add</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SellerRegisterDetail;

const Styles = StyleSheet.create({
  icon2: {},
  input: {
    width: "100%",
    height: 40,
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 10,
    width: 100,
    borderRadius: 10,
    backgroundColor: "#49D9C8",
  },
  btnText: {
    fontSize: 26,
    color: "white",
    lineHeight: 45,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
});

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});
