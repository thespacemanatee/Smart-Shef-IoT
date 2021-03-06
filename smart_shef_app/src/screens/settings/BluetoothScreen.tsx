import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Device } from "react-native-ble-plx";

import { useAppDispatch } from "../../app/hooks";
import CTAButton from "../../components/elements/CTAButton";
import Paragraph from "../../components/typography/Paragraph";
import BluetoothModal from "../../components/ui/BluetoothModal";
import { removeSelectedDeviceUUID } from "../../features/settings/settingsSlice";
import { SPACING } from "../../resources/dimens";
import {
  getBatteryCharacteristics,
  getConnectedDevice,
} from "../../utils/bluetooth/BleHelper";
import BluetoothDeviceDetails from "../../components/ui/debug/BluetoothDeviceDetails";
import useScanDevices from "../../utils/hooks/useScanDevices";
import { store } from "../../app/store";
import DebugSection from "../../components/elements/DebugSection";
import BluetoothTemperatureDetails from "../../components/ui/debug/BluetoothTemperatureDetails.tsx";
import BluetoothMovementDetails from "../../components/ui/debug/BluetoothMovementDetails";

const BluetoothScreen = () => {
  const [visible, setVisible] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  const dispatch = useAppDispatch();

  const { bluetoothLoading, scanDevices, stopScan } = useScanDevices();

  const handleDisconnectDevice = async () => {
    try {
      await connectedDevice?.cancelConnection();
    } catch (err) {
      console.error(err);
    }
  };

  const showModal = () => setVisible(true);

  const handleDismissModal = () => {
    stopScan();
    setVisible(false);
  };

  const handleScanDevices = async () => {
    showModal();
    scanDevices();
  };

  const readBatteryCharacteristic = async () => {
    const batteryChar = await getBatteryCharacteristics();
    return (await batteryChar?.read())?.value?.charCodeAt(0);
  };

  useEffect(() => {
    const getDevice = async () => {
      const device = await getConnectedDevice();
      if (device) {
        setConnectedDevice(device);
        setBatteryLevel((await readBatteryCharacteristic()) || 0);
      } else {
        dispatch(removeSelectedDeviceUUID());
        setConnectedDevice(null);
      }
    };

    let currentValue: string | null;
    const unsubscribe = store.subscribe(() => {
      const previousValue = currentValue;
      currentValue = store.getState().settings.selectedDeviceUUID;
      if (previousValue !== currentValue) {
        getDevice();
      }
    });
    getDevice();
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <BluetoothModal
        visible={visible}
        onDismiss={handleDismissModal}
        onRefresh={scanDevices}
        loading={bluetoothLoading}
      />
      <View style={styles.screen}>
        {connectedDevice ? (
          <ScrollView>
            <DebugSection
              label="Device Info"
              subtitleComponent={() => (
                <Paragraph>{`Battery Level: ${batteryLevel}%`}</Paragraph>
              )}
              initialExpanded
            >
              <BluetoothDeviceDetails />
            </DebugSection>
            <DebugSection label="Temperature">
              <BluetoothTemperatureDetails />
            </DebugSection>
            <DebugSection label="Movement">
              <BluetoothMovementDetails />
            </DebugSection>
          </ScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <Paragraph>No Device Connected</Paragraph>
          </View>
        )}
      </View>
      <View style={styles.searchButtonContainer}>
        <CTAButton
          label="Search"
          onPress={handleScanDevices}
          disabled={bluetoothLoading}
          style={styles.button}
        />
        <CTAButton
          label="Disconnect"
          onPress={handleDisconnectDevice}
          disabled={!connectedDevice}
          style={styles.button}
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
  searchButtonContainer: {
    padding: SPACING.spacing_16,
    flexDirection: "row",
  },
  button: {
    flex: 1,
    marginHorizontal: SPACING.spacing_4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
