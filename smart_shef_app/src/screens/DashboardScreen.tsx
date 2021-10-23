import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { IMqttClient } from "sp-react-native-mqtt";

import { useAppSelector } from "../app/hooks";
import Title from "../components/elements/Title";
import RecipeCard from "../components/ui/RecipeCard";
import MQTTWrapper from "../config/mqtt";
import { FONT_SIZE, SPACING } from "../resources/dimens";

const DashboardScreen = () => {
  const recipes = useAppSelector(state => state.recipe.recipes);
  const [mqttClient, setMqttClient] = useState<IMqttClient>();

  useEffect(() => {
    const getMQTTClient = async () => {
      const client = await MQTTWrapper.getClientInstanceAsync();
      client.publish("smartshef/1", "Hello, world!!", 1, true);

      setMqttClient(client);
    };
    getMQTTClient();
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <View style={styles.titleContainer}>
          <Title style={styles.titleText}>My Recipes</Title>
        </View>
        {recipes.map(recipe => {
          return (
            <View key={recipe.id} style={styles.cardContainer}>
              <RecipeCard recipe={recipe} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  screen: {
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
