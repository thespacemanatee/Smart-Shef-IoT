import React from "react";
import { StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import CTAButton from "../components/elements/CTAButton";
import PancakeDone from "../components/graphics/pancake/PancakeDone";
import Subheading from "../components/typography/Subheading";
import { HomeStackParamList } from "../navigation";
import { SPACING } from "../resources/dimens";
import HeaderTitleWithBackButton from "../components/ui/HeaderTitleWithBackButton";
import Title from "../components/typography/Title";

const GRAPHIC_WIDTH = 246;
const GRAPHIC_HEIGHT = 246;

type PancakeCookingDoneScreenProps = StackScreenProps<
  HomeStackParamList,
  "PancakeCookingProgress"
>;

const PancakeCookingDoneScreen = ({
  navigation,
}: PancakeCookingDoneScreenProps) => {
  return (
    <View style={styles.screen}>
      <HeaderTitleWithBackButton
        title="Cooking Completed"
        onPress={navigation.goBack}
      />
      <View style={styles.container}>
        <Title>Hooray!</Title>
        <Subheading style={styles.text}>
          Turn off the fire, stack them up and enjoy!
        </Subheading>
        <View style={styles.graphicContainer}>
          <PancakeDone />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CTAButton label="Done" onPress={navigation.popToTop} />
      </View>
    </View>
  );
};

export default PancakeCookingDoneScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    width: "75%",
  },
  graphicContainer: {
    width: GRAPHIC_WIDTH,
    height: GRAPHIC_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    margin: SPACING.spacing_16,
  },
});
