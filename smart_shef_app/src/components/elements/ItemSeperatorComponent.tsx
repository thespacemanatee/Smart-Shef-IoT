import React from "react";
import { StyleSheet, View } from "react-native";

const ItemSeperatorComponent = () => {
  return <View style={styles.itemSeperator} />;
};

export default ItemSeperatorComponent;

const styles = StyleSheet.create({
  itemSeperator: {
    height: 1,
    backgroundColor: "lightgrey",
  },
});
