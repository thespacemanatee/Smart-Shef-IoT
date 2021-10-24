import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

import { RootStackParamList } from ".";
import DashboardScreen from "../screens/DashboardScreen";
import DebugScreen from "../screens/settings/DebugScreen";

const AppNavigator = (): JSX.Element => {
  const Tab = createMaterialBottomTabNavigator();

  const DashboardStackNavigator = () => {
    const { Navigator, Screen } = createStackNavigator<RootStackParamList>();
    return (
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Dashboard" component={DashboardScreen} />
      </Navigator>
    );
  };

  const SettingsTopTabNavigator = () => {
    const { Navigator, Screen } = createMaterialTopTabNavigator();
    return (
      <Navigator>
        <Screen name="Debug" component={DebugScreen} />
      </Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator shifting>
        <Tab.Screen
          name="DashboardStack"
          component={DashboardStackNavigator}
          options={{
            tabBarLabel: "Home",
            tabBarColor: "slateblue",
            tabBarIcon: ({ color }) => (
              <Icons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsTab"
          component={SettingsTopTabNavigator}
          options={{
            tabBarLabel: "Settings",
            tabBarColor: "steelblue",
            tabBarIcon: ({ color }) => (
              <Icons name="cog" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
