
import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Context } from "../context/Context";
import { ThemeContext } from "../context/ThemeContext";
import { Card, Button } from 'react-native-elements';
import { Divider, TextInput } from "react-native-paper";

import { TouchableOpacity, Platform, ScrollView, Text, View } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";

import BottomBar from "../components/BottomBar";
import ProductCard from "../components/ProductCard";
import CartCheckoutBar from "../components/CartCheckoutBar";
import CartItems from "../components/CartItems";
import ShippingAddress from "../components/ShippingAddress";

export default function Cart() {
  const { navigate } = useRouting();
  const { 
    total, 
    newOrderProductList, setNewOrderProductList, 
    redeemPoint, setRedeemPoint,
    shippingAddress, setShippingAddress
  } = useContext(Context);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setNewOrderProductList(prev => prev)
    console.log("newOrderProductList::::")
    console.log(newOrderProductList)
  }, [newOrderProductList])

  const handleChange = (value) => {
    setRedeemPoint(value)
  }

  useEffect(() => {

  }, [])

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
          zIndex: 1000
        }}>Your order</Title>
      <ContextArea>
        <ScrollView>
          <CartItems />
          <View style={{ padding: 25 }}>
            <Text>Your points: 10000</Text>
            <TextInput
              label="Redeem your point"
              placeholder='Enter the number of points that you want to redeem'
              style={{ backgroundColor: theme.InputBoxBackgroundColor }}
              theme={{ colors: { primary: "grey" } }}
              mode="outlined"
              dense
              value={redeemPoint}
              onChangeText={value => { handleChanage(value) }}
            // error={catErrMsg.englishName}
            />
          </View>
          <Divider />

          <TotalContainer style={{ paddingTop: 20 }}>
            <Content ><Text style={{ color: "grey" }}>Subtotal:</Text></Content>
            <Price ><Text style={{ color: "grey" }}>${total.toFixed(2)}</Text></Price>
          </TotalContainer>
          <TotalContainer >
            <Content ><Text style={{ color: "grey" }}>Discount:</Text></Content>
            <Price ><Text style={{ color: "grey" }}>-$0.00</Text></Price>
          </TotalContainer>
          <TotalContainer >
            <Content ><Text style={{ color: "grey" }}>Taxes:</Text></Content>
            <Price ><Text style={{ color: "grey" }}>${(+total * 0.15).toFixed(2)}</Text></Price>
          </TotalContainer>
          <TotalContainer style={{ paddingBottom: 20 }}>
            <Content ><Text style={{ color: "black" }}>Total:</Text></Content>
            <Price ><Text style={{ color: "black" }}>${(+total * 1.15).toFixed(2)}</Text></Price>
          </TotalContainer>

          <Divider />

          <ShippingAddress/>      

        </ScrollView>
      </ContextArea>
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

const TotalContainer = styled.View`
  width: ${Platform.OS === "web" ? `100vw` : `null`};
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 500px;
  padding: 5px 25px 5px 25px;

`;
const Content = styled.View`
  flex: 10;
  justify-content: center;
  align-items: flex-start;
`;
const Price = styled.View`
  flex: 2;
  justify-content: center;
  align-items: flex-end;
`;
const Title = styled.Text`
  font-size: 18px;
  width: 100%;
  padding: 15px;
  background-color: white;   
`;
const ContextArea = styled.View`
  /* flex: 1; */
  width: ${Platform.OS === "web" ? `100vw` : `100%`};
  height: ${Platform.OS === "web" ? `calc(100vh - 54px) ` : `100%`};
  max-width: 500px;
  background-color: white;
  padding-bottom: ${Platform.OS === "web" ? `124px` : `190px`};
`;
