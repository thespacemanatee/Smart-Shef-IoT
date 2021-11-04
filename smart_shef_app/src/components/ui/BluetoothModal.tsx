/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { Device, Subscription } from "react-native-ble-plx";
import { ActivityIndicator } from "react-native-paper";
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
  onRefresh: () => void;
  loading: boolean;
}

const BluetoothModal = ({
  visible,
  onDismiss,
  onRefresh,
  loading,
}: BluetoothModalProps) => {
  const devices = useAppSelector(state => state.settings.devices);
  const [subscription, setSubscription] = useState<Subscription>();

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
      onDismiss();

      setSubscription(
        device.onDisconnected(() => {
          dispatch(removeSelectedDeviceUUID());
          Alert.alert("Disconnected", "Device was disconnected");
        }),
      );
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not connect to selected device");
    }
  };

  useEffect(() => {
    return () => subscription?.remove();
  }, [subscription]);

  const renderDevices = ({ item }: { item: Device }) => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          handleConnectDevice(item);
        }}
      >
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
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onDismiss}
    >
      <View style={styles.backdrop}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Title>Devices</Title>
          </View>
          <FlatList
            contentContainerStyle={styles.listContentContainer}
            data={devices}
            renderItem={renderDevices}
            ItemSeparatorComponent={() => <ItemSeperatorComponent />}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
            ListEmptyComponent={() => (
              <View style={styles.indicatorContainer}>
                <Paragraph>No Devices Found</Paragraph>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default BluetoothModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    margin: SPACING.spacing_16,
    borderRadius: SPACING.spacing_16,
  },
  titleContainer: {
    paddingHorizontal: SPACING.spacing_16,
    paddingTop: SPACING.spacing_16,
  },
  listContentContainer: {
    flexGrow: 1,
  },
  indicatorContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    padding: SPACING.spacing_16,
  },
});
