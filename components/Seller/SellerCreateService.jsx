import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import SelectMultiple from 'react-native-select-multiple'
import Loader from "../Loader"

const SellerCreateService = ({ navigation }) => {
  const dispatch = useDispatch(); 

  const [loading, setLoading] = useState(true)
  const [selectedData, setSelectedData] = useState([]);
  const [businessInfo, setBusinessInfo] = useState([]);

  const getUseretails = () => {
    let apiUrl = "http://192.168.100.66:4000/api/v1/me"
    fetch(apiUrl, {
        headers: {
            "content-type": "application/json",
        },
        method: "GET",
    })
        .then(async (response) => {
            let data = await response.json();
            if(data){
              setSelectedData(data.user.shopInfo)
              setLoading(false)
            } 
        })
        .catch((err) => {
            console.log(err);
        });
}
  const addHandler = ()=>{
    if(selectedData.length < 1){
      alert("Please select minimum one option");
      return
    }
    let apiUrl = "http://192.168.100.66:4000/api/v1/addservices"
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(selectedData)
    })
      .then(async (response) => {
        let data = await response.json();
        if (data) {
          setLoading(false);
          setSelectedData([]);
          navigation.navigate("sellerdashboard")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const getAllCategories = () => {
    let apiUrl = "http://192.168.100.66:4000/api/v1/getAllCategories"
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    })
      .then(async (response) => {
        let data = await response.json();
        if (data) {
          // console.log(data)
          setBusinessInfo(data.categories.map((c) => c.name.toLowerCase()))
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  onChange = (selectedData) => {
    // selectedFruits is array of { label, value }
    setSelectedData([...selectedData])
  }

  const renderLabels = (label, style) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* <Image style={{ width: 32, height: 32 }} source={{ uri: 'https://dummyimage.com/100x100/52c25a/fff&text=S' }} /> */}
        <View style={{ marginLeft: 10 }}>
          <Text style={style}>{label}</Text>
        </View>
      </View>
    )
  }
  useEffect(() => {
    getAllCategories();
    getUseretails();
  }, [dispatch]);

  return loading ? (<Loader />) : (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent:"center",
        alignItems:"center"
      }}
    >

      <View style={{ marginVertical: 5, overflow: "scroll", height: "70%" }}>
        <Text style={Styles.heading}>Select Materials and Services</Text>
        <SelectMultiple
          items={businessInfo}
          renderLabel={renderLabels}
          selectedItems={selectedData}
          onSelectionsChange={onChange} />

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
    marginTop:10,
    width:250
  },
  btnText: {
    fontSize: 26,
    color: "white",
    lineHeight: 60,
    fontFamily: "Poppins_600SemiBold",
  },
  input: {
    fontSize: 18,
  }
});
