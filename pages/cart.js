
import React, { useContext, useEffect } from "react";
import { Context } from "../context/Context";
import { Card, Button } from 'react-native-elements';
import { TouchableOpacity } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import BottomBar from "../components/BottomBar";
import ProductCard from "../components/ProductCard";
import CartCheckoutBar from "../components/CartCheckoutBar";
import Elevations from 'react-native-elevation'

export default function Cart() {
  const { navigate } = useRouting();
  const { user, newOrderProductList, setNewOrderProductList } = useContext(Context);
  
  useEffect(()=>{
    setNewOrderProductList(prev => prev)
  },[newOrderProductList])

  return (
    <>
      <ContextArea>
      <Title>Your order</Title>
        <ProductContainer>
          {newOrderProductList && newOrderProductList.map((item) => {
            return (
              <ProductCard key={item.id} item={item.item} />
            )
          })}
        </ProductContainer>
        <CartCheckoutBar />
      </ContextArea>
      <BottomBar />
    </>
  );
}

const Title = styled.Text`
    font-size: 20px;
    width: 100%;
    padding: 15px;
    background-color: white;
    margin-bottom: 5px;

`;
const ContextArea = styled.View`
      flex: 1;
      align-items: center;
      background-color: #e8e6e6;
      width: 100%;
      max-width: 500px;
`;
const ProductContainer = styled.ScrollView`
      flex: 5;
      background-color: #e8e6e6;
      height: 100%;
      width: 100%;
      flex-direction: column;
`;
const MyText = styled.Text`
      font-size: 20px;
      margin: 20px;
`;