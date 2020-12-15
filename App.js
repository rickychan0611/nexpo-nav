import React, { useEffect } from "react";
import ContextProvider from './context/Context';
import ThemeProvider from './context/ThemeContext';
import AccountProvider from './context/AccountContext';
import ProductsProvider from './context/ProductsContext';
import AdminProvider from './context/AdminContext';
import { SafeAreaView, Platform } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { Provider as PaperProvider } from 'react-native-paper';

import home from "./pages";
import store from "./pages/store";
import product from "./pages/product";
import cart from "./pages/cart";
import confirmOrder from "./pages/confirmOrder";
import admin from "./pages/admin";
import panel from "./pages/admin/panel";
import order_details from "./pages/admin/order-details";
import shipping from "./pages/checkout/shipping";
import creditCard from "./pages/checkout/credit-card";
import review from "./pages/checkout/review";
import creditReview from "./pages/checkout/credit-review";
import addressBook from "./pages/checkout/address-book";
import paymentMethod from "./pages/checkout/payment-method";
import newAddress from "./pages/checkout/new-address";
import login from "./pages/login";
import signIn from "./pages/signIn";
import signUp from "./pages/signUp";
import forgotPassword from "./pages/forgotPassword";
import orderSuccess from "./pages/orderSuccess";
import order from "./pages/order";
import account from "./pages/account";

import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([""]);

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
          <Stack.Screen name="checkout/shipping" component={shipping} options={options("Checkout - Shipping")} />
          <Stack.Screen name="checkout/credit-card" component={creditCard} options={options("Shop")} />
          <Stack.Screen name="store" component={store} options={options("Shop")} />
          <Stack.Screen name="checkout/payment-method" component={paymentMethod} options={options("paymentMethod")} />
          <Stack.Screen name="checkout/review" component={review} options={options("review")} />
          <Stack.Screen name="checkout/credit-review" component={creditReview} options={options("creditReview")} />
          <Stack.Screen name="account" component={account} options={options("account")} />
          <Stack.Screen name="admin/panel" component={panel} options={options("Orders")} />
          <Stack.Screen name="admin/order-details" component={order_details} options={options("Orders Details")} />
          <Stack.Screen name="order" component={order} options={options("order")} />
          <Stack.Screen name="orderSuccess" component={orderSuccess} options={options("orderSuccess")} />
          <Stack.Screen name="confirmOrder" component={confirmOrder} options={options("confirmOrder")} />
          <Stack.Screen name="cart" component={cart} options={options("Shopping Cart")} />
          <Stack.Screen name="signUp" component={signUp} options={options("signUp")} />
          <Stack.Screen name="signIn" component={signIn} options={options("signIn")} />
          <Stack.Screen name="forgotPassword" component={forgotPassword} options={options("Forgot Password")} />
          <Stack.Screen name="login" component={login} options={options("Login")} />
          <Stack.Screen name="/" component={home} options={options("Home")} />
          <Stack.Screen name="home" component={home} options={options("Home")} />
          <Stack.Screen name="panel" component={panel} options={options("Admin Panel")} />
          <Stack.Screen name="admin" component={admin} options={options("Admin Login")} />
          <Stack.Screen name="product" component={product} options={options("Product Details")} />
          <Stack.Screen name="checkout/address-book" component={addressBook} options={options("Address Book")} />
          <Stack.Screen name="new-address" component={newAddress} options={options("Add a New Address")} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default () => {
  return (
    <ContextProvider>
      <AccountProvider>
        <ProductsProvider>
          <ThemeProvider>
            <PaperProvider>
              <AdminProvider >
                <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
                  {/* <TopBar /> */}
                  <App />
                </SafeAreaView>
              </AdminProvider >
            </PaperProvider>
          </ThemeProvider>
        </ProductsProvider>
      </AccountProvider>
    </ContextProvider>
  )
}