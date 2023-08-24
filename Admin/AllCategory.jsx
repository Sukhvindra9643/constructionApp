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
import { useDispatch } from "react-redux";
import { deleteCategory } from "../redux/actions/serviceAction";

const AllCategory = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState([]);

  const dispatch = useDispatch();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllCategories();
  }, []);

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
        setCategories(data.categories);
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        setLoading(false);
        setRefreshing(false);
      });
  };
  useEffect(() => {
    getAllCategories();
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
              <DataTable.Title style={{ width: 170 }}>
                <Text style={styles.text}>Price</Text>
              </DataTable.Title>
              <DataTable.Title style={{ width: 170 }}>
                <Text style={styles.text}>Category</Text>
              </DataTable.Title>
              <DataTable.Title style={{ width: 85 }}>
                <Text style={styles.text}>Edit</Text>
              </DataTable.Title>
              <DataTable.Title style={{ width: 100 }}>
                <Text style={styles.text}>Delete</Text>
              </DataTable.Title>
            </DataTable.Header>

            {categories &&
              categories.map((category) => (
                <DataTable.Row key={category._id}>
                  <DataTable.Cell style={{ width: 250 }}>
                    <Text style={styles.text}>{category._id}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ width: 250 }}>
                    <Text style={styles.text}>{category.name}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>
                    <Text style={styles.text}>
                      {category && category.price}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>
                    <Text style={styles.text}>
                      {category && category.category}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{ width: 20 }}
                    onPress={() =>
                      navigation.navigate("updatecategory", {
                        id: category._id,
                      })
                    }
                  >
                    <Text style={styles.text}>Edit</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{ width: 20 }}
                    onPress={() => dispatch(deleteCategory(category._id))}
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

export default AllCategory;

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
