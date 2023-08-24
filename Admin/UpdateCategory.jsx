import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../redux/actions/serviceAction";
import Loader from "../components/Loader";
import { SelectList } from "react-native-dropdown-select-list";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const categories = [
  {
    key: "Material",
    value: "Material",
  },
  {
    key: "Service",
    value: "Service",
  },
];

const units = [
  {
    key: "kg",
    value: "kg",
  },
  {
    key: "meter",
    value: "meter",
  },
  {
    key: "bag",
    value: "bag",
  },
  {
    key: "quintal",
    value: "quintal",
  },
  {
    key: "brick",
    value: "brick",
  },
  {
    key: "feet",
    value: "feet",
  },
  {
    key: "sq.feet",
    value: "sq.feet",
  },
  {
    key: "cubic meter",
    value: "cubic meter",
  },
  {
    key: "hour",
    value: "hour",
  },
  {
    key: "running meter",
    value: "running meter",
  },
  {
    key: "piece",
    value: "piece",
  },
  {
    key: "sq.feet and thickness",
    value: "sq.feet and thickness",
  },
  {
    key: "tanker",
    value: "tanker",
  },
  {
    key: "budget",
    value: "budget",
  },
  {
    key: "size and area",
    value: "size and area",
  },
  {
    key: "length and thickness",
    value: "length and thickness",
  },
  {
    key: "area and thickness",
    value: "area and thickness",
  },
  {
    key: "labour",
    value: "labour",
  },
];
const UpdateCategory = ({ navigation, route }) => {
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [public_id, setPublic_id] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [hourlyPrice, setHourlyPrice] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isupdated, setIsupdated] = React.useState(false);
  const dispatch = useDispatch();

  const updateCategoryHandler = () => {
    if (!name || !category || !price) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Please fill all the fields",
      });
      return;
    }
    if (!public_id || !url) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Please upload an image",
      });
      return; // Get all services detail --> Admin
    }
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("category", category);
    myForm.append("public_id", public_id);
    myForm.append("url", url);
    myForm.append("price", parseInt(price));
    myForm.append("unit",unit)
    myForm.append("hourlyPrice", parseInt(hourlyPrice));

    dispatch(updateCategory(route.params.id, myForm));
    setIsupdated(true);

    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Success",
      textBody: "Category updated successfully",
    });
    navigation.navigate("allcategory");
  };
  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Permission to access camera roll is required!",
      });
      return;
    }

    const data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2, 2],
      quality: 1,
    });

    const source = await FileSystem.readAsStringAsync(data.assets[0].uri, {
      encoding: "base64",
    });

    if (!data.canceled) {
      console.log("");
    }
    if (source) {
      let base64Img = `data:image/jpg;base64,${source}`;
      let apiUrl = "https://api.cloudinary.com/v1_1/dk0o7tdks/image/upload/";
      let data = {
        file: base64Img,
        upload_preset: "myUploadPreset",
      };
      setLoading(true);

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      })
        .then(async (response) => {
          let data = await response.json();
          if (data.secure_url) {
            setPublic_id(data.public_id);
            setUrl(data.secure_url);

            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Success",
              textBody: "Upload successful",
            });
            setLoading(false);
          }
        })
        .catch((err) => {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            textBody: "Cannot upload image",
          });
        });
    }
  };
  const getCategoryDetails = (categoryId) => {
    let apiUrl = `http://64.227.172.50:5000/api/v1/category/${categoryId}`;
    fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    })
      .then(async (response) => {
        let data = await response.json();
        data = data.category;
        if (data) {
          setName(data.name);
          setCategory(data.category);
          setPublic_id(data.public_id);
          setUrl(data.url);
          setUnit(data.unit);
          setHourlyPrice(data.hourlyPrice || "0");
          setPrice(data.price.toString());
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
  };
  useEffect(() => {
    getCategoryDetails(route.params.id);

    if (isupdated) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Category updated successfully",
      });
      navigation.navigate("allcategory");
    }
  }, [dispatch, isupdated]);


  return loading ? (
    <Loader loading={loading} />
  ) : (
    <SafeAreaView>
      <View style={Styles.container}>
        <View style={Styles.cardContainer}>
          <View
            style={{
              width: 300,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 10,
            }}
          >
            <Text style={{ fontSize: 30, fontFamily: "Poppins_500Medium" }}>
              Update Category
            </Text>
          </View>
          <ScrollView>
            <View style={Styles.inputContainer}>
              <SelectList
                fontFamily={"Poppins_400Regular"}
                boxStyles={{ width: 300 }}
                setSelected={setCategory}
                data={categories}
                placeholder={"Select Category"}
                defaultOption={{ key: category, value: category }}
              />
              <TextInput
                style={Styles.input}
                placeholder={
                  category === "Material"
                    ? "Enter Material name"
                    : "Enter service name"
                }
                value={name}
                onChangeText={setName}
              />
              {category === "Material" && (
                <SelectList
                  fontFamily={"Poppins_400Regular"}
                  boxStyles={{ width: 300 }}
                  setSelected={setUnit}
                  data={units}
                  placeholder={"Select unit of material"}
                  defaultOption={{ key: unit, value: unit }}
                />
              )}
              <TextInput
                style={Styles.input}
                placeholder={
                  category === "Material"
                    ? `Enter avg price per ${unit}`
                    : "Enter visiting price"
                }
                value={price}
                onChangeText={setPrice}
              />
              {category === "Service" && (
                <TextInput
                  style={Styles.input}
                  placeholder="Enter service hourly price"
                  value={hourlyPrice}
                  onChangeText={setHourlyPrice}
                />
              )}
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  width: 300,
                  padding: 7,
                  borderRadius: 12,
                }}
              >
                <Text
                  onPress={openImagePickerAsync}
                  style={{
                    textAlign: "center",
                    fontFamily: "Poppins_400Regular",
                    color: "#50C2C9",
                    fontSize: 18,
                  }}
                >
                  Upload Image
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  width: 300,
                  borderWidth: 1,
                  height: 95,
                  borderRadius: 12,
                  justifyContent: "center",
                  padding: 10,
                  gap: 5,
                }}
              >
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {url && (
                    <Image style={Styles.loginImg} source={{ uri: url }} />
                  )}
                </ScrollView>
              </View>
              <Button
                textColor={"white"}
                labelStyle={{ fontSize: 25 }}
                onPress={updateCategoryHandler}
                style={Styles.buttonContainer}
              >
                <Text style={Styles.btnText}>Update Category</Text>
              </Button>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateCategory;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "#eeeeee",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    backgroundColor: "white",
    width: "90%",
    alignItems: "center",
    marginTop: 25,
  },
  inputContainer: {
    width: 300,
    alignItems: "center",
    gap: 10,
    marginVertical: 20,
  },
  input: {
    width: "100%",
    padding: 7,
    fontSize: 17,
    fontFamily: "Poppins_400Regular",
    borderRadius: 12,
    borderWidth: 1,
  },
  buttonContainer: {
    height: 60,
    width: 300,
    backgroundColor: "#49D9C8",
  },
  btnText: {
    fontSize: 26,
    color: "white",
    lineHeight: 60,
    fontFamily: "Poppins_600SemiBold",
  },
  loginImg: {
    width: 75,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
});
