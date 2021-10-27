import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { useAppSelector } from "../app/hooks";
import CTAButton from "../components/elements/CTAButton";
import AnimatedCookingProgressBar from "../components/ui/AnimatedCookingProgressBar";
import CookingStageGraphics from "../components/ui/CookingStageGraphics";
import HeaderTitleWithBackButton from "../components/ui/HeaderTitleWithBackButton";
import { HomeStackParamList } from "../navigation";
import { SPACING } from "../resources/dimens";

type CookingProgressScreenProps = StackScreenProps<
  HomeStackParamList,
  "CookingProgress"
>;

const CookingProgressScreen = ({ navigation }: CookingProgressScreenProps) => {
  const selectedRecipe = useAppSelector(state => state.recipe.selectedRecipe);
  const [stage, setStage] = useState(0);

  const handlePressNext = () => {
    setStage(stage + 1);
  };

  return (
    <View style={styles.screen}>
      <HeaderTitleWithBackButton
        title={selectedRecipe?.name}
        onPress={navigation.goBack}
      />
      <View style={styles.contentContainer}>
        <View style={styles.progressBar}>
          <AnimatedCookingProgressBar stage={stage} />
        </View>
        <CookingStageGraphics stage={stage} />
        <View style={styles.buttonContainer}>
          <CTAButton label="Next" onPress={handlePressNext} />
        </View>
      </View>
    </View>
  );
};

export default CookingProgressScreen;

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
