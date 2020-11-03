
import React, { useContext } from "react";
import { Context } from "../context/Context";
import { Card, Button } from 'react-native-elements';
import { View, Text } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import BottomBar from "../components/BottomBar";
import ProductCard from "../components/ProductCard";
import CartCheckoutBar from "../components/CartCheckoutBar";
import Elevations from 'react-native-elevation'

export default function Cart() {
  const { navigate } = useRouting();
  const { user } = useContext(Context);

  return (
    <>
      <ContextArea>
        <ScrollView>

          <Card containerStyle={{ padding: 0, margin: 0, ...Elevations[3]}}>
            <ProductCard />
          </Card>

          <Card containerStyle={{ padding: 0, margin: 0,...Elevations[3]}}>
            <ProductCard />
          </Card>
          <Card containerStyle={{ padding: 0, margin: 0,...Elevations[3]}}>
            <ProductCard />
          </Card>

        </ScrollView>
          <CartCheckoutBar/>
      </ContextArea>
      <BottomBar />
    </>
  );
}

const ContextArea = styled.View`
      flex: 1;
      align-items: center;
      background-color: #f5f5f5;
      width: 100%;
      max-width: 500px;

`;
const ScrollView = styled.ScrollView`
      /* flex: 1; */
      width: 100%;
      height: 100%;
      /* padding: 15px; */
`;
const MyText = styled.Text`
      font-size: 20px;
      margin: 20px;
`;