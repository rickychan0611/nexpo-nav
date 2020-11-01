import React, {useContext} from "react";
import { View, Text, StyleSheet } from "react-native";

import styled from "styled-components/native";

export default function ProductCard() {
  return (
      <Card>
        <Image></Image>
        <Content>
          <Text>Apple</Text>
        </Content>
      </Card>
    )
};

const Card = styled.View`
      flex: 1;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: flex-start;
      background-color: white;
      width: 100%;
      max-width: 500px;
`;
const Content = styled.View`
      flex: 2;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: flex-start;
      background-color: white;
      width: 100%;
      background-color: lightpink;

`;
const Image = styled.View`
      flex: 1;
      width: 100px;
      height: 100px;
      background-color: lightblue;

`;