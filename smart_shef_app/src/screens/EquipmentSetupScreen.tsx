import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  LayoutAnimation,
  StyleSheet,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";

import { HomeStackParamList } from "../navigation";
import HeaderTitleWithBackButton from "../components/ui/HeaderTitleWithBackButton";
import Paragraph from "../components/typography/Paragraph";
import { SPACING } from "../resources/dimens";
import CTAButton from "../components/elements/CTAButton";
import {
  publishCookingProcess,
  publishImage,
  publishTemperature,
} from "../service/mqtt";
import useMQTTClient from "../utils/hooks/useMQTTClient";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import useSubscribeCookingProcess from "../utils/hooks/useSubscribeCookingProcess";
import { resetCookingLog } from "../features/settings/settingsSlice";
import useMonitorHumidityCharacteristic from "../utils/hooks/useMonitorHumidityCharacteristic";
import { getTemperatureFromHumidity } from "../utils/utils";

const CAMERA_WIDTH = Dimensions.get("window").width;
const CAMERA_HEIGHT = (CAMERA_WIDTH / 3) * 4;
const PUBLISH_INTERVAL = 5000;

type EquipmentSetupScreenProps = StackScreenProps<
  HomeStackParamList,
  "EquipmentSetup"
>;

const EquipmentSetupScreen = ({ navigation }: EquipmentSetupScreenProps) => {
  const selectedRecipe = useAppSelector(state => state.recipe.selectedRecipe);
  const [hasPermission, setHasPermission] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [publishJob, setPublishJob] = useState<NodeJS.Timeout>();
  const cameraRef = useRef<Camera>(null);

  const focused = useIsFocused();
  const dispatch = useAppDispatch();
  const client = useMQTTClient();
  const { decodedString: humidity } = useMonitorHumidityCharacteristic();
  const { status, stage } = useSubscribeCookingProcess();

  useEffect(() => {
    if (status === "done") {
      navigation.goBack();
    }
    return () => {
      dispatch(resetCookingLog());
    };
  }, [dispatch, navigation, status]);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus === "granted");
    })();
  }, []);

  const handlePressNext = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setNextStep(!nextStep);
  };

  const handlePressReady = () => {
    const processPayload = {
      recipe: selectedRecipe?.name || "",
      status: "ready",
      stage: 0,
      step: 0,
    };
    if (client) {
      console.log("Publishing ready to client");
      publishCookingProcess(client, processPayload);
    }
    setPublishJob(
      setInterval(() => {
        takePicture();
      }, PUBLISH_INTERVAL),
    );
  };

  const handlePressDone = () => {
    if (publishJob) {
      clearInterval(publishJob);
    }
    const payload = {
      recipe: selectedRecipe?.name || "",
      status: "done",
    };
    if (client) {
      console.log("Publishing done to client");
      publishCookingProcess(client, payload);
    }
  };

  const takePicture = useCallback(async () => {
    try {
      const res = await cameraRef.current?.takePictureAsync({
        base64: true,
      });
      if (res?.base64 && client) {
        publishImage(client, res.base64);
      }
    } catch (err) {
      console.error(err);
    }
  }, [client]);

  const takeTemperature = useCallback(
    (hum: string) => {
      const tempPayload = {
        temperature: getTemperatureFromHumidity(hum).toFixed(2),
        timestamp: Date.now(),
      };

      if (client) {
        publishTemperature(client, tempPayload);
      }
    },
    [client],
  );

  useEffect(() => {
    if (status === "ready" && stage === 1) {
      takeTemperature(humidity);
    }
  }, [humidity, stage, status, takeTemperature]);

  useEffect(() => {
    return () => {
      if (publishJob) {
        clearInterval(publishJob);
      }
    };
  }, [publishJob]);

  if (nextStep) {
    return (
      <View style={styles.screen}>
        <HeaderTitleWithBackButton
          title="Equipment Setup"
          onPress={navigation.goBack}
        />
        {hasPermission && focused ? (
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            ratio="16:9"
            ref={cameraRef}
          >
            <View style={styles.cameraContent}>
              <View style={styles.hintContainer}>
                <Paragraph style={styles.hintText}>
                  Ensure that the base of your pan can be seen in the camera.
                </Paragraph>
              </View>
              <View style={styles.buttonContainer}>
                <CTAButton
                  label={status === "ready" ? "Done" : "I'm Ready"}
                  onPress={
                    status === "ready" ? handlePressDone : handlePressReady
                  }
                />
              </View>
            </View>
          </Camera>
        ) : (
          <View style={styles.emptyContainer}>
            <Paragraph>Camera permissions not granted</Paragraph>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <HeaderTitleWithBackButton
        title="Equipment Setup"
        onPress={navigation.goBack}
      />
      <View style={styles.camera}>
        <View style={styles.nextHintContainer}>
          <Paragraph>
            Ensure that your SensorTag is turned on and placed near your pan.
          </Paragraph>
        </View>
        <View style={styles.image}>
          <Image
            // eslint-disable-next-line global-require
            source={require("../../assets/images/sensortag.jpeg")}
            width={CAMERA_WIDTH}
            height={CAMERA_HEIGHT}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CTAButton label="Next" onPress={handlePressNext} />
        </View>
      </View>
    </View>
  );
};

export default EquipmentSetupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  nextHintContainer: {
    margin: SPACING.spacing_16,
    padding: SPACING.spacing_16,
  },
  camera: {
    flex: 1,
  },
  cameraContent: {
    justifyContent: "space-between",
    flex: 1,
  },
  hintContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.54)",
    margin: SPACING.spacing_16,
    padding: SPACING.spacing_16,
    borderRadius: SPACING.spacing_16,
  },
  hintText: {
    color: "white",
  },
  buttonContainer: {
    margin: SPACING.spacing_16,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
