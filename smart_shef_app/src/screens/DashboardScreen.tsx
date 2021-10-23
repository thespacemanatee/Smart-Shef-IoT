import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { IMqttClient } from "sp-react-native-mqtt";

import { useAppSelector } from "../app/hooks";
import RecipeCard from "../components/ui/RecipeCard";
import MQTTWrapper from "../config/mqtt";

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
    <View style={{ flexGrow: 1, backgroundColor: "white" }}>
      <Text style={{ fontSize: 20 }}>Smart Shef</Text>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {recipes.map(recipe => {
          return (
            <View style={styles.cardContainer}>
              <RecipeCard key={recipe.id} recipe={recipe} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
  },
});
