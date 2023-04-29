import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState,useEffect } from "react";
import { Button } from "react-native-paper";
import { useDispatch,useSelector } from "react-redux";
import { register } from "../redux/actions/userAction";
import Icon from "react-native-vector-icons/AntDesign";
import Icon1 from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import SelectMultiple from 'react-native-select-multiple'
import Loader from "../components/Loader"

const Register = ({ navigation }) => {
  const dispatch = useDispatch();

  // const businessInfo = ["plumber", "electrician", "Ac Repair", "painter", "Sand", "Sariya", "cement", "Aggregate", "Steel", "Bricks", "Stone", "Tiles", "Marble", "Concrete Masonry Unit", "Bitumen", "Glass", "Paint", "Plumbing Material", "Metal Sheet", "Water Tanker", "Rope", "Sanitory&Fittings", "Soil", "Ceramics", "Carbon Fibres", "Furniture", "Steel Plates & Girders", "Railings", "Electronic Equipment Suppliers", "Concrete Admixture", "Wood", "Ready Mix Concrete", "Electric Wires & Switches", "Plastic Sheets", "Timber&Fasteners", "Architects Design", "Soil Testing", "Earthwork (Encavators)", "Masons"] 
  
  const [loading,setLoading] = useState(true)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bName, setBName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toggle, setToggle] = useState("false");
  const [selectedData, setSelectedData] = useState([]);
  const [businessInfo,setBusinessInfo] = useState([]);
  const getAllCategories = () => {
    let apiUrl = "http://192.168.100.66:4000/api/v1/getAllCategories"
    fetch(apiUrl, {
        headers: {
            "content-type": "application/json",
        },
        method: "GET",
    })
        .then(async (response) => {
            let data = await response.json();
            if(data){
                console.log(data)
                setBusinessInfo(data.categories.map((c)=> c.name))
                setLoading(false)
            } 
        })
        .catch((err) => {
            console.log(err);
        });
}
  onChange = (selectedData) => {
    // selectedFruits is array of { label, value }
    setSelectedData([...selectedData])
  }

  const userRegisterHandler = () => {
    let shopInfo = [];
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("role", "user");
    myForm.append("shopInfo",shopInfo)

    if (password !== confirmPassword) {
      alert("Password does not match")
    } else {
      dispatch(register(myForm));
      navigation.navigate('profile');
    }
  };
  const sellerRegisterHandler = () => {
    const shopInfo = selectedData && selectedData.map((item)=> (item.value).toLowerCase())
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("bname", bName);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("role", "seller");
    myForm.append("shopInfo",shopInfo)

    if (password !== confirmPassword) {
      alert("Password does not match")
    } else {
      dispatch(register(myForm));
      navigation.navigate('profile');
    }
  };
  const renderLabels = (label, style) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        {/* <Image style={{ width: 32, height: 32 }} source={{ uri: 'https://dummyimage.com/100x100/52c25a/fff&text=S' }} /> */}
        <View style={{ marginLeft: 10 }}>
          <Text style={style}>{label}</Text>
        </View>
      </View>
    )
  }
  useEffect(() => {
    getAllCategories();
  }, [dispatch]);
  return loading ? (<Loader/>):(
    <View style={Styles.container}>
      <Image
        style={Styles.cornerimg}
        source={require("../assets/cornerdesign.jpg")}
      />
      <View style={{ top: "6%" }}>
        <Text style={Styles.heading}>Welcome Onboard</Text>
        <Text style={Styles.sub_heading}>
          Let's help you meet up your tasks
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 1,
          width: "85%",
          padding: 0,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
          top: "12%",
        }}
      >
        <TouchableOpacity
          style={{ width: "49%" }}
          onPress={() => setToggle("true")}
        >
          <Text
            style={{
              backgroundColor: toggle === "true" ? "#50C2C9" : "gray",
              textAlign: "center",
              fontFamily: "Poppins_400Regular",
              color: "#fff",
              padding: 5,
              marginBottom: 5,
              fontSize: 17,
            }}
          >
            Seller Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "49%" }}
          onPress={() => setToggle("false")}
        >
          <Text
            style={{
              backgroundColor: toggle === "false" ? "#50C2C9" : "gray",
              textAlign: "center",
              fontFamily: "Poppins_400Regular",
              color: "#fff",
              padding: 5,
              marginBottom: 5,
              fontSize: 17,
            }}
          >
            User Register
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: toggle === "true" ? "none" : "flex",
          width: "85%",
          height: "50%",
          top: "6%",
          gap: 5
        }}
      >
        <View
          style={{
            padding: 5,
            width: 350,
            flexDirection: "row",
            gap: 15,
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "gray"
          }}
        >
          <Icon2 name="user" size={30} style={Styles.icon2} />
          <TextInput
            style={Styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View
          style={{
            padding: 5,
            width: 350,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "gray"
          }}
        >
          <Icon name="mail" size={30} style={Styles.icon2} />
          <TextInput
            style={Styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View
          style={{
            padding: 5,
            width: 350,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "gray"
          }}
        >
          <Icon2 name="lock" size={30} style={Styles.icon2} />
          <TextInput
            secureTextEntry
            style={Styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View
          style={{
            padding: 5,
            width: 350,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "gray"
          }}
        >
          <Icon name="key" size={30} style={Styles.icon2} />
          <TextInput
            style={Styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            gap: 5,
            top: "0%",
          }}
        >
          <Text
            style={{
              color: "#900",
              textAlign: "center",
              fontFamily: "Poppins_400Regular",
              color: "#000",
            }}
          >
            Already have an account ?
          </Text>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins_400Regular",
                  color: "#50C2C9",
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          disabled={!email || !password}
          textColor={"white"}
          labelStyle={{ fontSize: 25 }}
          onPress={userRegisterHandler}
          style={Styles.buttonContainer}
        >
          <Text style={Styles.btnText}>User Register</Text>
        </Button>
      </View>
      <View
        style={{
          display: toggle === "true" ? "flex" : "none",
          width: "85%",
          height: "50%",
          top: "6%",
          gap: 5
        }}
      >

        <View
          style={{
            padding: 5,
            width: 350,
            flexDirection: "row",
            gap: 15,
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "gray"
          }}
        >
          <Icon2 name="user" size={30} style={Styles.icon2} />
          <TextInput
            style={Styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View
          style={{
            padding: 5,
            width: 350,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "gray"
          }}
        >
          <Icon1 name="business-outline" size={30} style={Styles.icon2} />
          <TextInput
            style={Styles.input}
            placeholder="Enter your business name"
            value={bName}
            onChangeText={setBName}
          />
        </View>
        <View
          style={{
            padding: 5,
            width: 350,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "gray"
          }}
        >
          <Icon name="mail" size={30} style={Styles.icon2} />
          <TextInput
            style={Styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View
          style={{
            padding: 5,
            width: 350,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "gray"
          }}
        >
          <Icon2 name="lock" size={30} style={Styles.icon2} />
          <TextInput
            secureTextEntry
            style={Styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View
          style={{
            padding: 5,
            width: 350,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "gray"
          }}
        >
          <Icon name="key" size={30} style={Styles.icon2} />
          <TextInput
            style={Styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
          <View style={{ marginVertical: 5,overflow:"scroll",height:150}}>
            <Text style={{fontSize:16,marginBottom:10}}>Select Materials and Services</Text>
            <SelectMultiple
              items={businessInfo}
              renderLabel={renderLabels}
              selectedItems={selectedData}
              onSelectionsChange={onChange} />

          </View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            gap: 5,
            top: "0%",
          }}
        >
          <Text
            style={{
              color: "#900",
              textAlign: "center",
              fontFamily: "Poppins_400Regular",
              color: "#000",
            }}
          >
            Already have an account ?
          </Text>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins_400Regular",
                  color: "#50C2C9",
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          disabled={!email || !password}
          textColor={"white"}
          labelStyle={{ fontSize: 25 }}
          onPress={sellerRegisterHandler}
          style={Styles.buttonContainer}
        >
          <Text style={Styles.btnText}>Seller Register</Text>
        </Button>
      </View>
    </View>
  );
};

export default Register;

const Styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eeeeee",
  },
  heading: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
  sub_heading: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },

  inputUser: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 30,
    borderRadius: 22,
    marginVertical: 3,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    textAlign: "center"
  },
  inputSeller: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 30,
    borderRadius: 22,
    marginVertical: 3,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },
  buttonContainer: {
    height: 60,
    backgroundColor: "#49D9C8",
  },
  btnText: {
    fontSize: 26,
    color: "white",
    lineHeight: 60,
    fontFamily: "Poppins_600SemiBold",
  },
  cornerimg: {
    position: "absolute",
    width: "100%",
    height: 200,
    top: 35,
    left: 0,
  },
  input: {
    fontSize: 18,
  }
});
