import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import CountdownTimer from "../graphics/pancake/CountdownTimer";
import FirePan from "../graphics/pancake/FirePan";
import OilPan from "../graphics/pancake/OilPan";
import PancakeFlipping from "../graphics/pancake/PancakeFlipping";
import PancakeNoBubbles from "../graphics/pancake/PancakesNoBubbles";
import PancakeWithBubbles from "../graphics/pancake/PancakeWithBubbles";
import Subheading from "../typography/Subheading";

const GRAPHIC_WIDTH = 246;
const GRAPHIC_HEIGHT = 246;

const infos = [
  "Add a thin layer of oil to the pan",
  "Heat up your pan until it is hot enough!",
  "Add 3 scoops of prepared batter",
  "Wait till you see holes form on the top",
  "Flip now!",
  "Wait for 1 minute",
];

interface PancakeCookingStageGraphicsProps {
  step: number;
}

const PancakeCookingStageGraphics = ({
  step,
}: PancakeCookingStageGraphicsProps) => {
  const graphics = useMemo(
    () => [
      <OilPan />,
      <FirePan />,
      <PancakeNoBubbles />,
      <PancakeWithBubbles />,
      <PancakeFlipping />,
      <CountdownTimer />,
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

export default PancakeCookingStageGraphics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    fontFamily: "Poppins-Medium",
  },
  graphicContainer: {
    width: GRAPHIC_WIDTH,
    height: GRAPHIC_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
});
