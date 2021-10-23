import "react-native-get-random-values";

import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import data from "./data/data.json";
import { store } from "./app/store";
import AppNavigator from "./navigation/AppNavigator";
import { setRecipes } from "./features/recipe/recipeSlice";

const App = (): JSX.Element | null => {
  const [loaded, setLoaded] = useState(false);
  const loadAssets = async () => {
    await SplashScreen.preventAutoHideAsync();
  };
  useEffect(() => {
    loadAssets().then(() => {
      setLoaded(true);
      SplashScreen.hideAsync();
    });
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

  if (!loaded) {
    return null;
  }

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
