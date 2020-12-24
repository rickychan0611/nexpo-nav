
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { ThemeProvider, Button } from 'react-native-elements';
import { TextInput, Platform, Image, View, Text } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import BottomBar from "../components/BottomBar";
import CartCheckoutBar from "../components/CartCheckoutBar";
import { firebase, db, auth } from "../firebaseApp";
import * as WebBrowser from 'expo-web-browser';
// import * as Facebook from 'expo-auth-session/providers/facebook';
// import { ResponseType } from 'expo-auth-session';
import * as Facebook from 'expo-facebook';
import banner1 from "../public/banner1.jpg"

// WebBrowser.maybeCompleteAuthSession();

export default function Home() {
  const { navigate } = useRouting();
  const { user, setUser, newOrderProductList } = useContext(Context);

  return (
    <>
      <CartBarWrapper>
      <Image 
         style={{
           width: Platform.OS === "web" ? '100vw' : '100%',
           maxWidth: 500,
           height: 120
          }}
         source={banner1} />
        <ContextArea>
        </ContextArea>
        {/* {newOrderProductList.length > 0 ?
          <CartCheckoutBar />
          : null} */}
      </CartBarWrapper>
      <BottomBar />
    </>
  );
}

const Button1 = styled(Button)`
  margin-bottom: 5px;
  `;

const CartBarWrapper = styled.View`
      flex: 1;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      max-width: 500px;
      padding-bottom: 62px;
`;
const ContextArea = styled.View`
      flex: 1;
      align-items: center;
      background-color: white;
      width: 100%;
      max-width: 500px;
`;
const MyText = styled.Text`
      font-size: 20px;
      margin: 20px;
`;