import React from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { StackNavigationProp } from "@react-navigation/stack";

import { useAppSelector } from "../../app/hooks";
import Title from "../typography/Title";
import { SPACING } from "../../resources/dimens";
import SmallHeading from "../typography/SmallHeading";
import Paragraph from "../typography/Paragraph";
import CTAButton from "../elements/CTAButton";
import useMQTTClient from "../../utils/hooks/useMQTTClient";
import { HomeStackParamList } from "../../navigation";

interface RecipeModalSheetProps {
  sheetRef: React.RefObject<BottomSheet>;
  navigation: StackNavigationProp<HomeStackParamList, "Dashboard">;
}

const RecipeModalSheet = ({ sheetRef, navigation }: RecipeModalSheetProps) => {
  const selectedRecipe = useAppSelector(state => state.recipe.selectedRecipe);

  const mqttClient = useMQTTClient();

  const handleStartCooking = () => {
    mqttClient?.publish(
      "smartshef/1",
      `Start cooking ${selectedRecipe?.name}!`,
      1,
      false,
      false,
    );
    navigation.navigate("EquipmentSetup");
    sheetRef.current?.close();
  };

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={["25%", "50%"]}
      enablePanDownToClose
      // eslint-disable-next-line react/jsx-props-no-spreading
      backdropComponent={props => <BottomSheetBackdrop {...props} />}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View>
          <Title>{selectedRecipe?.name}</Title>
          <SmallHeading>Description</SmallHeading>
          <Paragraph>{selectedRecipe?.description}</Paragraph>
          <SmallHeading>Ingredients</SmallHeading>
          <Paragraph>TBD</Paragraph>
          <SmallHeading>Cooking Time</SmallHeading>
          <Paragraph>TBD</Paragraph>
        </View>
        <CTAButton label="Start Cooking" onPress={handleStartCooking} />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default RecipeModalSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: SPACING.spacing_16,
    marginBottom: SPACING.spacing_16,
  },
});
