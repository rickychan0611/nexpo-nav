import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Platform } from "react-native";
import useWindowSize from "../../hooks/useWindowSize"

import AppTopBar from "../AppTopBar";
import BottomBar from "../BottomBar";

export default function AppWrapper({ children }) {
  const { vh, vw } = useWindowSize();

  return (
    <>
      {vw > 690 && <AppTopBar />}
      <Wrapper>
        {children}
      </Wrapper>
      {Platform.OS === "web" && vw < 690 && <BottomBar />}
      {Platform.OS !== "web" && <BottomBar />}
    </>
  )
};

const Wrapper = styled.ScrollView`
      width: 100%;
      max-width: ${Platform.OS === "web" ? "900px" : wp("100%")};
      height: ${Platform.OS === "web" ? "100hv" : "100%"};
      padding-bottom: 62px;
      background-color: white;
`;