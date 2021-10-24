import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetSelectedRecipe } from "../../features/recipe/recipeSlice";

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
      <View>
        <Text>{selectedRecipe?.name}</Text>
      </View>
    </BottomSheet>
  );
};

export default RecipeModalSheet;

const styles = StyleSheet.create({});
