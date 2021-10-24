import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Device } from "react-native-ble-plx";

import DebugEntry from "../elements/DebugEntry";
import {
  decodeBleString,
  getConnectedDevice,
  getDeviceInfoCharacteristics,
} from "../../utils/bluetooth/BleHelper";

const BluetoothDeviceDetails = () => {
  const [device, setDevice] = useState<Device | null>();
  const [modelNumber, setModelNumber] = useState<string | null>();
  const [serialNumber, setSerialNumber] = useState<string | null>();
  const [firmwareRevision, setFirmwareRevision] = useState<string | null>();
  const [manufacturerName, setManufacturerName] = useState<string | null>();

  const readDeviceInfo = useCallback(async () => {
    const {
      modelNumberChar,
      serialNumberChar,
      firmwareRevisionChar,
      manufacturerNameChar,
    } = await getDeviceInfoCharacteristics();
    const values = await Promise.all([
      await getConnectedDevice(),
      decodeBleString((await modelNumberChar?.read())?.value),
      decodeBleString((await serialNumberChar?.read())?.value),
      decodeBleString((await firmwareRevisionChar?.read())?.value),
      decodeBleString((await manufacturerNameChar?.read())?.value),
    ]);
    setDevice(values[0]);
    setModelNumber(values[1]);
    setSerialNumber(values[2]);
    setFirmwareRevision(values[3]);
    setManufacturerName(values[4]);
  }, []);

  useEffect(() => {
    readDeviceInfo();
  }, []);

  return (
    <View>
      <DebugEntry entry="ID" value={device?.id || null} />
      <DebugEntry entry="Model Number" value={modelNumber || null} />
      <DebugEntry entry="Serial Number" value={serialNumber || null} />
      <DebugEntry entry="Firmware Revision" value={firmwareRevision || null} />
      <DebugEntry entry="Manufacturer Name" value={manufacturerName || null} />
    </View>
  );
};

export default BluetoothDeviceDetails;
