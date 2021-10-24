import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useAppDispatch } from "../../app/hooks";

import CTAButton from "../../components/elements/CTAButton";
import BluetoothModal from "../../components/ui/BluetoothModal";
import { addDevice, resetDevices } from "../../features/settings/settingsSlice";
import { SPACING } from "../../resources/dimens";
import { bleManagerRef } from "../../utils/bluetooth/BleHelper";
import { requestLocationPermissions } from "../../utils/utils";

const BluetoothScreen = () => {
  const [visible, setVisible] = useState(false);
  const [bluetoothLoading, setBluetoothLoading] = useState(false);

  const dispatch = useAppDispatch();

  const showModal = () => setVisible(true);
  const handleDismissModal = () => {
    stopScan();
    setVisible(false);
  };

  const stopScan = () => {
    bleManagerRef.current?.stopDeviceScan();
    setBluetoothLoading(false);
  };

  const scanDevices = async () => {
    dispatch(resetDevices());
    showModal();
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
            dispatch(addDevice(scannedDevice));
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

  return (
    <View style={styles.screen}>
      <BluetoothModal
        visible={visible}
        onDismiss={handleDismissModal}
        loading={bluetoothLoading}
      />
      <View style={styles.searchButton}>
        <CTAButton
          label="Search"
          onPress={scanDevices}
          disabled={bluetoothLoading}
        />
      </View>
    </View>
  );
};

export default BluetoothScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  searchButton: {
    padding: SPACING.spacing_16,
  },
});
