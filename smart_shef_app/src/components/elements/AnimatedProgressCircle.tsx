import React, { useEffect } from "react";
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface AnimatedProgressCircleProps {
  index: number;
  cx: number;
  stage: number;
}

const AnimatedProgressCircle = ({
  index,
  cx,
  stage,
}: AnimatedProgressCircleProps) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (index === stage) {
      progress.value = withRepeat(withTiming(1, { duration: 2000 }), -1, true);
    } else if (index < stage) {
      progress.value = 1;
    } else {
      progress.value = 0;
    }
  }, [stage, progress]);

  const animatedProps = useAnimatedProps(() => {
    const fill = interpolateColor(progress.value, [0, 1], ["white", "#FF7070"]);
    const stroke = interpolateColor(
      progress.value,
      [0, 1],
      ["#E9E9E9", "#FF7070"],
    );
    return { fill, stroke };
  });

  return (
    <AnimatedCircle
      animatedProps={animatedProps}
      cx={cx}
      cy={18}
      r={17}
      strokeWidth={2}
    />
  );
};

export default AnimatedProgressCircle;
