import React, { useEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Rect } from "react-native-svg";

const AnimatedRect = Animated.createAnimatedComponent(Rect);

interface AnimatedProgressRectProps {
  index: number;
  x: number;
  stage: number;
}

const AnimatedProgressRect = ({
  index,
  x,
  stage,
}: AnimatedProgressRectProps) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (index === stage) {
      progress.value = withRepeat(withTiming(1, { duration: 2000 }), -1, false);
    } else if (index < stage) {
      progress.value = 1;
    } else {
      progress.value = 0;
    }
  }, [index, stage, progress]);

  const animatedProps = useAnimatedProps(() => {
    const width = interpolate(progress.value, [0, 1], [0, 22]);
    return { width };
  });

  return (
    <AnimatedRect
      animatedProps={animatedProps}
      x={x}
      y={17}
      height={2}
      fill="#FF7070"
    />
  );
};

export default AnimatedProgressRect;
