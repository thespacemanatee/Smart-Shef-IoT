import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

import { RootStackParamList } from ".";
import DashboardScreen from "../screens/DashboardScreen";
import DebugScreen from "../screens/settings/DebugScreen";
import BluetoothScreen from "../screens/settings/BluetoothScreen";
import Title from "../components/typography/Title";
import { FONT_SIZE, SPACING } from "../resources/dimens";

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
      <View style={styles.settingsScreen}>
        <View style={styles.settingsTitleContainer}>
          <Title style={styles.settingsTitleText}>Settings</Title>
        </View>
        <Navigator>
          <Screen name="Debug" component={DebugScreen} />
          <Screen name="Bluetooth" component={BluetoothScreen} />
        </Navigator>
      </View>
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

const styles = StyleSheet.create({
  settingsScreen: {
    flex: 1,
    backgroundColor: "white",
  },
  settingsTitleContainer: {
    padding: SPACING.spacing_16,
  },
  settingsTitleText: {
    fontSize: FONT_SIZE.title3,
  },
});
