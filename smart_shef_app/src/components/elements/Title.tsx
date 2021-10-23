import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

import { FONT_SIZE } from "../../resources/dimens";

interface TitleProps {
  style?: StyleProp<TextStyle>;
}

const Title: React.FC<TitleProps> = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
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
