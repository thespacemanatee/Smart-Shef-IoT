import { useEffect, useState } from "react";
import { Characteristic, Subscription } from "react-native-ble-plx";

import { MOVEMENT_CONFIG, MOVEMENT_DISABLE, SENSOR_PERIOD } from "../bluetooth";
import {
  decodeBleString,
  getMovementCharacteristics,
} from "../bluetooth/BleHelper";

const useMonitorMovementCharacteristic = () => {
  const [decodedString, setDecodedString] = useState("");

  useEffect(() => {
    let subscription: Subscription | undefined;
    let characteristic: Characteristic | null;
    const monitor = async () => {
      try {
        const { movementDataChar, movementConfigChar, movementPeriodChar } =
          await getMovementCharacteristics();
        await movementConfigChar?.writeWithResponse(MOVEMENT_CONFIG);

        characteristic = movementConfigChar;
        subscription = movementDataChar?.monitor((err, char) => {
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
      try {
        (async () => {
          await characteristic?.writeWithResponse(MOVEMENT_DISABLE);
          subscription?.remove();
        })();
      } catch (err) {
        console.error(JSON.stringify(err));
      }
    };
  }, []);

  return { decodedString };
};

export default useMonitorMovementCharacteristic;
