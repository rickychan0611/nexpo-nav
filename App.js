import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ContextProvider from './context/Context'

import Home from "./pages/";
import Profile from "./pages/Profile";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
    </>
  );
};
