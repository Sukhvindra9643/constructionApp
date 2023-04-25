import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React,{useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Loader from "../Loader";
import { updateSellerService,getServiceDetails } from "../../redux/actions/serviceAction";
import { useSelector ,useDispatch} from "react-redux";
const categories = [
  {
    key: "Electronics",
    value: "Electronics",
  },
  {
    key: "Grocery",
    value: "Grocery",
  },
  {
    key: "Automobiles",
    value: "Automobiles",
  },
];

const subCategories = {
  Electronics: [
    {
      key: "mobiles",
      value: "Mobiles",
    },
    {
      key: "laptops",
      value: "Laptops",
    },
  ],
  Grocery: [
    {
      key: "fruits",
      value: "Fruits",
    },
    {
      key: "vegetables",
      value: "Vegetables",
    },
  ],
  Automobiles: [
    {
      key: "bikes",
      value: "Bikes",
    },
    {
      key: "cars",
      value: "Cars",
    },
  ],
};
const SellerUpdateService = ({ navigation,route}) => {
  const dispatch = useDispatch();
  const {loading, service, error,isUpdated} = useSelector((state) => state.services);
  const img = service ? [...service.images]:[];

  const [name, setName] = React.useState(service ? service.name:"");
  const [price, setPrice] = React.useState(service ? service.price.toString():"");
  const [desc, setDesc] = React.useState(service ? service.desc:"");
  const [category, setCategory] = React.useState(service ? service.category:"");
  const [subcategory, setSubCategory] = React.useState(service ? service.subcategory:"");
  const [public_id, setPublic_id] = React.useState(img.map((i)=>{return i.public_id}));
  const [url, setUrl] = React.useState(img.map((i)=>{return i.url}));
 

  const createServiceHandler = () => {
    if (!name || !price || !desc || !category || !subcategory) {
      alert("Please fill all the fields");
      return;
    }
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("price", price);
    myForm.append("desc", desc);
    myForm.append("category", category);
    myForm.append("subcategory", subcategory);
    myForm.append("public_id", public_id);
    myForm.append("url", url);

    dispatch(updateSellerService(route.params.id,myForm));
  };
  useEffect(() => {
    if(error){
      alert(error)
    }
    dispatch(getServiceDetails(route.params.id));

    if(isUpdated){
      alert("Service updated successfully")
      navigation.navigate("sellerdashboard")
    }
  }, [dispatch,isUpdated,error]);

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
            setPublic_id([...public_id, {public_id:data.public_id}]);
            setUrl([...url, {url : data.secure_url}]);
            alert("Upload successful");
          }
        })
        .catch((err) => {
          alert("Cannot upload");
          console.log(err);
        });
    }
  };
  return loading?(<Loader/>):(
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
              Update Service
            </Text>
          </View>
          <ScrollView>
            <View style={Styles.inputContainer}>
              <TextInput
                style={Styles.input}
                placeholder="Enter service name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={Styles.input}
                placeholder="Enter service price"
                value={price}
                onChangeText={setPrice}
              />
              <TextInput
                style={Styles.input}
                placeholder="Enter service description"
                value={desc}
                onChangeText={setDesc}
              />

              <SelectList
                fontFamily={"Poppins_400Regular"}
                boxStyles={{ width: 300 }}
                setSelected={setCategory}
                data={categories}
                placeholder={"Select Category"}
                defaultOption={{ key: category, value: category }}
              />
              {category && (
                <SelectList
                  fontFamily={"Poppins_400Regular"}
                  boxStyles={{ width: 300 }}
                  setSelected={setSubCategory}
                  data={subCategories[category]}
                  placeholder={"Select SubCategory"}
                  defaultOption={{ key: subcategory, value: subcategory }}
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
                  {url.map((image, index) => {
                    return (
                      <Image
                        key={index}
                        style={Styles.loginImg}
                        source={{ uri: image }}
                      />
                    );
                  })}
                </ScrollView>
              </View>
              <Button
                textColor={"white"}
                labelStyle={{ fontSize: 25 }}
                onPress={createServiceHandler}
                style={Styles.buttonContainer}
              >
                <Text style={Styles.btnText}>Update Service</Text>
              </Button>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SellerUpdateService;

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
