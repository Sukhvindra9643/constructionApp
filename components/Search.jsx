import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Searchbar } from "react-native-paper";
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <View style={[Styles.searchContainer,Styles.shadowProp]}>
      <Icon name="search-outline" size={27} style={Styles.Icon}/>
      <TextInput
        style={[Styles.input]}
        placeholder="Search for all services"
        value={searchQuery}
        onChangeText={onChangeSearch}
      />
    </View>
    // <Searchbar
    // style={[Styles.searchContainer,Styles.shadowProp]}
    //   placeholder="Search"
    //   onChangeText={onChangeSearch}
    //   value={searchQuery}
    // />
  );
};

export default Search;

const Styles = new StyleSheet.create({
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
  input: {
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
