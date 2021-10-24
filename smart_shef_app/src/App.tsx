import "react-native-get-random-values";

import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

import data from "./data/data.json";
import { store } from "./app/store";
import AppNavigator from "./navigation/AppNavigator";
import { setRecipes } from "./features/recipe/recipeSlice";

const App = (): JSX.Element => {
  useEffect(() => {
    store.dispatch(
      setRecipes(
        data.recipes.map(e => {
          return {
            id: e.id,
            name: e.name,
            description: e.description,
            imageUrl: e.imageUrl,
          };
        }),
      ),
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
