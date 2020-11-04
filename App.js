import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets  } from "@react-navigation/stack";
import ContextProvider from './context/Context';
import { ThemeProvider } from 'react-native-elements';
import theme from './theme';

import home from "./pages";
import user from "./pages/user";
import store from "./pages/store";
import product from "./pages/product";
import cart from "./pages/cart";

const Stack = createStackNavigator();

// SlideFromRightIOS 
// ModalSlideFromBottomIOS
// ModalPresentationIOS
// FadeFromBottomAndroid 
// RevealFromBottomAndroid 
// ScaleFromCenterAndroid 
// DefaultTransition 
// ModalTransition 

const transition =  {...TransitionPresets.ScaleFromCenterAndroid}


function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home" component={home}
          options={{
            title: 'Home',
            ...transition,
          }}/>
          <Stack.Screen name="user" component={user}
          options={{
            title: 'User',
            ...transition,
          }}/>
          <Stack.Screen name="store" component={store}
          options={{
            title: 'Shop',
            ...transition,
          }}/>
          <Stack.Screen name="product" component={product} 
          options={{
            title: 'Product Details',
            ...transition,
          }}/>
          <Stack.Screen name="cart" component={cart} 
          options={{
            title: 'Shopping Cart',
            ...transition,
          }}/>
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