import React from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { Card } from "react-native-paper";

import { Recipe } from "../../types";
import CustomParagraph from "../elements/CustomParagraph";
import CustomTitle from "../elements/CustomTitle";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps): JSX.Element => {
  return (
    <Card style={styles.card}>
      <TouchableNativeFeedback onPress={() => {}} useForeground>
        <View>
          <Card.Cover
            source={{
              uri: recipe.imageUrl,
            }}
            width={100}
            height={100}
          />
          <Card.Content style={styles.cardContent}>
            <CustomTitle>{recipe.name}</CustomTitle>
            <CustomParagraph>{recipe.description}</CustomParagraph>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardContent: {
    padding: 24,
  },
});
