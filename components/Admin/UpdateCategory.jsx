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
import {updateCategory } from "../../redux/actions/serviceAction";
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


const UpdateCategory = ({ navigation, route }) => {
    const {error} = useSelector((state) => state.services);
    const [name, setName] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [public_id, setPublic_id] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [price,setPrice] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [isupdated,setIsupdated] = React.useState(false);
    const dispatch = useDispatch();


    const updateCategoryHandler = () => {
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
        myForm.append("price",price)
        dispatch(updateCategory(route.params.id,myForm));
        setIsupdated(true)
        alert("Category updated successfully");
        navigation.navigate("allcategory");
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
    const getCategoryDetails = (categoryId) => {
        let apiUrl = `http://192.168.100.66:4000/api/v1/category/${categoryId}`;
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
                    setPrice(data.price.toString())
                    // setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getCategoryDetails(route.params.id)

        if (isupdated) {
            alert("Category updated successfully")
            navigation.navigate("allcategory")
        }
    }, [dispatch, isupdated, error]);


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
                                placeholder="Enter category name"
                                value={name}
                                onChangeText={setName}
                            />
                            <TextInput
                                style={Styles.input}
                                placeholder="Enter price"
                                value={price}
                                onChangeText={setPrice}
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
                                    {url && <Image
                                        style={Styles.loginImg}
                                        source={{ uri: url }}
                                    />}
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
