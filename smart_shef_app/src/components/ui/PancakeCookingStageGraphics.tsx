import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import PanWithTemperature from "../elements/PanWithTemperature";
import CountdownTimer from "../graphics/pancake/CountdownTimer";
import OilPan from "../graphics/pancake/OilPan";
import PancakeFlipping from "../graphics/pancake/PancakeFlipping";
import PancakeNoBubbles from "../graphics/pancake/PancakesNoBubbles";
import PancakeWithBubbles from "../graphics/pancake/PancakeWithBubbles";
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
      <CountdownTimer />,
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
