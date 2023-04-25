import { View, StyleSheet, Text,ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellerServices,deleteSellerService } from "../../redux/actions/serviceAction";
import Loader from "../Loader";
import { DataTable } from "react-native-paper";

const SellerAllServices = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, services, error,isDeleted,message} = useSelector((state) => state.services);

  useEffect(() => {
    if (error) {
      alert(error);
    }
    if(isDeleted){
      alert(message);
      navigation.navigate("sellerallservices");
    }
    dispatch(getAllSellerServices());
  }, [error,isDeleted,message]);

  return loading ? (
    <Loader />
  ) : (
    <View style={{ marginTop: 50 }}>
       <ScrollView horizontal>
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={{width: 310}}>
            <Text style={styles.text}>Id</Text>
          </DataTable.Title>
          <DataTable.Title style={{width: 310}}>
            <Text style={styles.text}>Name</Text>
          </DataTable.Title>
          <DataTable.Title style={{width: 170}}>
            <Text style={styles.text}>Price</Text>
          </DataTable.Title>
          <DataTable.Title style={{ width: 85}}>
            <Text style={styles.text}>Edit</Text>
          </DataTable.Title>
          <DataTable.Title style={{width: 100}}>
            <Text style={styles.text}>Delete</Text>
          </DataTable.Title>
        </DataTable.Header>

        {services &&
          services.map((service) => (
            <DataTable.Row key={service._id}>
              <DataTable.Cell style={{ width: 250 }}>
                <Text style={styles.text}>{service._id}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ width: 250}}>
                <Text style={styles.text}>{service.name}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ width: 100}}>
                <Text style={styles.text}>{service.price}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ width: 20}} onPress={()=>navigation.navigate("sellerupdateservice", {id: service._id})}>
                <Text style={styles.text}>Edit</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ width: 20 }} onPress={()=> dispatch(deleteSellerService(service._id))}>
                <Text style={styles.text}>Delete</Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
      </DataTable>
      </ScrollView>
    </View>
  );
};

export default SellerAllServices;

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  tableHeader: {
    backgroundColor: "#DCDCDC",
    paddingRight: 0,
  },
  text: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },
});
