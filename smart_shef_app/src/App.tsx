import React from "react";

import { SafeAreaView, StatusBar } from "react-native";

import AppNavigator from "./navigation/AppNavigator";

const App = (): JSX.Element => {
  const backgroundStyle = {
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </SafeAreaView>
  );
};

export default App;
