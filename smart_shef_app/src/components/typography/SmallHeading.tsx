import React from "react";
import { StyleProp, TextStyle, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { FONT_SIZE } from "../../resources/dimens";

interface SmallHeadingProps {
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
}

const SmallHeading: React.FC<SmallHeadingProps> = ({
  children,
  numberOfLines,
  style,
}) => {
  return (
    <Animated.Text numberOfLines={numberOfLines} style={[styles.text, style]}>
      {children}
    </Animated.Text>
  );
};

SmallHeading.defaultProps = {
  numberOfLines: undefined,
  style: undefined,
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-Light",
    fontSize: FONT_SIZE.small,
    color: "black",
  },
});

export default SmallHeading;
