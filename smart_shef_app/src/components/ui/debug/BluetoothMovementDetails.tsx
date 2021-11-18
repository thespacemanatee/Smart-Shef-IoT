import React from "react";
import { View } from "react-native";

import useMonitorMovementCharacteristic from "../../../utils/hooks/useMonitorMovementCharacteristic";
import { getAcceletometerData } from "../../../utils/utils";
import DebugEntry from "../../elements/DebugEntry";

const BluetoothMovementDetails = () => {
  const { decodedString: movement } = useMonitorMovementCharacteristic();
  console.log(getAcceletometerData(movement));

  return (
    <View>
      <DebugEntry entry="Movement (HSensor)" value={`${movement}`} />
    </View>
  );
};

export default BluetoothMovementDetails;
