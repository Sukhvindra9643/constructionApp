import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Icon from "react-native-vector-icons/AntDesign";
import { Checkbox } from "react-native-paper";

const SellerAllServices = ({ navigation }) => {
  const [selectedData, setSelectedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllCategories = () => {
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
          setSelectedData(data.user.shopInfo);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <View style={{ marginTop: 20 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("sellercreateservice")}
        style={styles.btn}
      >
        <Icon name="pluscircleo" size={35} color={"#fff"} />
        <Text style={styles.btnText}>Add Material and Services</Text>
      </TouchableOpacity>

      <ScrollView style={{marginTop:10,height:"87%"}} showsVerticalScrollIndicator={false}>
        {selectedData.length > 0 &&
          selectedData.map((item, index) => (
            <View
              style={{
                marginTop: 5,
                marginBottom:5,
                backgroundColor: "white",
                height: 50,
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
              }}
              key={index}
            >
              <View>
                <Checkbox
                  status={"checked"}

                />
              </View>
              <View>
                <Text>
                  {item}
                </Text>
              </View>
            </View>
          ))}
      </ScrollView>
      
    </View>
  );
};

export default SellerAllServices;

const styles = StyleSheet.create({
  btn: {
    marginLeft: 20,
    borderWidth: 1,
    padding: 10,
    width: 320,
    backgroundColor: "#1183ca",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  btnText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Poppins_500Medium",
  },
});
