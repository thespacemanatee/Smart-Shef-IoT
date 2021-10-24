import { configureStore } from "@reduxjs/toolkit";

import settingsReducer from "../features/settings/settingsSlice";
import recipeReducer from "../features/recipe/recipeSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    recipe: recipeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
