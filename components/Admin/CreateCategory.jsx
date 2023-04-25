import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useDispatch } from "react-redux";
import { CreateCategories } from "../../redux/actions/serviceAction";
import Loader from "../Loader";
import { SelectList } from "react-native-dropdown-select-list";


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
const CreateCategory = ({ navigation }) => {
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [public_id, setPublic_id] = React.useState("");
  const [url, setUrl] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const createCategoryHandler = () => {
    if (!name) {
      alert("Please fill all the fields");
      return;
    }
    if (!public_id || !url) {
      alert("Please upload an image");
      return;// Get all services detail --> Admin
    }
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("category", category);
    myForm.append("public_id", public_id);
    myForm.append("url", url);

    dispatch(CreateCategories(myForm));
    alert("Category create successfully");
    navigation.navigate("dashboard");
  };
  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
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
            alert("Upload successful");
            setLoading(false);
          }
        })
        .catch((err) => {
          alert("Cannot upload");
          console.log(err);
        });
    }
  };

  return loading ? (
    <Loader />
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
              Create Category
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
                // defaultOption={{ key: "EL", value: "Electronics" }}
              />
                <TextInput
                style={Styles.input}
                placeholder="Enter category name"
                value={name}
                onChangeText={setName}
              />
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
                  <Image
                    style={Styles.loginImg}
                    source={{ uri: url}}
                  />
                </ScrollView>
              </View>
              <Button
                textColor={"white"}
                labelStyle={{ fontSize: 25 }}
                onPress={createCategoryHandler}
                style={Styles.buttonContainer}
              >
                <Text style={Styles.btnText}>Create Category</Text>
              </Button>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateCategory;

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
