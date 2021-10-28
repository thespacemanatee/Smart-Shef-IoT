import React from "react";
import { View } from "react-native";

import useMonitorBarometerCharacteristic from "../../utils/hooks/useMonitorBarometerCharacteristic";
import useMonitorHumidityCharacteristic from "../../utils/hooks/useMonitorHumidityCharacteristic";
import {
  getTemperatureFromBarometer,
  getTemperatureFromHumidity,
} from "../../utils/utils";
import DebugEntry from "../elements/DebugEntry";
import Paragraph from "../typography/Paragraph";

const BluetoothDeviceDetails = () => {
  const { decodedString: humidity } = useMonitorHumidityCharacteristic();
  const { decodedString: barometer } = useMonitorBarometerCharacteristic();

  return (
    <View>
      <DebugEntry
        entry="Temperature (HSensor)"
        value={`${getTemperatureFromHumidity(humidity).toFixed(2)}°C`}
      />
      <DebugEntry
        entry="Temperature (BSensor)"
        value={`${getTemperatureFromBarometer(barometer).toFixed(2)}°C`}
      />
    </View>
  );
};

export default BluetoothDeviceDetails;
