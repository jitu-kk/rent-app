import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import postDetails from "../screens/postDetails";
import BottomTabNav from "./BottomTabNavigator";
import SelectPhotosScreen from "../screens/selectPhotos";
import SelectCategoryScreen from "../screens/selectCategory";
import SelectLocationScreen from "../screens/selectLocation";
import LocationSearch from "../components/locationSearch";
import CategorySearch from "../components/categorySearch";
const Route = () => {
  const Stack = createStackNavigator();
  //Its a comment
  return (
    <NavigationContainer
      linking={{
        prefixes: ["myapp://", "https://bhara.com", "https://*.bhara.com"],
        config: {
          screens: {
            Home: {
              screens: {
                Explore: "/Explore",
                Listing: "/Listing",
                Chat: "/Chat",
                Profile: "/Profile",
              },
            },
            SelectLocation: "/SelectLocation",
            // PostDetails: "/PostDetails",
          },
        },
      }}>
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: "#fec85c60",
          },
        }}>
        <Stack.Screen
          name="Home"
          // component={SelectCategoryScreen}
          component={BottomTabNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostDetails"
          component={postDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectPhoto"
          component={SelectPhotosScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectCategory"
          component={SelectCategoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectLocation"
          component={SelectLocationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LocationSearch"
          component={LocationSearch}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CategorySearch"
          component={CategorySearch}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
