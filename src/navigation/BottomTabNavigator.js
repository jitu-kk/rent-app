import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import postDetails from "../screens/postDetails";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../modal/color";
import PostDetails from "../screens/postDetails";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Listing from "../screens/Listing";
import { FontAwesome5 } from "@expo/vector-icons";
import LendBorrowerNavScreen from "./LendBorrNav";
const BottomTabNav = () => {
  const windowWidth = Number(Dimensions.get("window").width);

  const Tab = createBottomTabNavigator();
  // alert(windowWidth);
  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarActiveBackgroundColor: colors.primary,
        tabBarActiveTintColor: colors.secondary,
        tabBarStyle: {
          backgroundColor: colors.primary,
          height: 50,
          display: windowWidth > 800 ? "none" : "flex",
        },
      }}
      sceneContainerStyle={{ backgroundColor: colors.background }}>
      <Tab.Screen
        name={"Explore"}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={25} color={colors.secondary} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={"Listing"}
        component={Listing}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clipboard-text"
              size={24}
              color="black"
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={"Journal"}
        component={LendBorrowerNavScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="journal-whills" size={24} color="black" />
          ),

          headerShown: false,
        }}
      />
      <Tab.Screen
        name={"Profile"}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
