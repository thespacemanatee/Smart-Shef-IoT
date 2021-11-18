import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import CTAButton from "../../components/elements/CTAButton";
import PancakeDone from "../../components/graphics/pancake/PancakeDone";
import Subheading from "../../components/typography/Subheading";
import { HomeStackParamList } from "../../navigation";
import { SPACING } from "../../resources/dimens";
import HeaderTitleWithBackButton from "../../components/ui/HeaderTitleWithBackButton";
import Title from "../../components/typography/Title";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetCookingLog } from "../../features/settings/settingsSlice";
import PopcornDone from "../../components/graphics/popcorn/PopcornDone";

const GRAPHIC_WIDTH = 246;
const GRAPHIC_HEIGHT = 246;

type PancakeCookingDoneScreenProps = StackScreenProps<
  HomeStackParamList,
  "PancakeCookingProgress"
>;

type DoneTextOptions = {
  [key: string]: string;
};

type DoneGraphicsOptions = {
  [key: string]: JSX.Element;
};

const text: DoneTextOptions = {
  Pancake: "Turn off the fire, stack them up and enjoy!",
  Popcorn: "Turn off the fire, pop them into a bowl and enjoy!",
};

const graphics: DoneGraphicsOptions = {
  Pancake: <PancakeDone />,
  Popcorn: <PopcornDone />,
};

const CookingDoneScreen = ({ navigation }: PancakeCookingDoneScreenProps) => {
  const selectedRecipe = useAppSelector(state => state.recipe.selectedRecipe);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetCookingLog());
    };
  }, [dispatch]);
  if (selectedRecipe) {
    return (
      <View style={styles.screen}>
        <HeaderTitleWithBackButton
          title="Cooking Completed"
          onPress={navigation.goBack}
        />
        <View style={styles.container}>
          <Title>Hooray!</Title>
          <Subheading style={styles.text}>
            {text[selectedRecipe.name]}
          </Subheading>
          <View style={styles.graphicContainer}>
            {graphics[selectedRecipe.name]}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <CTAButton label="Done" onPress={navigation.goBack} />
        </View>
      </View>
    );
  }
  return null;
};

export default CookingDoneScreen;

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
