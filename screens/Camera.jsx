import React, { useState, useEffect } from 'react';
import { Text, View} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from 'expo-file-system';
const CameraComponent = ({ navigation, route }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [camera, setCamera] = useState(null);




    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const openImagePickerAsync = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const data = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true, aspect: [1, 1], quality: 1
        });
        const source = await FileSystem.readAsStringAsync(data.assets[0].uri, { encoding: 'base64' })
        
        if (!data.canceled) {
            console.log("")
        }
        if(source){
            let base64Img = `data:image/jpg;base64,${source}`;
            let apiUrl =
              'https://api.cloudinary.com/v1_1/dk0o7tdks/image/upload/';
            let data = {
              file: base64Img,
              upload_preset: 'myUploadPreset'
            }; 
            fetch(apiUrl, {
                body: JSON.stringify(data),
                headers: {
                  'content-type': 'application/json'
                },
                method: 'POST'
              })
                .then(async response => {
                  let data = await response.json();
                  if (data.secure_url) {
                    alert('Upload successful');
                    if (route.params.updateProfile) return navigation.navigate("editprofile", { image: data.secure_url,id:data.public_id})
                  }
                })
                .catch(err => {
                  alert('Cannot upload');
                  console.log(err);
                });
            }
    }

    const clickPicture = async () => {
        const options = { quality: 0.7, base64: true };
        const data = await camera.takePictureAsync(options);
        const source = data.base64;
        if(source){
            let base64Img = `data:image/jpg;base64,${source}`;
            let apiUrl =
              'https://api.cloudinary.com/v1_1/dk0o7tdks/image/upload/';
            let data = {
              file: base64Img,
              upload_preset: 'myUploadPreset'
            }; 
            fetch(apiUrl, {
                body: JSON.stringify(data),
                headers: {
                  'content-type': 'application/json'
                },
                method: 'POST'
              })
                .then(async response => {
                  let data = await response.json();
                  if (data.secure_url) {
                    alert('Upload successful');
                    if (route.params.updateProfile) return navigation.navigate("editprofile", { image: data.secure_url,id:data.public_id})
                  }
                })
                .catch(err => {
                  alert('Cannot upload');
                  console.log(err);
                });
            }

    }
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{ flex: 1 }}>
            <Camera type={type} style={{ flex: 1, aspectRatio: 1 }} ratio="1:1" ref={(e) => setCamera(e)} />



            <View
                style={{
                    flexDirection: "row",
                    position: "absolute",
                    bottom: 10,
                    justifyContent: "space-evenly",
                    width: "100%",
                }}
            >
                <Icon name="image" size={40} color="#fff" onPress={openImagePickerAsync} />
                <Icon name="camera" size={40} color="#fff" onPress={clickPicture} />

                <Icon
                    name="flip-camera-android"
                    size={40}
                    color="#fff"
                    onPress={() =>
                        setType(
                            type === CameraType.back ? CameraType.front : CameraType.back
                        )
                    }
                />
            </View>


        </View>
    );
}

export default CameraComponent