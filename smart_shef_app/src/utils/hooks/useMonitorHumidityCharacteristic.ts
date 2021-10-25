import { useEffect, useState } from "react";
import { Characteristic, Subscription } from "react-native-ble-plx";

import { DISABLE_DATA_COLLECTION, ENABLE_DATA_COLLECTION } from "../bluetooth";
import {
  decodeBleString,
  getHumidityCharacteristics,
} from "../bluetooth/BleHelper";

const useMonitorHumidityCharacteristic = () => {
  const [decodedString, setDecodedString] = useState("");

  useEffect(() => {
    let subscription: Subscription | undefined;
    let characteristic: Characteristic | null;
    const monitor = async () => {
      try {
        const { humidityDataChar, humidityConfigChar } =
          await getHumidityCharacteristics();
        await humidityConfigChar?.writeWithResponse(ENABLE_DATA_COLLECTION);

        characteristic = humidityDataChar;
        subscription = humidityDataChar?.monitor((err, char) => {
          if (err) {
            console.error(JSON.stringify(err));
            return;
          }
          setDecodedString(decodeBleString(char?.value));
        });
      } catch (err) {
        console.error(JSON.stringify(err));
      }
    };
    monitor();

    return () => {
      characteristic?.writeWithResponse(DISABLE_DATA_COLLECTION);
      subscription?.remove();
    };
  }, []);

  return { decodedString };
};

export default useMonitorHumidityCharacteristic;
