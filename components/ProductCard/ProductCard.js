import React, {useContext} from "react";
import { View, Text, StyleSheet } from "react-native";

import styled from "styled-components/native";

export default function ProductCard() {
  return (
      <Container>
        <Image></Image>
        <Content>
          <Name>Apple</Name>
          <Description>Des</Description>
          <PriceQtyWrapper>
            <PricesWrapper>
              <RegPrice>$12.00</RegPrice>
              <DisPrice>$10.00</DisPrice>
            </PricesWrapper>
            <QtyWrapper>
              <Text> - </Text>
              <Text> 1 </Text>
              <Text> + </Text>
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
  flex: 1;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: flex-end;
`;
const PricesWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-end;
`;
const Name = styled.Text`
  margin-bottom: 10px;
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
      background-color: white;
      width: 100%;
      max-width: 500px;
      position: relative;
      padding: 0 10px 0 5px;
`;
const Content = styled.View`
      /* position: absolute; */
      flex: 2;
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
const Image = styled.View`
      flex: 1;
      width: 100px;
      height: 100px;
      background-color: lightblue;

`;