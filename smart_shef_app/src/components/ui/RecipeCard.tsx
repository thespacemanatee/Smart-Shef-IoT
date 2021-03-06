import React from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { Card } from "react-native-paper";

import { ELEVATION, SPACING } from "../../resources/dimens";
import { Recipe } from "../../types";
import Paragraph from "../typography/Paragraph";
import Title from "../typography/Title";

interface RecipeCardProps {
  recipe: Recipe;
  onPress: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, onPress }: RecipeCardProps): JSX.Element => {
  return (
    <Card style={styles.card}>
      <TouchableNativeFeedback
        onPress={() => {
          onPress(recipe);
        }}
        useForeground
      >
        <View>
          <Card.Cover
            source={{
              uri: recipe.imageUrl,
            }}
            width={100}
            height={100}
          />
          <Card.Content style={styles.cardContent}>
            <Title>{recipe.name}</Title>
            <Paragraph>{recipe.description}</Paragraph>
          </Card.Content>
        </View>
      </TouchableNativeFeedback>
    </Card>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    borderRadius: SPACING.spacing_16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: ELEVATION.elevation_4,
  },
  cardContent: {
    padding: SPACING.spacing_24,
  },
});
