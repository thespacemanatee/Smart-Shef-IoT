import React from "react";
import { View } from "react-native";

import useMonitorMovementCharacteristic from "../../../utils/hooks/useMonitorMovementCharacteristic";
import { getAccelerometerData } from "../../../utils/utils";
import DebugEntry from "../../elements/DebugEntry";

const BluetoothMovementDetails = () => {
  const { decodedString: movement } = useMonitorMovementCharacteristic();

  return (
    <View>
      <DebugEntry
        entry="Movement (HSensor)"
        value={`x: ${getAccelerometerData(movement).x.toFixed(
          2,
        )}  y: ${getAccelerometerData(movement).y.toFixed(
          2,
        )} z: ${getAccelerometerData(movement).z.toFixed(2)}`}
      />
    </View>
  );
};

export default BluetoothMovementDetails;
