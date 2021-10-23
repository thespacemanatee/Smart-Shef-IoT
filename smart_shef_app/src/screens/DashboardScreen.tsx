import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IMqttClient } from "sp-react-native-mqtt";

import MQTTWrapper from "../config/mqtt";

const DashboardScreen = () => {
  const [mqttClient, setMqttClient] = useState<IMqttClient>();

  useEffect(() => {
    const getMQTTClient = async () => {
      const client = await MQTTWrapper.getClientInstanceAsync();
      setMqttClient(client);
    };
    getMQTTClient();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Smart Shef</Text>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
