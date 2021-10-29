import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  LayoutAnimation,
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
  initialExpanded?: boolean;
}

const DebugSection: React.FC<DebugSectionTitle> = ({
  label,
  subtitleComponent,
  initialExpanded,
  children,
}): JSX.Element => {
  const [expanded, setExpanded] = useState(initialExpanded);
  const spinValue = useRef(new Animated.Value(initialExpanded ? 1 : 0)).current;

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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
    spin();
  };

  return (
    <View style={{ flex: expanded ? 1 : 0 }}>
      <TouchableNativeFeedback onPress={handlePressLabel}>
        <View style={styles.detailsTitle}>
          <View style={styles.titleContainer}>
            <Title>{label}</Title>
            {subtitleComponent && expanded && subtitleComponent()}
          </View>
          <Animated.View style={[styles.icon, { transform: [{ rotate }] }]}>
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
  initialExpanded: false,
};

export default DebugSection;

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailsTitle: {
    flexDirection: "row",
    padding: SPACING.spacing_16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: SPACING.spacing_16,
  },
  icon: {
    marginStart: SPACING.spacing_16,
  },
});
