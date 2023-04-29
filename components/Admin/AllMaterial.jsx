import { View, StyleSheet, Text,TouchableOpacity } from "react-native";
import React, { useEffect,useState } from "react";
import Loader from "../Loader";
import SelectMultiple from 'react-native-select-multiple'
import Icon from "react-native-vector-icons/AntDesign"

const AllMaterial = ({ navigation }) => {
  const [selectedData, setSelectedData] = useState([]);
  const [businessInfo,setBusinessInfo] = useState([]);
  const [loading,setLoading] = useState(true);

  const getAllCategories = () => {
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
                console.log(data.user.shopInfo)
                setBusinessInfo(data.user.shopInfo)
                setSelectedData(data.user.shopInfo)
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
    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
      {/* <Image style={{ width: 32, height: 32 }} source={{ uri: 'https://dummyimage.com/100x100/52c25a/fff&text=S' }} /> */}
      <View style={{ marginLeft: 10 }}>
        <Text style={style}>{label}</Text>
      </View>
    </View>
  )
}
useEffect(() => {
  getAllCategories();
}, []);
  return loading ? (
    <Loader />
  ) : (
      <View style={{ marginTop: 50 }}>
        <TouchableOpacity onPress={()=> navigation.navigate('sellercreateservice')} style={styles.btn}>
          <Icon name="pluscircleo" size={35} color={"#fff"}/>
          <Text style={styles.btnText}>Add Material and Services</Text>
        </TouchableOpacity>
      <View style={{ marginVertical: 5,overflow:"scroll",height:"100%"}}>
            <Text style={{fontSize:16,marginBottom:10,marginLeft:20}}>Materials and Services List</Text>
            <SelectMultiple
              items={businessInfo}
              renderLabel={renderLabels}
              selectedItems={selectedData}
              onSelectionsChange={onChange} />

          </View>
      </View>
  );
};

export default AllMaterial;

const styles = StyleSheet.create({
 btn:{
  marginLeft:20,
  borderWidth:1,
  padding:10,
  width:320,
  backgroundColor:"#1183ca",
  flexDirection:"row",
  gap:10,
  alignItems:"center",
  borderRadius:10
 },
 btnText:{
  fontSize:18,
  color:"#fff",
  fontFamily:"Poppins_500Medium"
 }
});
