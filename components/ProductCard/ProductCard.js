import React, { useContext } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Icon } from 'react-native-elements'

import styled from "styled-components/native";
import ProductContent from "../ProductContent";

export default function ProductCard({ item }) {
  return (
    <>
      {
        item && <>
          <Container>
            <Image source={{
              uri: item.image[0].url
            }} />

            <RightSideContentWrapper>
              <ProductContent item={item} />
            </RightSideContentWrapper>
            
          </Container>
        </>
      }
    </>
  )
};

const Container = styled.View`
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: flex-start;
      width: 100%;
      max-width: 500px;
      padding: 0 10px 0 5px;
      background-color: white;
      margin-bottom: ${Platform.OS === 'web' ? "5px" : "5px"};
`;

const Image = styled.Image`
      flex: 2;
      width: 100px;
      height: 100px;
      background-color: white;
      resize-mode: contain;
`;
const RightSideContentWrapper = styled.View`
      flex: 3;
      flex-direction: column;
      /* flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: space-between; */
      background-color: white;
      width: 100%;
      min-height: 100px;
      padding: 0 10px 5px 10px;
`;