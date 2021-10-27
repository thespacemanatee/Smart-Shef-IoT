import "react-native-get-random-values";

import React, { useEffect } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  UIManager,
} from "react-native";
import { BleManager } from "react-native-ble-plx";

import data from "./data/data.json";
import { store } from "./app/store";
import AppNavigator from "./navigation/AppNavigator";
import { setRecipes } from "./features/recipe/recipeSlice";
import { bleManagerRef } from "./utils/bluetooth/BleHelper";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = (): JSX.Element => {
  useEffect(() => {
    bleManagerRef.current = new BleManager();
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
      <StatusBar barStyle="dark-content" backgroundColor="white" />
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
