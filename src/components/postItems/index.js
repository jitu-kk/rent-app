import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Platform,
  Pressable,
} from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import react from "react";
const PostItems = (props) => {
  const navigation = useNavigation();
  const singlePost = props.post;
  const [images, setimages] = useState(JSON.parse(singlePost.images));
  // console.log(singlePost);
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("PostDetails", {
          postInfo: singlePost,
        });
      }}
      style={styles.container}>
      <View style={styles.postWrap}>
        <Image
          source={{
            uri:
              "https://dnezpuwttqdfg.cloudfront.net/fit-in/400x400/public/" +
              images[0].imageUri,
          }}
          style={styles.postImage}></Image>
        <View style={styles.postContentWrap}>
          <View>
            <Text style={styles.postTitle}>{singlePost.title}</Text>
            <Text style={styles.postPlace}>{singlePost.locationName}</Text>
          </View>
          <Text style={styles.postValue}>${singlePost.rentValue} / Day</Text>
        </View>
      </View>
    </Pressable>
  );
};
export default PostItems;
