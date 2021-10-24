import React, { createRef } from "react";
import { BleManager, Characteristic } from "react-native-ble-plx";
import { decode as btoa } from "base-64";

export const isReadyRef: React.MutableRefObject<boolean | null> = createRef();

export const bleManagerRef: React.MutableRefObject<BleManager | null> =
  createRef();

export const decodeBleString = (value: string | undefined | null): string => {
  if (!value) {
    return "";
  }
  return btoa(value);
};

const getCharacteristic = async (
  serviceUUID: string,
  deviceUUID: string,
  characteristicUUID: string,
): Promise<Characteristic | undefined> => {
  let characteristic: Characteristic | undefined;
  const device = await bleManagerRef.current?.devices([deviceUUID]);
  if (device && device.length > 0) {
    const services = await (
      await device[0].discoverAllServicesAndCharacteristics()
    ).services();
    const service = services.find(e => e.uuid === serviceUUID);
    const characteristics = await service?.characteristics();
    characteristic = characteristics?.find(e => e.uuid === characteristicUUID);
  }
  return characteristic;
};
