import React from "react";
import { View } from "react-native";
import useMonitorBarometerCharacteristic from "../../utils/hooks/useMonitorBarometerCharacteristic";

import useMonitorHumidityCharacteristic from "../../utils/hooks/useMonitorHumidityCharacteristic";
import Paragraph from "../typography/Paragraph";

const BluetoothDeviceDetails = () => {
  const { decodedString: humidity } = useMonitorHumidityCharacteristic();
  const { decodedString: barometer } = useMonitorBarometerCharacteristic();

  return (
    <View>
      <Paragraph>
        {`Temperature (HSensor): ${(
          ((humidity.charCodeAt(0) + humidity.charCodeAt(1) * 256) / 65536) *
            165 -
          40
        ).toFixed(2)}°C`}
      </Paragraph>
      <Paragraph>
        {`Temperature (BSensor): ${(
          (barometer.charCodeAt(0) + barometer.charCodeAt(1) * 256) /
          100
        ).toFixed(2)}°C`}
      </Paragraph>
    </View>
  );
};

export default BluetoothDeviceDetails;
