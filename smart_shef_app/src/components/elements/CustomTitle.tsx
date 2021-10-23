import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { Title } from "react-native-paper";

interface CustomTitleProps {
  style?: StyleProp<TextStyle>;
}

const CustomTitle: React.FC<CustomTitleProps> = ({ children, style }) => {
  return (
    <Title style={[style, { fontFamily: "Poppins-SemiBold" }]}>
      {children}
    </Title>
  );
};

CustomTitle.defaultProps = {
  style: undefined,
};

export default CustomTitle;
