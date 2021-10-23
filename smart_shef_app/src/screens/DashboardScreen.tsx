import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IMqttClient } from "sp-react-native-mqtt";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Modal, Portal } from "react-native-paper";

import { useAppSelector } from "../app/hooks";
import Title from "../components/typography/Title";
import RecipeCard from "../components/ui/RecipeCard";
import MQTTWrapper from "../config/mqtt";
import { FONT_SIZE, SPACING } from "../resources/dimens";
import DebugModal from "../components/ui/DebugModal";

const HEADER_HEIGHT_EXPANDED = 80;

const DashboardScreen = () => {
  const recipes = useAppSelector(state => state.recipe.recipes);
  const [visible, setVisible] = useState(false);
  const [mqttClient, setMqttClient] = useState<IMqttClient>();
  const scrollOffset = useSharedValue(0);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    const getMQTTClient = async () => {
      const client = await MQTTWrapper.getClientInstanceAsync();
      client.publish("smartshef/1", "Hello, world!!", 1, true);

      setMqttClient(client);
    };
    getMQTTClient();
  }, []);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollOffset.value = event.contentOffset.y;
  });

  const titleTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      fontSize: interpolate(
        scrollOffset.value,
        [0, HEADER_HEIGHT_EXPANDED],
        [FONT_SIZE.title1, FONT_SIZE.title3],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <View style={styles.screen}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}>
          <DebugModal client={mqttClient} />
        </Modal>
      </Portal>
      <Animated.View style={styles.titleContainer}>
        <Title style={[styles.titleText, titleTextAnimatedStyle]}>
          My Recipes
        </Title>
        <TouchableOpacity onPress={showModal}>
          <Icon name="bug" size={30} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        contentContainerStyle={styles.scrollViewContentContainer}>
        {recipes.map(recipe => {
          return (
            <View key={recipe.id} style={styles.cardContainer}>
              <RecipeCard recipe={recipe} />
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "white",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    margin: SPACING.spacing_32,
    borderRadius: SPACING.spacing_8,
    padding: SPACING.spacing_16,
  },
  titleContainer: {
    flexDirection: "row",
    padding: SPACING.spacing_16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontSize: FONT_SIZE.title1,
  },
  scrollViewContentContainer: {
    paddingHorizontal: SPACING.spacing_16,
  },
  cardContainer: {
    marginBottom: SPACING.spacing_16,
  },
});
