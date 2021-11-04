import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

const SensorSyncAnimation = () => {
  return (
    <LottieView
      // eslint-disable-next-line global-require
      source={require("../../../assets/lottie/sensor-device-sync.json")}
      autoPlay
      loop
      style={styles.animation}
    />
  );
};

export default SensorSyncAnimation;

const styles = StyleSheet.create({
  animation: {
    height: width / 1.5,
  },
});
