import { useState } from "react";
import { Alert } from "react-native";

import { store } from "../../app/store";
import { addDevice, resetDevices } from "../../features/settings/settingsSlice";
import { bleManagerRef } from "../bluetooth/BleHelper";
import { requestLocationPermissions } from "../utils";

const useScanDevices = () => {
  const [bluetoothLoading, setBluetoothLoading] = useState(false);

  const stopScan = () => {
    bleManagerRef.current?.stopDeviceScan();
    setBluetoothLoading(false);
  };

  const scanDevices = async () => {
    store.dispatch(resetDevices());
    setBluetoothLoading(true);
    const granted = await requestLocationPermissions();
    if (granted) {
      bleManagerRef.current?.startDeviceScan(
        null,
        null,
        (error, scannedDevice) => {
          const scanTimeout = setTimeout(() => {
            stopScan();
          }, 5000);
          if (error) {
            console.error(error);
            clearTimeout(scanTimeout);
            stopScan();
            Alert.alert("Error", "Could not scan for bluetooth devices");
          }
          if (scannedDevice) {
            store.dispatch(addDevice(scannedDevice));
          }
        },
      );
    } else {
      setBluetoothLoading(false);
      Alert.alert("Error", "Bluetooth permissions not granted", [
        { text: "OK" },
        { text: "Try again", onPress: scanDevices },
      ]);
    }
  };

  return { bluetoothLoading, scanDevices, stopScan };
};

export default useScanDevices;
