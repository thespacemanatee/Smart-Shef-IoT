import React from "react";
import { StyleProp, TextStyle, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { FONT_SIZE } from "../../resources/dimens";

interface ParagraphProps {
  style?: StyleProp<TextStyle>;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, style }) => {
  return <Animated.Text style={[styles.text, style]}>{children}</Animated.Text>;
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
