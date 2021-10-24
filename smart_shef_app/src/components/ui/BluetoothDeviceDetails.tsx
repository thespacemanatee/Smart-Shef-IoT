import React from "react";
import { View } from "react-native";
import { Device } from "react-native-ble-plx";

import DebugEntry from "../elements/DebugEntry";

interface BluetoothDeviceDetailsProps {
  device: Device;
}

const BluetoothDeviceDetails = ({ device }: BluetoothDeviceDetailsProps) => {
  return (
    <View>
      <DebugEntry entry="ID" value={device?.id || null} />
      <DebugEntry
        entry="Is Connectable"
        value={device?.isConnectable?.toString() || null}
      />
      <DebugEntry entry="Local Name" value={device?.localName || null} />
      <DebugEntry
        entry="Manufacturer Data"
        value={
          (device?.manufacturerData && btoa(device.manufacturerData)) || null
        }
      />
      <DebugEntry entry="MTU" value={device?.mtu?.toString() || null} />
      <DebugEntry entry="Name" value={device?.name || null} />
      <DebugEntry
        entry="Overflow Service UUIDs"
        value={device?.overflowServiceUUIDs?.toString() || null}
      />
      <DebugEntry entry="RSSI" value={device?.rssi?.toString() || null} />
      <DebugEntry
        entry="Service Data"
        value={JSON.stringify(device?.serviceData) || null}
      />
      <DebugEntry
        entry="Service UUIDs"
        value={device?.serviceUUIDs?.toString() || null}
      />
      <DebugEntry
        entry="Solicited Service UUIDs"
        value={device?.solicitedServiceUUIDs?.toString() || null}
      />
      <DebugEntry
        entry="TX Power Level"
        value={device?.txPowerLevel?.toString() || null}
      />
    </View>
  );
};

export default BluetoothDeviceDetails;
