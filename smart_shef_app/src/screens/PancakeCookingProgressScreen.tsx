import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Camera } from "expo-camera";
import { StackScreenProps } from "@react-navigation/stack";
import { useIsFocused } from "@react-navigation/native";

import { useAppSelector } from "../app/hooks";
import CTAButton from "../components/elements/CTAButton";
import AnimatedPancakeCookingProgressBar from "../components/ui/AnimatedPancakeCookingProgressBar";
import PancakeCookingStageGraphics from "../components/ui/PancakeCookingStageGraphics";
import HeaderTitleWithBackButton from "../components/ui/HeaderTitleWithBackButton";
import { HomeStackParamList } from "../navigation";
import { SPACING } from "../resources/dimens";
import useMQTTClient from "../utils/hooks/useMQTTClient";
import { publishImage } from "../service/mqtt";

type CookingProgressScreenProps = StackScreenProps<
  HomeStackParamList,
  "PancakeCookingProgress"
>;

const PancakeCookingProgressScreen = ({
  navigation,
}: CookingProgressScreenProps) => {
  const selectedRecipe = useAppSelector(state => state.recipe.selectedRecipe);
  const cameraRef = useRef<Camera>(null);
  const [stage, setStage] = useState(0);
  const [step, setStep] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const focused = useIsFocused();
  const client = useMQTTClient();

  const handlePressNext = () => {
    if (stage === 3 && !flipped) {
      setFlipped(!flipped);
      setStep(step + 1);
    } else {
      setStage(stage + 1);
      setStep(step + 1);
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

  useEffect(() => {
    const job = setInterval(() => {
      takePicture();
    }, 2000);

    return () => clearInterval(job);
  }, [takePicture]);

  if (focused) {
    return (
      <Camera
        ref={cameraRef}
        type={Camera.Constants.Type.back}
        ratio="16:9"
        style={styles.screen}
      >
        <View style={styles.screen}>
          <HeaderTitleWithBackButton
            title={selectedRecipe?.name}
            onPress={navigation.goBack}
          />
          <View style={styles.progressBar}>
            <AnimatedPancakeCookingProgressBar stage={stage} />
          </View>
          <PancakeCookingStageGraphics step={step} />
          <View style={styles.buttonContainer}>
            <CTAButton
              label={step === 4 ? "Flipped!" : "Next"}
              onPress={handlePressNext}
            />
          </View>
        </View>
      </Camera>
    );
  }

  return null;
};

export default PancakeCookingProgressScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  progressBar: {
    margin: SPACING.spacing_16,
  },
  buttonContainer: {
    margin: SPACING.spacing_16,
  },
});
