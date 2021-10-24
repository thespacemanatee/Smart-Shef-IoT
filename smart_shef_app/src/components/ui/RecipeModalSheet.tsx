import React from "react";
import {
  Button,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetSelectedRecipe } from "../../features/recipe/recipeSlice";
import Title from "../typography/Title";
import { SPACING } from "../../resources/dimens";
import SmallHeading from "../typography/SmallHeading";
import Paragraph from "../typography/Paragraph";
import CTAButton from "../elements/CTAButton";

interface RecipeModalSheetProps {
  sheetRef: React.RefObject<BottomSheet>;
}

const RecipeModalSheet = ({ sheetRef }: RecipeModalSheetProps) => {
  const selectedRecipe = useAppSelector(state => state.recipe.selectedRecipe);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(resetSelectedRecipe());
  };

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={["25%", "50%"]}
      enablePanDownToClose
      backdropComponent={props => <BottomSheetBackdrop {...props} />}
      onClose={handleClose}>
      <BottomSheetView
        style={{
          flex: 1,
          justifyContent: "space-between",
          marginHorizontal: SPACING.spacing_16,
          marginBottom: SPACING.spacing_16,
        }}>
        <View>
          <Title>{selectedRecipe?.name}</Title>
          <SmallHeading>Description</SmallHeading>
          <Paragraph>{selectedRecipe?.description}</Paragraph>
          <SmallHeading>Ingredients</SmallHeading>
          <Paragraph>TBD</Paragraph>
          <SmallHeading>Cooking Time</SmallHeading>
          <Paragraph>TBD</Paragraph>
        </View>
        <CTAButton label="Start Cooking" onPress={() => {}} />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default RecipeModalSheet;

const styles = StyleSheet.create({});
