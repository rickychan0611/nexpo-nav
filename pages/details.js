
import React, { useContext } from "react";
import { Context } from "../context/Context";
// import {  } from 'react-native-elements';
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import { Icon } from 'react-native-elements'

import BottomBar from "../components/BottomBar";
import ImageSwiper from "../components/ImageSwiper";
import Divider from "../components/Divider";
import ProductContent from "../components/ProductContent";

export default function Details() {
  const { navigate } = useRouting();
  const { user } = useContext(Context);
  const images = [
    'https://cdn3.volusion.com/hckyx.hepad/v/vspfiles/photos/CONC-REDAPPLE-2.jpg',
    'https://cdn3.volusion.com/hckyx.hepad/v/vspfiles/photos/CONC-REDAPPLE-2.jpg',
    'https://cdn3.volusion.com/hckyx.hepad/v/vspfiles/photos/CONC-REDAPPLE-2.jpg',
    'https://cdn3.volusion.com/hckyx.hepad/v/vspfiles/photos/CONC-REDAPPLE-2.jpg',
    'https://cdn3.volusion.com/hckyx.hepad/v/vspfiles/photos/CONC-REDAPPLE-2.jpg',
    'https://cdn3.volusion.com/hckyx.hepad/v/vspfiles/photos/CONC-REDAPPLE-2.jpg'
  ]
  return (
    <>
      <ContextArea>
        <ImageSwiper images={images} />
        <Divider tall="3px" />
        <Content>
        <Name>[Delicious Red] Apple (6pcs/order) </Name>
        {/* <Divider tall="2px" /> */}
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
      </ContextArea>
      <BottomBar />
    </>
  );
}

const ContextArea = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: white;
    width: 100%;
    max-width: 500px;
    margin-bottom: 60px;
    padding-bottom: 40px;
`;
const Content = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: white;
    width: 100%;
`;
const Name = styled.Text`
    /* flex: 1; */
    font-Size: 20px;
    margin-top: 6px;
    /* margin-bottom: 5px; */
    padding: 10px 20px 0 20px;
`;
const Description = styled.Text`
    /* flex: 1; */
    font-size: 16px;
    color: gray;
    margin-bottom: 10px;
    padding: 5px 20px 0 20px;
`;
const PriceQtyWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  padding: 5px 20px 0 20px;

`;
const QtyWrapper = styled.View`
  flex: 2;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-end;
`;
const PricesWrapper = styled.View`
  flex: 5;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-end;
`;
const Qty = styled.Text`
  color: black;
  font-size: 20px;
  /* margin-bottom: ${Platform.OS === 'web' ? "2px" : "0px"}; */
`;
const RegPrice = styled.Text`
font-size: 20px;
text-decoration: line-through;
`;
const DisPrice = styled.Text`
font-size: 20px;
color: red;
`;