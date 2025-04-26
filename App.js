import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import Home from "./src/screens/Home";
import { colors } from "./src/modal/color";
import Route from "./src/navigation/Router";
import "react-native-gesture-handler";

import Amplify, { Analytics, Auth } from "aws-amplify";
// import awsconfig from "./src/aws-exports";
// Amplify.configure({
//   ...awsconfig,
//   Analytics: {
//     disabled: true,
//   },
// });

export default function App() {
  return (
    <SafeAreaView style={styles.SafeAreaViewForDroid}>
      <StatusBar barStyle="dark-content" backgroundColor="#fec85c" />
      <Route />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaViewForDroid: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor: colors.background,
  },
});
