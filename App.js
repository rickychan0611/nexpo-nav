import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ContextProvider from './context/Context';
import { ThemeProvider } from 'react-native-elements';
import theme from './theme';

// import theme from './theme.js';

import Home from "./pages";
import Profile from "./pages/Profile";

const Stack = createStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
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