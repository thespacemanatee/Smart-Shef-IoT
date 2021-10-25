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
        {`Humidity: ${
          humidity.charCodeAt(0) + humidity.charCodeAt(1)
        }, Barometer: ${barometer.charCodeAt(0) + barometer.charCodeAt(1)}`}
      </Paragraph>
    </View>
  );
};

export default BluetoothDeviceDetails;
