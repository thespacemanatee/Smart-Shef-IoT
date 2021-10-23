import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { Paragraph } from "react-native-paper";

interface CustomParagraphProps {
  style?: StyleProp<TextStyle>;
}

const CustomParagraph: React.FC<CustomParagraphProps> = ({
  children,
  style,
}) => {
  return (
    <Paragraph style={[style, { fontFamily: "Poppins-Regular" }]}>
      {children}
    </Paragraph>
  );
};

CustomParagraph.defaultProps = {
  style: undefined,
};

export default CustomParagraph;
