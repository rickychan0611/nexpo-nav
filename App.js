import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ContextProvider from './context/Context';
import { ThemeProvider } from 'react-native-elements';
import theme from './theme';

import home from "./pages";
import user from "./pages/user";

const Stack = createStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home" component={home} />
          <Stack.Screen name="profile" component={user} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default () => {
  return (
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ContextProvider>

  )
}