import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IMqttClient } from "sp-react-native-mqtt";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { useAppSelector } from "../app/hooks";
import Title from "../components/elements/Title";
import RecipeCard from "../components/ui/RecipeCard";
import MQTTWrapper from "../config/mqtt";
import { ELEVATION, FONT_SIZE, SPACING } from "../resources/dimens";

const HEADER_HEIGHT_EXPANDED = 80;

const DashboardScreen = () => {
  const recipes = useAppSelector(state => state.recipe.recipes);
  const [mqttClient, setMqttClient] = useState<IMqttClient>();
  const scrollOffset = useSharedValue(0);

  useEffect(() => {
    const getMQTTClient = async () => {
      const client = await MQTTWrapper.getClientInstanceAsync();
      client.publish("smartshef/1", "Hello, world!!", 1, true);

      setMqttClient(client);
    };
    getMQTTClient();
  }, []);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollOffset.value = event.contentOffset.y;
  });

  const titleTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      fontSize: interpolate(
        scrollOffset.value,
        [0, HEADER_HEIGHT_EXPANDED],
        [FONT_SIZE.title1, FONT_SIZE.title3],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <View style={styles.screen}>
      <Animated.View style={styles.titleContainer}>
        <Title style={[styles.titleText, titleTextAnimatedStyle]}>
          My Recipes
        </Title>
      </Animated.View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        contentContainerStyle={styles.scrollViewContentContainer}>
        {recipes.map(recipe => {
          return (
            <View key={recipe.id} style={styles.cardContainer}>
              <RecipeCard recipe={recipe} />
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "white",
  },
  titleContainer: {
    padding: SPACING.spacing_16,
  },
  titleText: {
    fontSize: FONT_SIZE.title1,
  },
  scrollViewContentContainer: {
    paddingHorizontal: SPACING.spacing_16,
  },
  cardContainer: {
    marginBottom: SPACING.spacing_16,
  },
});
