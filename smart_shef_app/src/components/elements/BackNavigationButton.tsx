import React from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { ICON_SIZE, SPACING } from "../../resources/dimens";

interface BackNavigationButtonProps {
  onPress: () => void;
}

const BackNavigationButton = ({ onPress }: BackNavigationButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.iconContainer}>
          <Icon name="arrow-left" size={ICON_SIZE.icon_32} color="black" />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default BackNavigationButton;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: SPACING.spacing_32,
    marginEnd: SPACING.spacing_16,
  },
  iconContainer: {
    padding: SPACING.spacing_8,
  },
});
