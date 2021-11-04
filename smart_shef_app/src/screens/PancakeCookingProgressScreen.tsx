import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { useAppSelector } from "../app/hooks";
import CTAButton from "../components/elements/CTAButton";
import AnimatedPancakeCookingProgressBar from "../components/ui/AnimatedPancakeCookingProgressBar";
import PancakeCookingStageGraphics from "../components/ui/PancakeCookingStageGraphics";
import HeaderTitleWithBackButton from "../components/ui/HeaderTitleWithBackButton";
import { HomeStackParamList } from "../navigation";
import { SPACING } from "../resources/dimens";
import useSubscribeCookingProcess from "../utils/hooks/useSubscribeCookingProcess";
import { publishCookingProcess } from "../service/mqtt";
import useMQTTClient from "../utils/hooks/useMQTTClient";

const BEFORE_FLIPPED_STAGE = 3;
const AFTER_FLIPPED_STAGE = BEFORE_FLIPPED_STAGE + 1;

type CookingProgressScreenProps = StackScreenProps<
  HomeStackParamList,
  "PancakeCookingProgress"
>;

const PancakeCookingProgressScreen = ({
  navigation,
}: CookingProgressScreenProps) => {
  const selectedRecipe = useAppSelector(state => state.recipe.selectedRecipe);
  const [stage, setStage] = useState(0);
  const [step, setStep] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const client = useMQTTClient();
  const {
    status,
    stage: payloadStage,
    step: payloadStep,
  } = useSubscribeCookingProcess();

  useEffect(() => {
    setStage(payloadStage);
  }, [payloadStage]);

  useEffect(() => {
    setStep(payloadStep);
  }, [payloadStep]);

  useEffect(() => {
    if (status === "done") {
      navigation.goBack();
    }
  }, [navigation, status]);

  const handlePressNext = () => {
    if (stage === BEFORE_FLIPPED_STAGE && !flipped) {
      setFlipped(!flipped);
      if (client) {
        const payload = {
          recipe: selectedRecipe?.name,
          status: "ready",
          stage,
          step: step + 1,
        };
        publishCookingProcess(client, JSON.stringify(payload));
      }
    } else if (client) {
      const payload = {
        recipe: selectedRecipe?.name,
        status: "ready",
        stage: stage + 1,
        step: step + 1,
      };
      publishCookingProcess(client, JSON.stringify(payload));
    }
  };

  return (
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
          label={step === AFTER_FLIPPED_STAGE ? "Flipped!" : "Next"}
          onPress={handlePressNext}
        />
      </View>
    </View>
  );
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
