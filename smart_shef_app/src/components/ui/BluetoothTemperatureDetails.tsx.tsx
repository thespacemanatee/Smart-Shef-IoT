import React from "react";
import { View } from "react-native";

import useMonitorBarometerCharacteristic from "../../utils/hooks/useMonitorBarometerCharacteristic";
import useMonitorHumidityCharacteristic from "../../utils/hooks/useMonitorHumidityCharacteristic";
import {
  getTemperatureFromBarometer,
  getTemperatureFromHumidity,
} from "../../utils/utils";
import Paragraph from "../typography/Paragraph";

const BluetoothDeviceDetails = () => {
  const { decodedString: humidity } = useMonitorHumidityCharacteristic();
  const { decodedString: barometer } = useMonitorBarometerCharacteristic();

  return (
    <View>
      <Paragraph>
        {`Temperature (HSensor): ${getTemperatureFromHumidity(humidity).toFixed(
          2,
        )}°C`}
      </Paragraph>
      <Paragraph>
        {`Temperature (BSensor): ${getTemperatureFromBarometer(
          barometer,
        ).toFixed(2)}°C`}
      </Paragraph>
    </View>
  );
};

export default BluetoothDeviceDetails;
