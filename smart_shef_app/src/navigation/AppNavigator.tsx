import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { HomeStackParamList } from ".";
import DashboardScreen from "../screens/DashboardScreen";
import ServerScreen from "../screens/settings/ServerScreen";
import BluetoothScreen from "../screens/settings/BluetoothScreen";
import Title from "../components/typography/Title";
import { FONT_SIZE, SPACING } from "../resources/dimens";
import EquipmentSetupScreen from "../screens/EquipmentSetupScreen";
import PancakeCookingProgressScreen from "../screens/PancakeCookingProgressScreen";

const AppNavigator = (): JSX.Element => {
  const Tab = createBottomTabNavigator();

  const DashboardStackNavigator = () => {
    const { Navigator, Screen } = createStackNavigator<HomeStackParamList>();
    return (
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Dashboard" component={DashboardScreen} />
        <Screen name="EquipmentSetup" component={EquipmentSetupScreen} />
        <Screen
          name="PancakeCookingProgress"
          component={PancakeCookingProgressScreen}
        />
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
        <Navigator
          screenOptions={{
            tabBarLabelStyle: { fontFamily: "Poppins-Regular" },
          }}>
          <Screen name="Server" component={ServerScreen} />
          <Screen name="Bluetooth" component={BluetoothScreen} />
        </Navigator>
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: { fontFamily: "Poppins-Medium" },
        }}>
        <Tab.Screen
          name="DashboardStack"
          component={DashboardStackNavigator}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsTab"
          component={SettingsTopTabNavigator}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color }) => (
              <Icon name="cog" color={color} size={26} />
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
