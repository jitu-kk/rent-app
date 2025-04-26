import { StyleSheet } from "react-native";
import { colors } from "../../modal/color";
const styles = StyleSheet.create({
  inputTextStyle: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  catStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 5,
  },
});

export default styles;
