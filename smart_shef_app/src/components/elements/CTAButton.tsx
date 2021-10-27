import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from "react-native";

import { SPACING } from "../../resources/dimens";
import Paragraph from "../typography/Paragraph";

interface CTAButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const CTAButton = ({
  label,
  onPress,
  disabled,
  style,
}: CTAButtonProps): JSX.Element => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: disabled ? "grey" : "dodgerblue" },
        style,
      ]}>
      <TouchableNativeFeedback
        useForeground
        onPress={disabled ? undefined : onPress}>
        <View style={styles.button}>
          <Paragraph style={styles.labelText}>{label}</Paragraph>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default CTAButton;

CTAButton.defaultProps = {
  disabled: false,
  style: null,
};

const styles = StyleSheet.create({
  container: {
    height: SPACING.spacing_48,
    borderRadius: SPACING.spacing_16,
    overflow: "hidden",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    color: "white",
  },
});
