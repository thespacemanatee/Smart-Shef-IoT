import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { useAppSelector } from "../app/hooks";
import CTAButton from "../components/elements/CTAButton";
import AnimatedPancakeCookingProgressBar from "../components/ui/AnimatedPancakeCookingProgressBar";
import PancakeCookingStageGraphics from "../components/ui/PancakeCookingStageGraphics";
import HeaderTitleWithBackButton from "../components/ui/HeaderTitleWithBackButton";
import { HomeStackParamList } from "../navigation";
import { SPACING } from "../resources/dimens";

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

  const handlePressNext = () => {
    if (stage === 3 && !flipped) {
      setFlipped(!flipped);
      setStep(step + 1);
    } else {
      setStage(stage + 1);
      setStep(step + 1);
    }
  };

  return (
    <View style={styles.screen}>
      <HeaderTitleWithBackButton
        title={selectedRecipe?.name}
        onPress={navigation.goBack}
      />
      <View style={styles.contentContainer}>
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
    </View>
  );
};

export default PancakeCookingProgressScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  progressBar: {
    margin: SPACING.spacing_16,
  },
  buttonContainer: {
    margin: SPACING.spacing_16,
  },
});
