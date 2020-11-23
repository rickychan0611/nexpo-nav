import React, { useEffect } from "react";
import ContextProvider from './context/Context';
import ThemeProvider from './context/ThemeContext';
import { SafeAreaView, Platform } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './theme';

import home from "./pages";
import user from "./pages/user";
import store from "./pages/store";
import product from "./pages/product";
import cart from "./pages/cart";
import admin from "./pages/admin";
import panel from "./pages/admin/panel";
import login from "./pages/login";
import signIn from "./pages/signIn";
import signUp from "./pages/signUp";
import forgotPassword from "./pages/forgotPassword";

import BottomBar from './components/BottomBar';
import { ThemeContext } from "styled-components";

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
    headerShown: false,
    title: name,
    ...transition,
  }
}

function App() {

  useEffect(() => {
    if (Platform.OS !== 'web') {
      import("react-native").then((item) => {
        item.LogBox.ignoreAllLogs();
        // item.LogBox.ignoreLogs(['Setting a timer']);
        // item.LogBox.ignoreLogs(['StatusBarIOS']);
      });
    }
  }, []);


  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="signIn" component={signIn} options={options("signIn")} />
          <Stack.Screen name="forgotPassword" component={forgotPassword} options={options("Forgot Password")} />
          <Stack.Screen name="login" component={login} options={options("Login")} />
          <Stack.Screen name="signUp" component={signUp} options={options("signUp")} />
          <Stack.Screen name="home" component={home} options={options("Home")} />
          <Stack.Screen name="panel" component={panel} options={options("Admin Panel")} />
          <Stack.Screen name="admin" component={admin} options={options("Admin Login")} />
          <Stack.Screen name="store" component={store} options={options("Shop")} />
          <Stack.Screen name="user" component={user} options={options("My Account")} />
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
      <ThemeProvider>
          <PaperProvider>
            <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
              {/* <TopBar /> */}
              <App />
            </SafeAreaView>
          </PaperProvider>
      </ThemeProvider>
    </ContextProvider>
  )
}