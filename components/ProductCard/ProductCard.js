import React, { useContext } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Icon } from 'react-native-elements'

import styled from "styled-components/native";

export default function ProductCard() {
  return (
    <Container>

      <Image source={{
          uri: 'https://cdn3.volusion.com/hckyx.hepad/v/vspfiles/photos/CONC-REDAPPLE-2.jpg',
        }}/>

      <Content>
        <Name>Apple</Name>
        <Description>A big red apple.</Description>

        <PriceQtyWrapper>

            <PricesWrapper>
              <RegPrice>$12.00</RegPrice>
              <DisPrice>$10.00</DisPrice>
            </PricesWrapper>

            <QtyWrapper>
              <Icon
                name='minus-circle'
                type='font-awesome-5'
                color='grey'
                size={20}
              />
              <Qty> 99 </Qty>
              <Icon
                name='plus-circle'
                type='font-awesome-5'
                color='red'
                size={20}
              />
            </QtyWrapper>

        </PriceQtyWrapper>

      </Content>
    </Container>
  )
};

const PriceQtyWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
`;
const QtyWrapper = styled.View`
  flex: 2;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-end;
`;
const PricesWrapper = styled.View`
  flex: 3;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-end;
`;
const Name = styled.Text`
  margin-bottom: 10px;
`;
const Qty = styled.Text`
  color: black;
  font-size: 16px;
  margin-bottom: ${Platform.OS === 'web' ? "2px" : "0px"};
`;
const Description = styled.Text`
  font-size: 12px;
  color: gray;
  margin-bottom: 10px;

`;
const RegPrice = styled.Text`
text-decoration: line-through;
`;
const DisPrice = styled.Text`
color: red;
`;
const Container = styled.View`
      flex: 1;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: flex-start;
      width: 100%;
      max-width: 500px;
      padding: 0 10px 0 5px;
      margin-bottom: ${Platform.OS === 'web' ? "105px" : "5px"};
`;
const Content = styled.View`
      /* position: absolute; */
      flex: 3;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: space-between;
      background-color: white;
      width: 100%;
      min-height: 100px;
      /* background-color: lightpink; */
      padding: 0 10px 5px 10px;
      
`;
const Image = styled.Image`
      flex: 2;
      width: 100px;
      height: 100px;
      background-color: white;
      resize-mode: contain;
`;