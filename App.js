import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import ContextProvider from './context/Context';
import { ThemeProvider } from 'react-native-elements';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './theme';

import home from "./pages";
import user from "./pages/user";
import store from "./pages/store";
import product from "./pages/product";
import cart from "./pages/cart";
import admin from "./pages/admin";
import panel from "./pages/admin/panel";

const Stack = createStackNavigator();

// SlideFromRightIOS 
// ModalSlideFromBottomIOS
// ModalPresentationIOS
// FadeFromBottomAndroid 
// RevealFromBottomAndroid 
// ScaleFromCenterAndroid 
// DefaultTransition 
// ModalTransition 

const transition = { ...TransitionPresets.ScaleFromCenterAndroid }

const options = (name) => {
  return {
    title: name,
    ...transition,
  }
}

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="panel" component={panel} options={options("Admin Panel")} />
          <Stack.Screen name="admin" component={admin} options={options("Admin Login")} />
          <Stack.Screen name="home" component={home} options={options("Home")} />
          <Stack.Screen name="user" component={user} options={options("My Account")} />
          <Stack.Screen name="store" component={store} options={options("Shop")} />
          <Stack.Screen name="product" component={product} options={options("Product Details")} />
          <Stack.Screen name="cart" component={cart} options={options("Shopping Cart")} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default () => {
  return (
    <ContextProvider>
      <PaperProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PaperProvider>
    </ContextProvider>

  )
}