/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import { Recipe } from "../../types";

interface RecipeState {
  selectedRecipe?: Recipe | null;
  recipes: Recipe[];
}

const initialState: RecipeState = {
  selectedRecipe: null,
  recipes: [],
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setSelectedRecipe: (state, action: PayloadAction<Recipe>) => {
      state.selectedRecipe = action.payload;
    },
    resetSelectedRecipe: state => {
      state.selectedRecipe = null;
    },
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload);
    },
    removeRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.filter(e => e.id !== action.payload.id);
    },
    resetRecipes: state => {
      state.recipes = [];
    },
  },
});

export const {
  setSelectedRecipe,
  resetSelectedRecipe,
  setRecipes,
  addRecipe,
  removeRecipe,
  resetRecipes,
} = recipeSlice.actions;

export const selectRecipes = (state: RootState) => state.recipe.recipes;

export default recipeSlice.reducer;
