import { PermissionsAndroid } from "react-native";

// eslint-disable-next-line import/prefer-default-export
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

export const getTemperatureFromHumidity = (humidity: string) => {
  return (
    ((humidity.charCodeAt(0) + humidity.charCodeAt(1) * 256) / 65536) * 165 -
      40 || 0
  );
};

export const getTemperatureFromBarometer = (barometer: string) => {
  return (barometer.charCodeAt(0) + barometer.charCodeAt(1) * 256) / 100 || 0;
};
