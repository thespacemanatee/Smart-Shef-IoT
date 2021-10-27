import * as React from "react";
import { AppRegistry, LogBox } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";

import { name as appName } from "./app.json";
import App from "./src/App";
import { store } from "./src/app/store";

LogBox.ignoreLogs(["`new NativeEventEmitter()`"]);

const theme = {
  ...DefaultTheme,
};

export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
