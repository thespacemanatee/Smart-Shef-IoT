import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Card, Paragraph, Title } from "react-native-paper";
import { IMqttClient } from "sp-react-native-mqtt";

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
      <Card>
        <Card.Cover
          source={{ uri: "src/assets/images/pancake.jpeg" }}
          width={100}
          height={100}
        />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => {}}>Cancel</Button>
          <Button onPress={() => {}}>Ok</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
