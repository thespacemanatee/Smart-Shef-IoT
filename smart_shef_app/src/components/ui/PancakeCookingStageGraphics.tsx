import React from "react";
import { StyleSheet, View } from "react-native";

import PanWithTemperature from "../elements/PanWithTemperature";
import OilPan from "../graphics/OilPan";
import PancakeFlipping from "../graphics/PancakeFlipping";
import PancakeNoBubbles from "../graphics/PancakesNoBubbles";
import PancakeWithBubbles from "../graphics/PancakeWithBubbles";
import Subheading from "../typography/Subheading";

const WIDTH = 246;
const HEIGHT = 246;

const info = [
  "Add a thin layer of oil to the pan",
  "Heat your pan to 40°C",
  "Add 3 scoops of prepared batter",
  "Wait till you see holes form on the top",
  "Flip now!",
  "Wait for 1 minute",
  "Time’s Up!",
];

const graphic = [
  <OilPan />,
  <PanWithTemperature />,
  <PancakeNoBubbles />,
  <PancakeWithBubbles />,
  <PancakeFlipping />,
];

interface CookingStageGraphicsProps {
  step: number;
}

const CookingStageGraphics = ({ step }: CookingStageGraphicsProps) => {
  return (
    <View style={styles.container}>
      <Subheading style={styles.text}>{info[step]}</Subheading>
      <View style={styles.graphicContainer}>{graphic[step]}</View>
    </View>
  );
};

export default CookingStageGraphics;

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
    width: WIDTH,
    height: HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
});
