import React, { useContext } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Icon } from 'react-native-elements'
import imagePlaceholder from "../../public/imagePlaceholder.jpg";

import styled from "styled-components/native";
import ProductContent from "../ProductContent";

export default function ProductCard({ key, item }) {
  return (
    <>
      {
        item && <>
          <Container key={key} 
           style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.15,
            shadowRadius: 10,
            elevation: 10,
            zIndex: 1000
          }}>
            <ImageWrapper>
              {item.images && item.images[0] ?
              <Image source={{
                uri: item.images[0].url
              }} />
              :
              <Image source={imagePlaceholder} />
              }
            </ImageWrapper>

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
      width: 93%;
      max-width: 500px;
      padding: 10px;
      background-color: white;
      margin: 10px;
      border-radius:10px;
      border:1px solid #d4d4d4;
`;

const ImageWrapper = styled.View`
      flex: 2;
      padding: 5px 0 5px 0 ;
      width: 100px;
      height: 100px;
`;
const Image = styled.Image`
      flex: 1;
      /* width: 100px;
      height: 100px; */
      background-color: white;
      resize-mode: contain;
`;

const RightSideContentWrapper = styled.View`
      flex: 4;
      flex-direction: column;
      /* flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: space-between; */
      background-color: white;
      width: 100%;
      min-height: 100px;
      padding: 14px 10px 5px 10px;
`;