import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { StackNavigationProp } from "@react-navigation/stack";
import { Checkbox } from "react-native-paper";

import { useAppSelector } from "../../app/hooks";
import Title from "../typography/Title";
import { SPACING } from "../../resources/dimens";
import SmallHeading from "../typography/SmallHeading";
import Paragraph from "../typography/Paragraph";
import CTAButton from "../elements/CTAButton";
import useMQTTClient from "../../utils/hooks/useMQTTClient";
import { HomeStackParamList } from "../../navigation";
import { publishCookingProcess } from "../../service/mqtt";

interface RecipeModalSheetProps {
  sheetRef: React.RefObject<BottomSheet>;
  navigation: StackNavigationProp<HomeStackParamList, "Dashboard">;
}

const RecipeModalSheet = ({ sheetRef, navigation }: RecipeModalSheetProps) => {
  const selectedRecipe = useAppSelector(state => state.recipe.selectedRecipe);
  const [checked, setChecked] = useState(false);

  const client = useMQTTClient();

  const handleChecked = () => {
    setChecked(!checked);
  };

  const handleStartCooking = () => {
    if (checked) {
      navigation.navigate("EquipmentSetup");
      sheetRef.current?.close();
    } else {
      if (client) {
        const payload = {
          recipe: selectedRecipe?.name || "",
          status: "started",
        };
        publishCookingProcess(client, payload);
      }
      navigation.navigate("PancakeCookingProgress");
      sheetRef.current?.close();
    }
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
        <View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={handleChecked}
            />
            <Paragraph>I&apos;m using this device as a sensor!</Paragraph>
          </View>
          <CTAButton label="Start Cooking" onPress={handleStartCooking} />
        </View>
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.spacing_16,
  },
});
