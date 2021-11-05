import React from "react";
import { StyleSheet, Text, View } from "react-native";

import FirePan from "../graphics/pancake/FirePan";

interface PanWithTemperatureProps {
  temperature: number;
}

const PanWithTemperature = ({ temperature }: PanWithTemperatureProps) => {
  return (
    <View>
      <Text
        style={[
          styles.temperatureText,
          {
            color: Math.round(temperature) >= 40 ? "#A3CF6B" : "#BCBCBC",
          },
        ]}
      >
        {`${temperature.toFixed(0)}°C`}
      </Text>
      <FirePan />
    </View>
  );
};

export default PanWithTemperature;

const styles = StyleSheet.create({
  temperatureText: {
    fontFamily: "Poppins-Medium",
    fontSize: 96,
  },
});
