import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  UIManager,
  View,
} from "react-native";
import { Device } from "react-native-ble-plx";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CTAButton from "../../components/elements/CTAButton";
import Paragraph from "../../components/typography/Paragraph";
import BluetoothModal from "../../components/ui/BluetoothModal";
import { removeSelectedDeviceUUID } from "../../features/settings/settingsSlice";
import { SPACING } from "../../resources/dimens";
import { getConnectedDevice } from "../../utils/bluetooth/BleHelper";
import BluetoothDeviceDetails from "../../components/ui/BluetoothDeviceDetails";
import Title from "../../components/typography/Title";
import useScanDevices from "../../utils/hooks/useScanDevices";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const BluetoothScreen = () => {
  const connectedDeviceUUID = useAppSelector(
    state => state.settings.selectedDeviceUUID,
  );
  const [visible, setVisible] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [deviceExpanded, setDeviceExpanded] = useState(false);
  const deviceSpinValue = useRef(new Animated.Value(0)).current;

  const deviceRotate = deviceSpinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const deviceSpin = () => {
    Animated.timing(deviceSpinValue, {
      toValue: deviceExpanded ? 0 : 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const dispatch = useAppDispatch();

  const { bluetoothLoading, scanDevices, stopScan } = useScanDevices();

  const handlePressDeviceInfo = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setDeviceExpanded(!deviceExpanded);
    deviceSpin();
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

  useEffect(() => {
    const getDevice = async () => {
      const device = await getConnectedDevice(connectedDeviceUUID);
      if (device) {
        setConnectedDevice(device);
      } else {
        dispatch(removeSelectedDeviceUUID());
        setConnectedDevice(null);
      }
    };
    getDevice();
  }, [connectedDeviceUUID]);

  return (
    <View style={styles.screen}>
      <BluetoothModal
        visible={visible}
        onDismiss={handleDismissModal}
        loading={bluetoothLoading}
      />
      <View style={{ flex: 1 }}>
        {connectedDevice ? (
          <ScrollView>
            <TouchableNativeFeedback onPress={handlePressDeviceInfo}>
              <View style={styles.detailsTitle}>
                <Title>Device Info</Title>
                <Animated.View
                  style={{ transform: [{ rotate: deviceRotate }] }}>
                  <Icon name="chevron-down" size={30} />
                </Animated.View>
              </View>
            </TouchableNativeFeedback>
            {deviceExpanded && (
              <View style={styles.detailsContainer}>
                <BluetoothDeviceDetails device={connectedDevice} />
              </View>
            )}
          </ScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <Paragraph>No Device Connected</Paragraph>
          </View>
        )}
      </View>
      <View style={styles.searchButton}>
        <CTAButton
          label="Search"
          onPress={handleScanDevices}
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
  detailsTitle: {
    flexDirection: "row",
    padding: SPACING.spacing_16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsContainer: {
    padding: SPACING.spacing_16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
