import React from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import Animated from "react-native-reanimated";

import { FONT_SIZE } from "../../resources/dimens";

interface TitleProps {
  style?: StyleProp<TextStyle>;
}

const Title: React.FC<TitleProps> = ({ children, style }) => {
  return <Animated.Text style={[styles.text, style]}>{children}</Animated.Text>;
};

Title.defaultProps = {
  style: undefined,
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-SemiBold",
    fontSize: FONT_SIZE.title2,
    color: "black",
  },
});

export default Title;
