import { View, StyleSheet, Text, Modal, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { DataTable } from "react-native-paper";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { deleteUser } from "../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { Rating } from "react-native-ratings";

const AllUsers = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState("");
  const [id, setId] = useState("");

  const dispatch = useDispatch();

  const getAllUsers = async () => {
    const serverUrl = "http://64.227.172.50:5000/api/v1";

    const { data } = await axios.get(`${serverUrl}/admin/users`);
    setUsers(data.users);
    setLoading(false);
  };

  const handleRating = async () => {
    const serverUrl = "http://64.227.172.50:5000/api/v1";
    const { data } = await axios.post(`${serverUrl}/rating`, {
      rating,
      id,
    });
    setModalVisible(false);
    getAllUsers();
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <ScrollView>
      <View style={{ marginTop: 0 }}>
        <ScrollView horizontal>
          <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title style={{ width: 170, textAlign: "center" }}>
                <Text style={styles.text}>Id</Text>
              </DataTable.Title>
              <DataTable.Title style={{ width: 180, marginLeft: 100 }}>
                <Text style={styles.text}>Name</Text>
              </DataTable.Title>
              <DataTable.Title style={{ width: 200, marginLeft: 90 }}>
                <Text style={styles.text}>Email</Text>
              </DataTable.Title>
              <DataTable.Title style={{ width: 60, marginLeft: 90 }}>
                <Text style={styles.text}>Edit</Text>
              </DataTable.Title>
              <DataTable.Title style={{ marginLeft: 100, textAlign: "center" }}>
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
                  <DataTable.Cell style={{ width: 300 }}>
                    <Text style={styles.text}>{u.email}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    onPress={() => {
                      setModalVisible(true);
                      setId(u._id);
                    }}
                    style={{ width: 100 }}
                  >
                    <Text style={styles.text}>Edit</Text>
                  </DataTable.Cell>
                  <DataTable.Cell onPress={() => dispatch(deleteUser(u._id))}>
                    <Text style={styles.text}>Delete</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </ScrollView>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                alignItems: "flex-start",
                paddingVertical: 5,
                marginBottom: 20,
              }}
            >
              <Rating
                type="star"
                ratingCount={5}
                imageSize={25}
                startingValue={0}
                onFinishRating={(rating) => setRating(rating)}
              />
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleRating()}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  button: {
    borderRadius: 10,
    padding: 5,
    elevation: 2,
    width: 80,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
