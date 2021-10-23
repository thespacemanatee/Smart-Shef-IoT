import React from "react";
import { StyleProp, TextStyle, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { FONT_SIZE } from "../../resources/dimens";

interface SubheadingProps {
  style?: StyleProp<TextStyle>;
}

const Subheading: React.FC<SubheadingProps> = ({ children, style }) => {
  return <Animated.Text style={[styles.text, style]}>{children}</Animated.Text>;
};

Subheading.defaultProps = {
  style: undefined,
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: FONT_SIZE.large,
    color: "black",
  },
});

export default Subheading;
