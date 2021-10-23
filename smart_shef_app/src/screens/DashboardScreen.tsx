import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Card, Paragraph, Title } from "react-native-paper";
import { IMqttClient } from "sp-react-native-mqtt";
import RecipeCard from "../components/ui/RecipeCard";

import MQTTWrapper from "../config/mqtt";

const DashboardScreen = () => {
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
    <View style={{}}>
      <Text>Smart Shef</Text>
      <RecipeCard />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
