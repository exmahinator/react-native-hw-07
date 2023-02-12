import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CreatePostsScreen() {
  return (
    <View style={styles.container}>
      <Text>createPostsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})