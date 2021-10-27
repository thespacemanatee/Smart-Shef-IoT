import React from "react";
import { StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { HomeStackParamList } from "../navigation";
import HeaderTitleWithBackButton from "../components/ui/HeaderTitleWithBackButton";

type EquipmentSetupScreenProps = StackScreenProps<
  HomeStackParamList,
  "EquipmentSetup"
>;

const EquipmentSetupScreen = ({ navigation }: EquipmentSetupScreenProps) => {
  return (
    <View style={styles.screen}>
      <HeaderTitleWithBackButton
        title="Equipment Setup"
        onPress={navigation.goBack}
      />
    </View>
  );
};

export default EquipmentSetupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
