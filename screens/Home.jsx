import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  RefreshControl,
} from "react-native";
import React, {useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Cards from "../components/Cards";
import QueryServiceCard from "../components/cards/QueryServiceCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllServices,
  getAllCategories,
} from "../redux/actions/serviceAction";
import Loader from "../components/Loader";
import Icon from "react-native-vector-icons/Ionicons";
import SearchCard from "../components/cards/SearchCard";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, categories,services } = useSelector((state) => state.services);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getAllServices());
    dispatch(getAllCategories());
    setFilteredDataSource(categories);
    setMasterDataSource(categories);
    setRefreshing(false)
  }, []);

  useEffect(() => {
    dispatch(getAllServices());
    dispatch(getAllCategories());
    setFilteredDataSource(categories);
    setMasterDataSource(categories);
  }, [dispatch]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData =
        masterDataSource &&
        masterDataSource.filter(function (item) {
          const itemData = item.name
            ? item.name.toUpperCase()
            : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <View style={Styles.itemStyle}>
        <SearchCard service={item} getItem={getItem} />
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };
  const getItem = (item) => {
    // Function for click on an item
    setSearch("");
    if (item.category === "Service") {
      navigation.navigate("sellerDetails", { item: item });
    } else {
      navigation.navigate("sellerList", { item: item });
    }
  };

  // const renderItem = ({ item }) => <QueryServiceCard item={item} />;

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ paddingVertical: 5 }}>
        <View style={[Styles.searchContainer, Styles.shadowProp]}>
          <Icon name="search-outline" size={27} style={Styles.Icon} />
          <TextInput
            style={[Styles.input2]}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          />
        </View>
      </View>

      {search === "" ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={Styles.homeContainer}>
            <View
              style={{ backgroundColor: "white", width: "100%", padding: 10 }}
            >
              <Text style={[{ marginLeft: 10 }, Styles.heading]}>
                Materials
              </Text>
              <View style={Styles.cardContainer}>
                {categories &&
                  categories.map(
                    (c, index) =>
                      c.category === "Material" && (
                        <Cards service={c} key={index} getItem={getItem} />
                      )
                  )}
              </View>
            </View>
            <View style={[Styles.cardContainer, { marginTop: 10 }]}>
              <View
                style={{
                  width: "100%",
                  paddingHorizontal: 10,
                  marginVertical: 15,
                  backgroundColor: "white",
                }}
              >
                <Text style={Styles.heading}>Services</Text>
              </View>
              {categories &&
                categories.map(
                  (c, index) =>
                    c.category === "Service" && (
                      <Cards service={c} key={index} getItem={getItem} />
                    )
                )}
            </View>
            <View
              style={[
                Styles.cardContainer2,
                { marginTop: 10, display: "flex", gap: 5 },
              ]}
            >
              <View
                style={{
                  width: "100%",
                  paddingHorizontal: 10,
                  marginVertical: 15,
                  backgroundColor: "white",
                }}
              >
                <Text style={Styles.heading}>Other Services</Text>
              </View>
              {services && services.map((s, index) => <QueryServiceCard item={s} key={index} />)}
            </View>
          </View>
        </ScrollView>
      ) : (
        <FlatList
          // horizontal
          data={filteredDataSource}
          keyExtractor={(index) => index.toString()+ Math.random().toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;

const Styles = new StyleSheet.create({
  homeContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    backgroundColor: "#eeeeee",
  },
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
    backgroundColor: "white",
    padding: 10,
  },
  cardContainer2: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
    backgroundColor: "white",
    padding: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 22,
    marginVertical: 3,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    width: "90%",
  },
  heading: {
    textAlign: "left",
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
  },
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    width: "100%",
    padding: 20,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF",
  },
  searchContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  Icon: {
    position: "absolute",
    top: 12,
    left: 40,
    zIndex: 1,
  },
  input2: {
    position: "relative",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginVertical: 3,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    width: "86%",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // elevation: 8,
  },
});
