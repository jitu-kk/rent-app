import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import styles from "./styles";
import { withAuthenticator } from "aws-amplify-react-native";
import { Auth, Storage, API, graphqlOperation } from "aws-amplify";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../modal/color";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { createListing } from "../../graphql/mutations";
import HeaderForDesktop from "../../components/headerForDesktop";
import MenuDetailsForDesktop from "../../components/menuDetailsForDesktop";
import * as ImagePicker from "expo-image-picker";
const Listing = () => {
  const windowWidth = Number(Dimensions.get("window").width);
  const navigation = useNavigation();
  const [imageData, setImageData] = useState([]);
  const [category, setCategory] = useState({ catID: 0, catName: "Category" });
  const [Location, setLocation] = useState({ locID: 0, locName: "Location" });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rentValue, setRentValue] = useState("");
  const [userID, setUserID] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [postSuccess, setPostSuccess] = useState("");
  const [postProcessing, setPostProcessing] = useState(false);
  // const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImageData(result.selected);
    }
  };
  useEffect(() => {
    if (postSuccess !== "") {
      setPostProcessing(false);
      Alert.alert("Success", postSuccess, [
        {
          text: "Ok",
          onPress: () => navigation.navigate("Home", { screen: "Explore" }),
        },
      ]);
    }
  }, [postSuccess]);
  Auth.currentAuthenticatedUser()
    .then((user) => {
      // console.log("user id is: ", user.attributes.sub);
      setUserID(user.attributes.sub);
      setUserEmail(user.attributes.email);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  const route = useRoute();
  useEffect(() => {
    if (!route.params) {
      console.log("There is no data in route");
    } else {
      if (route.params.imageData !== undefined) {
        // console.log(route.params.imageData);
        setImageData(route.params.imageData);
      } else if (route.params.catID !== undefined) {
        setCategory(route.params);
      } else if (route.params.locID !== undefined) {
        setLocation(route.params);
      }
    }
  });

  const imageAllUrl = [];
  const storeToDB = async () => {
    setPostProcessing(true);
    imageData &&
      imageData.map(async (compnent, index) => {
        const imageUrl = compnent.uri;
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        if (Platform.OS === "web") {
          const contentType = blob.type;
          const extension = contentType.split("/")[1];
          var key = `${uuidv4()}.${extension}`;
        } else {
          const urlParts = imageUrl.split(".");
          const extension = urlParts[urlParts.length - 1];
          var key = `${uuidv4()}.${extension}`;
        }

        imageAllUrl.push({ imageUri: key });
        await Storage.put(key, blob);

        if (imageData.length == index + 1) {
          const postData = {
            title: title,
            categoryName: category.catName,
            categoryID: category.catID,
            description: description,
            images: JSON.stringify(imageAllUrl),
            locationID: Location.locID,
            locationName: Location.locName,
            owner: userEmail,
            rentValue: rentValue,
            userID: userID,
            commonID: "1",
          };

          await API.graphql({
            query: createListing,
            variables: { input: postData },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });
          if (Platform.OS === "web") {
            setPostProcessing(false);
            navigation.navigate("Home", { screen: "Explore" });
          } else {
            setPostProcessing(false);
            setPostSuccess("Your adv have successfully published.");
          }
        }
      });
  };
  // Auth.signOut();
  const [menuToggle, setMenuToggle] = useState(false);
  return (
    <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
      <HeaderForDesktop setMenuToggle={setMenuToggle} menuToggle={menuToggle} />
      <ScrollView
        style={{
          margin: 10,
          width: windowWidth > 800 ? "80%" : "100%",
          padding: windowWidth > 800 ? 50 : 10,
        }}>
        <View>
          <Text style={{ marginTop: 10 }}>Upload images [Max 5 photos]</Text>
          <Pressable
            style={{
              backgroundColor: colors.white,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
              height: 150,
              width: 150,
              borderWidth: 1,
              borderStyle: "dashed",
              borderRadius: 30,
            }}
            onPress={() => {
              if (Platform.OS === "web") {
                pickImage();
              } else {
                navigation.navigate("SelectPhoto");
              }
            }}>
            <AntDesign name="pluscircle" size={24} color="black" />
          </Pressable>
          <View>
            <ScrollView horizontal={true}>
              {imageData &&
                imageData.map((component, index) => (
                  <Image
                    key={component.id}
                    source={{ uri: component.uri }}
                    style={{
                      height: 100,
                      width: 100,
                      marginBottom: 20,
                      marginTop: -5,
                      marginRight: 5,
                    }}
                  />
                ))}
            </ScrollView>
          </View>
        </View>
        <Pressable
          style={styles.catStyle}
          onPress={() => {
            navigation.navigate("SelectCategory");
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Octicons name="settings" size={24} color="black" />
            <Text
              style={{ fontSize: 16, color: colors.secondary, marginLeft: 5 }}>
              {category.catName}
            </Text>
          </View>
          <AntDesign name="right" size={22} color={colors.secondary} />
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("SelectLocation");
          }}
          style={styles.catStyle}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="map-marker"
              size={24}
              color={colors.secondary}
            />
            <Text
              style={{ fontSize: 16, color: colors.secondary, marginLeft: 5 }}>
              {Location.locName}
            </Text>
          </View>
          <AntDesign name="right" size={22} color={colors.secondary} />
        </Pressable>

        <View style={styles.inputTextStyle}>
          <MaterialIcons name="title" size={24} color={colors.secondary} />
          <TextInput
            placeholder="Adv Title"
            style={{ width: "100%" }}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.inputTextStyle}>
          <MaterialIcons
            name="description"
            size={24}
            color={colors.secondary}
          />
          <TextInput
            placeholder="Write a description"
            style={{ marginLeft: 5, width: "100%" }}
            onChangeText={(text) => setDescription(text)}
            multiline={true}
            numberOfLines={3}
          />
        </View>
        <View style={[styles.inputTextStyle, { width: "50%" }]}>
          <FontAwesome name="dollar" size={24} color={colors.secondary} />
          <TextInput
            placeholder="Add a value"
            style={{ marginLeft: 5, width: "100%" }}
            onChangeText={(text) => setRentValue(text)}
            keyboardType="numeric"
          />
        </View>
        <Pressable
          onPress={() => storeToDB()}
          android_ripple={{ color: "grey" }}
          style={{
            margin: 10,
            borderRadius: 30,
            backgroundColor: colors.secondary,
            alignItems: "center",
            paddingLeft: 20,
            // marginTop: 150,
            elevation: 5,
          }}>
          <Text
            style={{
              color: colors.white,
              paddingVertical: 12,
              fontSize: 14.5,
              fontWeight: "bold",
            }}>
            {postProcessing ? "Processing..." : "POST ADV"}
          </Text>
        </Pressable>
      </ScrollView>
      <MenuDetailsForDesktop menuToggle={menuToggle} top={59} right={"9.3%"} />
    </View>
  );
};

export default withAuthenticator(Listing);
