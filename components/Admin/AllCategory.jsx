import { View, StyleSheet, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getAllCategories } from "../../redux/actions/serviceAction";
import Loader from "../Loader";
import { DataTable } from "react-native-paper";

const AllCategory = ({ navigation }) => {
    const dispatch = useDispatch();
    const { loading, categories,isCategoryDeleted,isCategoryUpdated } = useSelector((state) => state.services);
    
    useEffect(() => {
        dispatch(getAllCategories());
    }, [isCategoryUpdated,isCategoryDeleted]);

    return loading ? (
        <Loader />
    ) : (
        <ScrollView>
            <View style={{ marginTop: 50 }}>
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
                                        <Text style={styles.text}>{category && category.price}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{ width: 20 }} onPress={() => navigation.navigate("updatecategory", { id: category._id })}>
                                        <Text style={styles.text}>Edit</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{ width: 20 }} onPress={() => dispatch(deleteCategory(category._id))}>
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
