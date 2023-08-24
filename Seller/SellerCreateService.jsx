import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import Loader from "../components/Loader";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import AntDesign from "react-native-vector-icons/AntDesign";
import { MultiSelect } from "react-native-element-dropdown";

const SellerCreateService = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [businessInfo, setBusinessInfo] = useState([]);

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
        if (data) {
          setSelected(data.user.shopInfo);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const addHandler = () => {
    if (selected.length < 1) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Please select minimum one option",
      });
      return;
    }
    let apiUrl = "http://64.227.172.50:5000/api/v1/addservices";
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(selected),
    })
      .then(async (response) => {
        let data = await response.json();
        if (data) {
          setLoading(false);
          setSelected([]);
          navigation.navigate("sellerdashboard");
        }
      })
      .catch((err) => {
        setLoading(false);
      });
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
  useEffect(() => {
    getAllCategories();
    getUserDetails();
  }, []);

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ marginVertical: 5, overflow: "scroll", height: "70%" }}>
        <Text style={Styles.heading}>Select Materials and Services</Text>
        <View
          style={{
            width: 350,
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
          placeholder="Select item"
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
      </View>
      <Button
        // disabled = {selectedData.length < 1}
        textColor={"white"}
        labelStyle={{ fontSize: 25 }}
        onPress={addHandler}
        style={Styles.buttonContainer}
      >
        <Text style={Styles.btnText}>Add</Text>
      </Button>
    </View>
  );
};

export default SellerCreateService;

const Styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eeeeee",
  },
  heading: {
    fontSize: 22,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
  sub_heading: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },
  buttonContainer: {
    height: 60,
    backgroundColor: "#49D9C8",
    marginTop: 10,
    width: 250,
  },
  btnText: {
    fontSize: 26,
    color: "white",
    lineHeight: 60,
    fontFamily: "Poppins_600SemiBold",
  },
  input: {
    fontSize: 18,
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
