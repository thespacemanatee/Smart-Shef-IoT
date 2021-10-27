import React from "react";
import { StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACING } from "../../resources/dimens";

import BackNavigationButton from "../elements/BackNavigationButton";
import Title from "../typography/Title";

interface HeaderTitleWithBackButtonProps {
  title?: string;
  onPress: () => void;
}

const HeaderTitleWithBackButton = ({
  title,
  onPress,
}: HeaderTitleWithBackButtonProps) => {
  return (
    <View style={styles.titleContainer}>
      <BackNavigationButton onPress={onPress} />
      <Title style={styles.titleText}>{title}</Title>
    </View>
  );
};

HeaderTitleWithBackButton.defaultProps = {
  title: "",
};

export default HeaderTitleWithBackButton;

const styles = StyleSheet.create({
  titleText: {
    fontSize: FONT_SIZE.title3,
  },
  titleContainer: {
    flexDirection: "row",
    padding: SPACING.spacing_8,
    alignItems: "center",
  },
});
