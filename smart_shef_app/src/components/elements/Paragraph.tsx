import React from "react";
import { StyleProp, TextStyle, Text, StyleSheet } from "react-native";

import { FONT_SIZE } from "../../resources/dimens";

interface ParagraphProps {
  style?: StyleProp<TextStyle>;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

Paragraph.defaultProps = {
  style: undefined,
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: FONT_SIZE.medium,
    color: "black",
  },
});

export default Paragraph;
