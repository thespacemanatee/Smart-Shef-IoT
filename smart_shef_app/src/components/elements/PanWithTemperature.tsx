import React from "react";
import { StyleSheet, Text, View } from "react-native";

import useMonitorHumidityCharacteristic from "../../utils/hooks/useMonitorHumidityCharacteristic";
import { getTemperatureFromHumidity } from "../../utils/utils";
import FirePan from "../graphics/FirePan";

const PanWithTemperature = () => {
  const { decodedString } = useMonitorHumidityCharacteristic();

  return (
    <View>
      <Text
        style={[
          styles.temperatureText,
          {
            color:
              Math.round(getTemperatureFromHumidity(decodedString)) >= 40
                ? "#A3CF6B"
                : "#BCBCBC",
          },
        ]}
      >
        {`${getTemperatureFromHumidity(decodedString).toFixed(0)}°C`}
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
