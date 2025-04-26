import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  Dimensions,
  Platform,
  Pressable,
} from "react-native";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
const HeaderForMobile = (props) => {
  const navigation = useNavigation();
  const windowWidth = Number(Dimensions.get("window").width);
  function onSearch(e) {
    props.setSearchText(e);
  }
  return (
    <>
      <View
        style={[
          styles.headerWrap,
          { display: windowWidth > 800 ? "none" : "flex" },
        ]}>
        <View style={styles.searchByTextWrap}>
          <Feather name="search" size={24} color="black" />
          <TextInput
            placeholder="Search in Rent.com"
            style={[styles.searchPlaceholder, { width: "100%" }]}
            multiline={false}
            onSubmitEditing={(event) => onSearch(event.nativeEvent.text)}
          />
        </View>
        <View style={styles.locationCatSearchWrap}>
          <Pressable
            onPress={() => {
              navigation.navigate("LocationSearch");
            }}
            style={styles.locationSearchWrap}>
            <MaterialIcons name="location-on" size={24} color="black" />
            <Text>Location</Text>
            <Text style={styles.locationSearchText}>
              {props.searchByLocation.locationName}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("CategorySearch");
            }}
            style={{ flexDirection: "row" }}>
            <Octicons name="settings" size={24} color="black" />
            <Text style={styles.catText}>Category</Text>
            <Text style={styles.catDynText}>
              {props.searchByCategory.catName}
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};
export default HeaderForMobile;
