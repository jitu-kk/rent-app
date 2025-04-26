import React, { useMemo, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MediaType } from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { Entypo, Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { colors } from "../../modal/color";
const SelectLocationScreen = () => {
  const navigation = useNavigation();

  const [locState, setLocState] = useState({
    names: [
      {
        id: 0,
        name: "Manhattan",
      },
      {
        id: 1,
        name: "Moonachie",
      },
      {
        id: 2,
        name: "Hackensack",
      },
      {
        id: 3,
        name: "Athenia",
      },
      {
        id: 4,
        name: "Wayne",
      },
    ],
  });

  return (
    <ScrollView>
      <Text style={{ fontSize: 20, margin: 20 }}>Select a Location</Text>
      {locState.names.map((item, index) => (
        <Pressable
          key={item.id}
          android_ripple={{ color: colors.grey }}
          style={{
            padding: 15,
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            paddingLeft: 30,
            borderBottomWidth: 1,
            borderBottomColor: colors.grey,
          }}
          onPress={() => {
            navigation.navigate("Listing", {
              locID: item.id,
              locName: item.name,
            });
          }}>
          <Text>{item.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default SelectLocationScreen;
