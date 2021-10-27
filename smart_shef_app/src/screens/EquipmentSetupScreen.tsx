import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  LayoutAnimation,
  StyleSheet,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useIsFocused } from "@react-navigation/core";
import { Camera } from "expo-camera";

import { HomeStackParamList } from "../navigation";
import HeaderTitleWithBackButton from "../components/ui/HeaderTitleWithBackButton";
import Paragraph from "../components/typography/Paragraph";
import { SPACING } from "../resources/dimens";
import CTAButton from "../components/elements/CTAButton";

const CAMERA_WIDTH = Dimensions.get("window").width;
const CAMERA_HEIGHT = (CAMERA_WIDTH / 3) * 4;

type EquipmentSetupScreenProps = StackScreenProps<
  HomeStackParamList,
  "EquipmentSetup"
>;

const EquipmentSetupScreen = ({ navigation }: EquipmentSetupScreenProps) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const focused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handlePressNext = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setNextStep(!nextStep);
  };

  if (nextStep) {
    return (
      <View style={styles.screen}>
        <HeaderTitleWithBackButton
          title="Equipment Setup"
          onPress={navigation.goBack}
        />
        <View style={styles.imageContainer}>
          <View style={styles.spacer}>
            <Paragraph>
              Ensure that your SensorTag is turned on and placed near your pan.
            </Paragraph>
          </View>
          <View style={styles.camera}>
            <View style={styles.image}>
              <Image
                // eslint-disable-next-line global-require
                source={require("../../assets/images/sensortag.jpeg")}
                width={CAMERA_WIDTH}
                height={CAMERA_HEIGHT}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <CTAButton label="I'm Ready!" onPress={() => {}} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <HeaderTitleWithBackButton
        title="Equipment Setup"
        onPress={navigation.goBack}
      />
      {hasPermission && focused ? (
        <View style={styles.cameraContainer}>
          <View style={styles.spacer} />
          <Camera style={styles.camera} type={Camera.Constants.Type.back}>
            <View style={styles.hintContainer}>
              <Paragraph style={styles.hintText}>
                Ensure that the base of your pan can be seen in the camera.
              </Paragraph>
            </View>
          </Camera>
          <View style={styles.buttonContainer}>
            <CTAButton label="Next" onPress={handlePressNext} />
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Paragraph>Camera permissions not granted</Paragraph>
        </View>
      )}
    </View>
  );
};

export default EquipmentSetupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  spacer: {
    flex: 1,
    paddingHorizontal: SPACING.spacing_16,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "black",
  },
  camera: {
    width: CAMERA_WIDTH,
    height: CAMERA_HEIGHT,
    alignItems: "center",
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
    flex: 1,
    paddingHorizontal: SPACING.spacing_16,
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
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
