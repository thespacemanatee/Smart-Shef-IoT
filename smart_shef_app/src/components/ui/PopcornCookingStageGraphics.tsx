import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { SPACING } from "../../resources/dimens";

import FirePan from "../graphics/pancake/FirePan";
import OilPan from "../graphics/pancake/OilPan";
import PopcornNoLid from "../graphics/popcorn/PopcornNoLid";
import PopcornPopped from "../graphics/popcorn/PopcornPopped";
import PopcornWithLid from "../graphics/popcorn/PopcornWithLid";
import Subheading from "../typography/Subheading";

const GRAPHIC_WIDTH = 246;
const GRAPHIC_HEIGHT = 246;

const infos = [
  "Add a thin layer of oil to the pan",
  "Heat up your pan until it is hot enough!",
  "Add 1 ladel of popcorn kernels to the pan",
  "Place the lid over the pan and shake until all kernels have popped!",
  "Bring the pan off the heat",
];

interface PopcornCookingStageGraphicsProps {
  step: number;
}

const PopcornCookingStageGraphics = ({
  step,
}: PopcornCookingStageGraphicsProps) => {
  const graphics = useMemo(
    () => [
      <OilPan />,
      <FirePan />,
      <PopcornNoLid />,
      <PopcornWithLid />,
      <PopcornPopped />,
    ],
    [],
  );

  return (
    <View style={styles.container}>
      <Subheading style={styles.text}>{infos[step]}</Subheading>
      <View style={styles.graphicContainer}>{graphics[step]}</View>
    </View>
  );
};

export default PopcornCookingStageGraphics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    fontFamily: "Poppins-Medium",
    marginHorizontal: SPACING.spacing_32,
    textAlign: "center",
  },
  graphicContainer: {
    width: GRAPHIC_WIDTH,
    height: GRAPHIC_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
});
