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
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useDispatch } from "react-redux";
import { updateService } from "../redux/actions/serviceAction";
import Loader from "../components/Loader";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { SelectList } from "react-native-dropdown-select-list";
import { StackActions } from "@react-navigation/native";



const units = [
  {
    key: "coins",
    value: "coins",
  },
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

const UpdateService = ({ navigation, route }) => {
  const [name, setName] = React.useState(route.params.service.name || "");
  const [unit, setUnit] = React.useState(route.params.service.unit || "");
  const [public_id, setPublic_id] = React.useState(route.params.service.public_id || []);
  const [url, setUrl] = React.useState(route.params.service.url || []);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();


  const updateServiceHandler = () => {
    if (!name || !unit) {
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
      return;
    }
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("unit", unit);
    myForm.append("public_id", public_id);
    myForm.append("url", url);

    dispatch(updateService(route.params.service._id, myForm));
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Success",
      textBody: "Service Updated Successfully",
    });
    navigation.dispatch(
      StackActions.replace("main", {
        screen: "dashboard",
        user: user,
      })
    );
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
      aspect: [1, 1],
      quality: 1,
    });

    if (data.assets !== null) {
      const source = await FileSystem.readAsStringAsync(data.assets[0].uri, {
        encoding: "base64",
      });
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
              setPublic_id([...public_id, data.public_id]);
              setUrl([...url, data.secure_url]);
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
    }
  };

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
              <SelectList
                fontFamily={"Poppins_400Regular"}
                boxStyles={{ width: 300 }}
                setSelected={setUnit}
                data={units}
                placeholder={"Select unit of material"}
                defaultOption={{ key: unit, value: unit }}
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
              <TouchableOpacity
                onPress={() => updateServiceHandler()}
                style={{
                  backgroundColor: "#49D9C8",
                  width: "100%",
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 26,
                    fontWeight: "bold",
                  }}
                >
                  Update Service
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateService;

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
