
import React, { useContext, useEffect } from "react";
import { Context } from "../context/Context";
import { Card, Button } from 'react-native-elements';
import { TouchableOpacity, Platform, ScrollView } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import BottomBar from "../components/BottomBar";
import ProductCard from "../components/ProductCard";
import CartCheckoutBar from "../components/CartCheckoutBar";
import CartItems from "../components/CartItems";
import Elevations from 'react-native-elevation'

export default function Cart() {
  const { navigate } = useRouting();
  const { user, newOrderProductList, setNewOrderProductList } = useContext(Context);

  useEffect(() => {
    setNewOrderProductList(prev => prev)
    console.log("newOrderProductList::::")
    console.log(newOrderProductList)
  }, [newOrderProductList])

  return (
    <>
      <Title
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.4,
          shadowRadius: 5,
          elevation: 10,
        }}>Your order</Title>

        <ScrollView>
          <CartItems />
          </ScrollView>

      <CartCheckoutBar />

      <BottomBar style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 10,
      }} />
    </>
  );
}

const Title = styled.Text`
    font-size: 20px;
    width: 100%;
    padding: 15px;
    background-color: white;
    /* margin-bottom: 5px; */
   
`;
const ContextArea = styled.View`
      flex: 1;
      align-items: center;
      width: ${Platform.OS === "web" ? `100vw` : `100%`};
      max-width: 500px;
`;

const Scroll = styled.ScrollView`
  
`;