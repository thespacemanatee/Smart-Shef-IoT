/* eslint-disable no-nested-ternary */
import React from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { Device } from "react-native-ble-plx";
import { ActivityIndicator, Modal, Portal } from "react-native-paper";
import { decode as btoa } from "base-64";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SPACING } from "../../resources/dimens";
import Paragraph from "../typography/Paragraph";
import Title from "../typography/Title";
import ItemSeperatorComponent from "../elements/ItemSeperatorComponent";
import {
  removeSelectedDeviceUUID,
  setSelectedDeviceUUID,
} from "../../features/settings/settingsSlice";

interface BluetoothModalProps {
  visible: boolean;
  onDismiss: () => void;
  loading: boolean;
}

const BluetoothModal = ({
  visible,
  onDismiss,
  loading,
}: BluetoothModalProps) => {
  const devices = useAppSelector(state => state.settings.devices);

  const dispatch = useAppDispatch();

  const handleConnectDevice = async (device: Device) => {
    try {
      if (await device.isConnected()) {
        Alert.alert("Error", `Device ${device.id} is already connected`);
        return;
      }
      const connectedDevice = await device.connect();
      dispatch(setSelectedDeviceUUID(connectedDevice.id));

      Alert.alert("Connected", `Device ${device.id} connected`);
      device.onDisconnected(() => {
        dispatch(removeSelectedDeviceUUID());
        Alert.alert("Disconnected", "Device was disconnected");
      });
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not connect to selected device");
    }
  };

  const renderDevices = ({ item }: { item: Device }) => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          handleConnectDevice(item);
        }}>
        <View style={styles.itemContainer}>
          <Paragraph>{`ID: ${item.id}`}</Paragraph>
          <Paragraph>{`Name: ${item.name}`}</Paragraph>
          <Paragraph>{`RSSI: ${item.rssi}`}</Paragraph>
          <Paragraph>
            {`Manufacturer: ${
              item.manufacturerData && btoa(item.manufacturerData)
            }`}
          </Paragraph>
          <Paragraph>{`Service UUIDs: ${item.serviceUUIDs}`}</Paragraph>
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Title>Devices</Title>
          </View>
          {devices.length > 0 ? (
            <FlatList
              data={devices}
              renderItem={renderDevices}
              ItemSeparatorComponent={() => <ItemSeperatorComponent />}
            />
          ) : loading ? (
            <View style={styles.indicatorContainer}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <View style={styles.indicatorContainer}>
              <Paragraph>No Devices Found</Paragraph>
            </View>
          )}
        </View>
      </Modal>
    </Portal>
  );
};

export default BluetoothModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    margin: SPACING.spacing_32,
    borderRadius: SPACING.spacing_16,
  },
  titleContainer: {
    paddingHorizontal: SPACING.spacing_16,
    paddingTop: SPACING.spacing_16,
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    padding: SPACING.spacing_16,
  },
});
