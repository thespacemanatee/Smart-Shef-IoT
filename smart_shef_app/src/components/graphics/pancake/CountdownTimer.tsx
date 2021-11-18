import {
  NavigationProp,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { HomeStackParamList } from "../../../navigation";

const CountdownTimer = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [remainingMinutes, setRemainingMinutes] = useState(1);

  const navigation =
    useNavigation<
      NavigationProp<HomeStackParamList, "PancakeCookingProgress">
    >();

  useEffect(() => {
    let remainingTime = 60;
    const timer = setInterval(() => {
      setRemainingSeconds(remainingTime % 60 === 0 ? 0 : remainingTime % 60);
      setRemainingMinutes(Math.floor(remainingSeconds / 60));
      remainingTime -= 1;

      if (remainingTime < 0) {
        clearInterval(timer);
        navigation.dispatch(StackActions.replace("PancakeCookingDone"));
      }

      return () => clearInterval(timer);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Text
        style={[
          styles.timerText,
          {
            color:
              remainingMinutes === 0 && remainingSeconds === 0
                ? "#A3CF6B"
                : "#BCBCBC",
          },
        ]}
      >
        {`${remainingMinutes}:${remainingSeconds.toString().padStart(2, "0")}`}
      </Text>
    </View>
  );
};

export default CountdownTimer;

const styles = StyleSheet.create({
  timerText: {
    fontFamily: "Poppins-Medium",
    fontSize: 96,
  },
});
