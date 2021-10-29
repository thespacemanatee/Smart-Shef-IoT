import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import BottomSheet from "@gorhom/bottom-sheet";
import { StackScreenProps } from "@react-navigation/stack";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import Title from "../components/typography/Title";
import RecipeCard from "../components/ui/RecipeCard";
import { FONT_SIZE, SPACING } from "../resources/dimens";
import { Recipe } from "../types";
import { setSelectedRecipe } from "../features/recipe/recipeSlice";
import RecipeModalSheet from "../components/ui/RecipeModalSheet";
import { HomeStackParamList } from "../navigation";

const HEADER_HEIGHT_EXPANDED = 80;

type DashboardScreenProps = StackScreenProps<HomeStackParamList, "Dashboard">;

const DashboardScreen = ({ navigation }: DashboardScreenProps) => {
  const recipes = useAppSelector(state => state.recipe.recipes);
  const sheetRef = useRef<BottomSheet>(null);
  const scrollOffset = useSharedValue(0);

  const dispatch = useAppDispatch();

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

  const handleOpenRecipeSheet = (recipe: Recipe) => {
    dispatch(setSelectedRecipe(recipe));
    sheetRef.current?.expand();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.titleContainer}>
        <Title style={titleTextAnimatedStyle}>My Recipes</Title>
      </View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        contentContainerStyle={styles.scrollViewContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {recipes.map(recipe => {
          return (
            <View key={recipe.id} style={styles.cardContainer}>
              <RecipeCard recipe={recipe} onPress={handleOpenRecipeSheet} />
            </View>
          );
        })}
      </Animated.ScrollView>
      <RecipeModalSheet sheetRef={sheetRef} navigation={navigation} />
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
  titleContainer: {
    padding: SPACING.spacing_16,
  },
  scrollViewContentContainer: {
    paddingHorizontal: SPACING.spacing_16,
  },
  cardContainer: {
    marginBottom: SPACING.spacing_16,
  },
});
