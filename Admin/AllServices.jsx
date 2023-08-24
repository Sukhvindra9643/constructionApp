import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import Loader from "../components/Loader";
import { DataTable } from "react-native-paper";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import axios from "axios";


const AllServices = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [services, setServices] = React.useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllServices();
  }, []);

  const getAllServices = () => {
    setLoading(true);
    const serverUrl = "http://64.227.172.50:5000/api/v1";

    axios
      .get(`${serverUrl}/getAllServices`)
      .then((res) => {
        if (res.data.success) {
          setServices(res.data.services);
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
    setLoading(false);
    setRefreshing(false);
  };

  const deleteService = (id) => {
    setLoading(true);
    const serverUrl = "http://64.227.172.50:5000/api/v1";
    axios
      .delete(`${serverUrl}/admin/service/${id}`)
      .then((res) => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          message: "Service Deleted Successfully",
          duration: 2000,
        });
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          message: "Something went wrong",
          duration: 2000,
        });
        setLoading(false);
        setRefreshing(false);
      });
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    getAllServices();
  }, []);

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ marginTop: 0 }}>
        <ScrollView horizontal>
          <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title style={{ width: 310 }}>
                <Text style={styles.text}>Id</Text>
              </DataTable.Title>
              <DataTable.Title style={{ width: 310 }}>
                <Text style={styles.text}>Name</Text>
              </DataTable.Title>
              <DataTable.Title style={{ width: 85 }}>
                <Text style={styles.text}>Edit</Text>
              </DataTable.Title>
              <DataTable.Title style={{ width: 100 }}>
                <Text style={styles.text}>Delete</Text>
              </DataTable.Title>
            </DataTable.Header>

            {services &&
              services.map((service) => (
                <DataTable.Row key={service._id}>
                  <DataTable.Cell style={{ width: 250 }}>
                    <Text style={styles.text}>{service._id}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ width: 250 }}>
                    <Text style={styles.text}>{service.name}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{ width: 20 }}
                    onPress={() =>
                      navigation.navigate("updateservice", { service: service })
                    }
                  >
                    <Text style={styles.text}>Edit</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{ width: 20 }}
                    onPress={() => deleteService(service._id)}
                  >
                    <Text style={styles.text}>Delete</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default AllServices;

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
