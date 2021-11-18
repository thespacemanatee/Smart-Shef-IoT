import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import CTAButton from "../components/elements/CTAButton";
import HeaderTitleWithBackButton from "../components/ui/HeaderTitleWithBackButton";
import { HomeStackParamList } from "../navigation";
import { SPACING } from "../resources/dimens";
import useSubscribeCookingProcess from "../utils/hooks/useSubscribeCookingProcess";
import { publishCookingProcess } from "../service/mqtt";
import useMQTTClient from "../utils/hooks/useMQTTClient";
import SensorSyncAnimation from "../components/lottie/SensorSyncAnimation";
import Paragraph from "../components/typography/Paragraph";
import { resetCookingLog } from "../features/settings/settingsSlice";
import AnimatedPopcornCookingProgressBar from "../components/ui/AnimatedPopcornCookingProgressBar";

const BEFORE_FLIPPED_STAGE = 3;
const AFTER_FLIPPED_STAGE = BEFORE_FLIPPED_STAGE + 1;

type CookingProgressScreenProps = StackScreenProps<
  HomeStackParamList,
  "PopcornCookingProgress"
>;

const PopcornCookingProgressScreen = ({
  navigation,
}: CookingProgressScreenProps) => {
  const selectedRecipe = useAppSelector(state => state.recipe.selectedRecipe);
  const [stage, setStage] = useState(0);
  const [step, setStep] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const dispatch = useAppDispatch();
  const client = useMQTTClient();
  const {
    status,
    stage: payloadStage,
    step: payloadStep,
  } = useSubscribeCookingProcess();

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
    if (stage === BEFORE_FLIPPED_STAGE && !flipped) {
      setFlipped(!flipped);
      if (client) {
        const payload = {
          recipe: selectedRecipe?.name || "",
          status: "ready",
          stage,
          step: step + 1,
        };
        publishCookingProcess(client, payload);
      }
    } else if (client) {
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
        {/* <PopcornCookingStageGraphics step={step} /> */}
        <View style={styles.buttonContainer}>
          <CTAButton
            label={step === AFTER_FLIPPED_STAGE ? "Flipped!" : "Next"}
            onPress={handlePressNext}
          />
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
