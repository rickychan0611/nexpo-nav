
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../context/Context";
import { Link, useRouting } from "expo-next-react-navigation";

import { Platform, Image, Text, View } from "react-native";

import { Button, TextInput, Headline, IconButton } from "react-native-paper";

import banner1 from "../public/banner1.jpg"
import BottomBar from "../components/BottomBar";
import AppTopBar from "../components/AppTopBar";

import Home_LG from "../views/Home_LG";
import Home_XS from "../views/Home_XS";

import useWindowSize from "../hooks/useWindowSize"
import { ThemeContext } from "../context/ThemeContext";
import mom1 from "../assets/mom1.jpg"
import mom2 from "../assets/mom2.jpg"

export default function Home() {
  const { navigate } = useRouting();
  // const { user, setUser, newOrderProductList } = useContext(Context);
  const { vh, vw } = useWindowSize();
  const { theme } = useContext(ThemeContext);

  return (
    <>
      {vw > 690 && <AppTopBar />}
      <Wrapper>
        <CartBarWrapper>

          {Platform.OS !== "web" && <Image
            style={{
              width: Platform.OS === "web" ? '100vw' : '100%',
              maxWidth: 500,
              height: 120
            }}
            source={banner1} />}
          <ContextArea>

            {vw > 690 ? <Home_LG /> : <Home_XS vw={vw} />}

          </ContextArea>
        </CartBarWrapper>
      </Wrapper>

      {Platform.OS === "web" && vw < 690 && <BottomBar />}
      {Platform.OS !== "web" && <BottomBar />}
    </>
  );
}

const Wrapper = styled.ScrollView`
      /* flex: 1; */
      width: 100%;
      height: ${Platform.OS == "web" ? "100hv" : "100%"};
      max-width: 900px;
      padding-bottom: 62px;
      background-color: white;
`;
const CartBarWrapper = styled.View`
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;

`;
const ContextArea = styled.ScrollView`
      background-color: white;
      width: 100%;
      max-width: 900px;
      /* padding: 30px; */
`;
const MyText = styled.Text`
      font-size: 20px;
      margin: 20px;
`;