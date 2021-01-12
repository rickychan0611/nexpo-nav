
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../context/Context";
import { Link, useRouting } from "expo-next-react-navigation";
import { ThemeContext } from "../context/ThemeContext";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import useWindowSize from "../hooks/useWindowSize"

import { Platform, Image, Text, View } from "react-native";

import { Button, TextInput, Headline, IconButton } from "react-native-paper";

import BottomBar from "../components/BottomBar";
import AppTopBar from "../components/AppTopBar";

import Home_Web_LG from "../layouts/Home_Web_LG";
import Home_Web_XS from "../layouts/Home_Web_XS";
import Home_Mobile_XS from "../layouts/Home_Mobile_XS";

export default function Home() {
  const { navigate } = useRouting();
  // const { user, setUser, newOrderProductList } = useContext(Context);
  const { vh, vw } = useWindowSize();
  const { theme } = useContext(ThemeContext);

  return (
    <>
      {vw > 690 && <AppTopBar />}
      <Wrapper>

        {Platform.OS === "web" &&
          <>
            {
              vw > 690 ?
                <Home_Web_LG /> :
                <Home_Web_XS vw={vw} />
            }
          </>
        }


        {Platform.OS !== "web" && <Home_Mobile_XS />}
      </Wrapper>

      {Platform.OS === "web" && vw < 690 && <BottomBar />}
      {Platform.OS !== "web" && <BottomBar />}

    </>
  );
}

const Wrapper = styled.ScrollView`
      width: 100%;
      max-width: ${Platform.OS === "web" ? "900px" : wp("100%")};
      height: ${Platform.OS === "web" ? "100hv" : "100%"};
      padding-bottom: 62px;
      background-color: white;
`;
const MyText = styled.Text`
      font-size: 20px;
      margin: 20px;
`;