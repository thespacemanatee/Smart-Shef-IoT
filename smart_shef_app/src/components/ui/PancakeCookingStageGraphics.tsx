import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import PanWithTemperature from "../elements/PanWithTemperature";
import OilPan from "../graphics/OilPan";
import PancakeFlipping from "../graphics/PancakeFlipping";
import PancakeNoBubbles from "../graphics/PancakesNoBubbles";
import PancakeWithBubbles from "../graphics/PancakeWithBubbles";
import Subheading from "../typography/Subheading";

const GRAPHIC_WIDTH = 246;
const GRAPHIC_HEIGHT = 246;

const infos = [
  "Add a thin layer of oil to the pan",
  "Heat your pan to 40°C",
  "Add 3 scoops of prepared batter",
  "Wait till you see holes form on the top",
  "Flip now!",
  "Wait for 1 minute",
  "Time’s Up!",
];

interface PancakeCookingStageGraphicsProps {
  step: number;
  temperature: number;
}

const PancakeCookingStageGraphics = ({
  step,
  temperature,
}: PancakeCookingStageGraphicsProps) => {
  const graphics = useMemo(
    () => [
      <OilPan />,
      <PanWithTemperature temperature={temperature} />,
      <PancakeNoBubbles />,
      <PancakeWithBubbles />,
      <PancakeFlipping />,
    ],
    [temperature],
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
