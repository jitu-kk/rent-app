import React, { useState, useEffect } from "react";
import { Auth, API } from "aws-amplify";
import { View, Text, FlatList } from "react-native";
import { listRentOrders } from "../../graphql/queries";
import BorrowerHeadScreen from "../../components/BorrowerHead";
import LenderHeadScreen from "../../components/LenderHead";
const LenderScreen = () => {
  const [newItems, setNewItems] = useState([]);
  const [userID, setUserID] = useState("");
  Auth.currentAuthenticatedUser()
    .then((user) => {
      //   console.log("user id is: ", user.attributes.sub);
      setUserID(user.attributes.sub);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  const fetchAll = async () => {
    try {
      const orderList = await API.graphql({
        query: listRentOrders,
        variables: {
          filter: {
            lenderUserID: { eq: userID },
          },
        },
      });

      setNewItems(orderList.data.listRentOrders.items);
      //   consolea.log("Order data is: ", orderList.data.listRentOrders.items);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAll();
  });

  return (
    <View>
      <FlatList
        data={newItems}
        renderItem={({ item }) => <LenderHeadScreen BorrowerHead={item} />}
      />
    </View>
  );
};
export default LenderScreen;
