import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { SPACING } from "../../resources/dimens";
import Title from "../typography/Title";

interface DebugSectionTitle {
  label: string;
  subtitleComponent?: () => Element;
}

const DebugSection: React.FC<DebugSectionTitle> = ({
  label,
  subtitleComponent,
  children,
}): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const spin = () => {
    Animated.timing(spinValue, {
      toValue: expanded ? 0 : 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const handlePressLabel = () => {
    setExpanded(!expanded);
    spin();
  };

  return (
    <View>
      <TouchableNativeFeedback onPress={handlePressLabel}>
        <View style={styles.detailsTitle}>
          <View>
            <Title>{label}</Title>
            {subtitleComponent && subtitleComponent()}
          </View>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Icon name="chevron-down" size={30} />
          </Animated.View>
        </View>
      </TouchableNativeFeedback>
      {expanded && <View style={styles.detailsContainer}>{children}</View>}
    </View>
  );
};

DebugSection.defaultProps = {
  subtitleComponent: undefined,
};

export default DebugSection;

const styles = StyleSheet.create({
  detailsTitle: {
    flexDirection: "row",
    padding: SPACING.spacing_16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsContainer: {
    paddingHorizontal: SPACING.spacing_16,
  },
});
