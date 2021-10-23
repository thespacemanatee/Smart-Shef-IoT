import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import DashboardScreen from "../screens/DashboardScreen";

const AppNavigator = (): JSX.Element => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Dashboard" component={DashboardScreen} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
