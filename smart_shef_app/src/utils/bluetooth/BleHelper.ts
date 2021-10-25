import React, { createRef } from "react";
import { BleManager, Characteristic, Device } from "react-native-ble-plx";
import { decode as btoa } from "base-64";
import { store } from "../../app/store";
import {
  BAROMETER_CONFIG_CHARACTERISTIC_UUID,
  BAROMETER_DATA_CHARACTERISTIC_UUID,
  BAROMETER_SERVICE_UUID,
  BATTERY_LEVEL_CHARACTERISTIC_UUID,
  BATTERY_SERVICE_UUID,
  DEVICE_INFORMATION_SERVICE_UUID,
  FIRMWARE_REVISION_CHARACTERISTIC_UUID,
  HUMIDITY_CONFIG_CHARACTERISTIC_UUID,
  HUMIDITY_DATA_CHARACTERISTIC_UUID,
  HUMIDITY_NOTIF_CHARACTERISTIC_UUID,
  HUMIDITY_SERVICE_UUID,
  MANUFACTURER_NAME_CHARACTERISTIC_UUID,
  MODEL_NUMBER_CHARACTERISTIC_UUID,
  SERIAL_NUMBER_CHARACTERISTIC_UUID,
} from ".";

export const isReadyRef: React.MutableRefObject<boolean | null> = createRef();

export const bleManagerRef: React.MutableRefObject<BleManager | null> =
  createRef();

export const getConnectedDevice = async (): Promise<Device | null> => {
  const deviceUUID = store.getState().settings.selectedDeviceUUID;
  try {
    if (!deviceUUID) {
      return null;
    }
    const device = await bleManagerRef.current?.devices([deviceUUID]);
    if (device && device.length > 0) {
      return device[0];
    }
  } catch (err) {
    console.error(err);
  }
  return null;
};

export const decodeBleString = (value: string | undefined | null): string => {
  if (!value) {
    return "";
  }
  return btoa(value);
};

export const getDeviceInfoCharacteristics = async () => {
  const modelNumberChar = await getCharacteristic(
    DEVICE_INFORMATION_SERVICE_UUID,
    MODEL_NUMBER_CHARACTERISTIC_UUID,
  );
  const serialNumberChar = await getCharacteristic(
    DEVICE_INFORMATION_SERVICE_UUID,
    SERIAL_NUMBER_CHARACTERISTIC_UUID,
  );
  const firmwareRevisionChar = await getCharacteristic(
    DEVICE_INFORMATION_SERVICE_UUID,
    FIRMWARE_REVISION_CHARACTERISTIC_UUID,
  );
  const manufacturerNameChar = await getCharacteristic(
    DEVICE_INFORMATION_SERVICE_UUID,
    MANUFACTURER_NAME_CHARACTERISTIC_UUID,
  );
  return {
    modelNumberChar,
    serialNumberChar,
    firmwareRevisionChar,
    manufacturerNameChar,
  };
};

export const getBatteryCharacteristics = async () => {
  return getCharacteristic(
    BATTERY_SERVICE_UUID,
    BATTERY_LEVEL_CHARACTERISTIC_UUID,
  );
};

export const getHumidityCharacteristics = async () => {
  const humidityDataChar = await getCharacteristic(
    HUMIDITY_SERVICE_UUID,
    HUMIDITY_DATA_CHARACTERISTIC_UUID,
  );
  const humidityConfigChar = await getCharacteristic(
    HUMIDITY_SERVICE_UUID,
    HUMIDITY_CONFIG_CHARACTERISTIC_UUID,
  );
  return { humidityDataChar, humidityConfigChar };
};

export const getBarometerCharacteristics = async () => {
  const barometerDataChar = await getCharacteristic(
    BAROMETER_SERVICE_UUID,
    BAROMETER_DATA_CHARACTERISTIC_UUID,
  );
  const barometerConfigChar = await getCharacteristic(
    BAROMETER_SERVICE_UUID,
    BAROMETER_CONFIG_CHARACTERISTIC_UUID,
  );
  return { barometerDataChar, barometerConfigChar };
};

const getCharacteristic = async (
  serviceUUID: string,
  characteristicUUID: string,
): Promise<Characteristic | null> => {
  const device = await getConnectedDevice();
  if (device) {
    const services = await (
      await device.discoverAllServicesAndCharacteristics()
    ).services();
    const service = services.find(e => e.uuid === serviceUUID);
    const characteristics = await service?.characteristics();
    return characteristics?.find(e => e.uuid === characteristicUUID) || null;
  }
  return null;
};
