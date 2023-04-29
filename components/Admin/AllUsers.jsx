import { View, StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import Loader from "../Loader";
import { DataTable } from "react-native-paper";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { deleteUser } from "../../redux/actions/userAction";
import { useDispatch } from "react-redux";
const AllUsers = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const dispatch = useDispatch();

  const getAllUsers = async () => {
    const serverUrl = "http://192.168.100.66:4000/api/v1";

    const { data } = await axios.get(`${serverUrl}/admin/users`);
    setUsers(data.users);
    setLoading(false);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <ScrollView>
      <View style={{ marginTop: 50 }}>
        <ScrollView horizontal>
          <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title style={{ width: 170, textAlign: "center" }}>
                <Text style={styles.text}>Id</Text>
              </DataTable.Title>
              <DataTable.Title style={{ width: 180, marginLeft: 100 }}>
                <Text style={styles.text}>Name</Text>
              </DataTable.Title>
              <DataTable.Title style={{ width: 170, marginLeft: 90 }}>
                <Text style={styles.text}>Email</Text>
              </DataTable.Title>
              <DataTable.Title style={{ marginLeft: 90, textAlign: "center" }}>
                <Text style={styles.text}>Delete</Text>
              </DataTable.Title>
            </DataTable.Header>

            {users &&
              users.map((u, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={{ width: 250 }}>
                    <Text style={[styles.text]}>{u._id}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ width: 200 }}>
                    <Text style={styles.text}>{u.name}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ width: 350 }}>
                    <Text style={styles.text}>{u.email}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell onPress={() => dispatch(deleteUser(u._id))}>
                    <Text style={styles.text}>
                      Delete
                    </Text>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </ScrollView>
      </View>
    </ScrollView>

  );
};

export default AllUsers;

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  tableHeader: {
    backgroundColor: "#DCDCDC",
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },
});
