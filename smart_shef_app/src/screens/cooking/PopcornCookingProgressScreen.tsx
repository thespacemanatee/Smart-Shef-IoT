import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackActions } from "@react-navigation/native";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CTAButton from "../../components/elements/CTAButton";
import HeaderTitleWithBackButton from "../../components/ui/HeaderTitleWithBackButton";
import { HomeStackParamList } from "../../navigation";
import { SPACING } from "../../resources/dimens";
import useSubscribeCookingProcess from "../../utils/hooks/useSubscribeCookingProcess";
import { publishCookingProcess } from "../../service/mqtt";
import useMQTTClient from "../../utils/hooks/useMQTTClient";
import SensorSyncAnimation from "../../components/lottie/SensorSyncAnimation";
import Paragraph from "../../components/typography/Paragraph";
import { resetCookingLog } from "../../features/settings/settingsSlice";
import AnimatedPopcornCookingProgressBar from "../../components/ui/AnimatedPopcornCookingProgressBar";
import PopcornCookingStageGraphics from "../../components/ui/PopcornCookingStageGraphics";
import useMonitorMovementCharacteristic from "../../utils/hooks/useMonitorMovementCharacteristic";
import { getAccelerometerData } from "../../utils/utils";

type CookingProgressScreenProps = StackScreenProps<
  HomeStackParamList,
  "PopcornCookingProgress"
>;

const NUM_STAGES = 4;

const PopcornCookingProgressScreen = ({
  navigation,
}: CookingProgressScreenProps) => {
  const selectedRecipe = useAppSelector(state => state.recipe.selectedRecipe);
  const [stage, setStage] = useState(0);
  const [step, setStep] = useState(0);
  const [shakenValue, setShakenValue] = useState(0);

  const dispatch = useAppDispatch();
  const client = useMQTTClient();
  const {
    status,
    stage: payloadStage,
    step: payloadStep,
  } = useSubscribeCookingProcess();
  const { decodedString: movement } = useMonitorMovementCharacteristic();

  useEffect(() => {
    if (stage === 3) {
      const { x, y, z } = getAccelerometerData(movement);
      setShakenValue(shakenValue + x + y + z);
      console.log(shakenValue);
      if (shakenValue > 25) {
        setStage(stage + 1);
        setStep(step + 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movement, stage]);

  useEffect(() => {
    if (payloadStage > stage) {
      setStage(payloadStage);
    }
  }, [payloadStage, stage]);

  useEffect(() => {
    if (payloadStep > step) {
      setStep(payloadStep);
    }
  }, [payloadStep, step]);

  useEffect(() => {
    if (status === "done") {
      navigation.goBack();
    }
    return () => {
      dispatch(resetCookingLog());
    };
  }, [dispatch, navigation, status]);

  const handlePressNext = () => {
    if (stage === NUM_STAGES) {
      navigation.dispatch(StackActions.replace("PancakeCookingDone"));
      return;
    }
    if (client) {
      const payload = {
        recipe: selectedRecipe?.name || "",
        status: "ready",
        stage: stage + 1,
        step: step + 1,
      };
      publishCookingProcess(client, payload);
    }
  };

  if (status === "ready") {
    return (
      <View style={styles.screen}>
        <HeaderTitleWithBackButton
          title={selectedRecipe?.name}
          onPress={navigation.goBack}
        />
        <View style={styles.progressBar}>
          <AnimatedPopcornCookingProgressBar stage={stage} />
        </View>
        <PopcornCookingStageGraphics step={step} />
        <View style={styles.buttonContainer}>
          <CTAButton label="Next" onPress={handlePressNext} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <HeaderTitleWithBackButton onPress={navigation.goBack} />
      <View style={styles.syncingContainer}>
        <SensorSyncAnimation />
        <Paragraph>Waiting for sensor connection...</Paragraph>
      </View>
    </View>
  );
};

export default PopcornCookingProgressScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  syncingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  progressBar: {
    margin: SPACING.spacing_16,
  },
  buttonContainer: {
    margin: SPACING.spacing_16,
  },
});
