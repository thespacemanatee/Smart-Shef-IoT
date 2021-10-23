import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";

const RecipeCard = () => {
  return (
    <Card>
      <Card.Cover
        source={{
          uri: "https://github.com/thespacemanatee/Smart-Shef-IoT/blob/main/smart_shef_app/assets/images/pancake.jpeg?raw=true",
        }}
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
  );
};

export default RecipeCard;

const styles = StyleSheet.create({});
