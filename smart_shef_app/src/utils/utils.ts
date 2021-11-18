import { PermissionsAndroid } from "react-native";

export const requestLocationPermissions = async (): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (!granted) {
      const request = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (request === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
  return true;
};

export const requestRecordAudioPermissions = async (): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    );
    if (!granted) {
      const request = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      if (request === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
  return true;
};

export const getTemperatureFromHumidity = (humidity: string) => {
  return (
    ((humidity.charCodeAt(0) + humidity.charCodeAt(1) * 256) / 65536) * 165 -
      40 || 0
  );
};

export const getTemperatureFromBarometer = (barometer: string) => {
  return (barometer.charCodeAt(0) + barometer.charCodeAt(1) * 256) / 100 || 0;
};

export const getAccelerometerData = (movement: string) => {
  const x = sensorMpu9250AccConvert(
    movement.charCodeAt(6) + movement.charCodeAt(7) * 256,
  );
  const y = sensorMpu9250AccConvert(
    movement.charCodeAt(8) + movement.charCodeAt(9) * 256,
  );
  const z = sensorMpu9250AccConvert(
    movement.charCodeAt(10) + movement.charCodeAt(11) * 256,
  );
  return { x, y, z };
};

const sensorMpu9250AccConvert = (rawData: number) => {
  return (rawData * 1.0) / (32768 / 2);
};
