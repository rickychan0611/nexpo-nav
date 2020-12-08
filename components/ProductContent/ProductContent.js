import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Icon } from 'react-native-elements'

import styled from "styled-components/native";
import { Context } from "../../context/Context";

import {handleMinus, handlePlus} from  "../../hooks/onPlusMinusQty";

export default function ProductContent({item}) {
  const { newOrderProductList, setNewOrderProductList, counter, setCounter } = useContext(Context);
  const ctx = useContext(Context);

  let idArray = [];
  let index;

  if (newOrderProductList[0]) {
    newOrderProductList.forEach(id => {
      idArray.push(id.productId);
    });
    index = idArray.indexOf(item.uid)
  }

  useEffect(() => {
    if (newOrderProductList[0]) {
      newOrderProductList.forEach(e => {
        if (e.productId == item.id) {
          setCounter(e.quantity)
        }
      })
    }
  }, [newOrderProductList])

  useEffect(() => {
    setCounter(prev => prev)
  }, [counter])

  useEffect(() => {
    setNewOrderProductList(prev => prev)
  }, [newOrderProductList])

  return (
        <View>
        <Name>{item.chineseName + " / " + item.englishName}</Name>
        {/* <Description>{item.ch_description}</Description>
        <Description>{item.en_description}</Description> */}
        {/* <Description>Stock: {item.qty}</Description> */}

        <PriceQtyWrapper>

            <PricesWrapper>
              <RegPrice>${(+item.original_price).toFixed(2)}</RegPrice>
              <DisPrice>${(+item.final_price).toFixed(2)}</DisPrice>
            </PricesWrapper>

            <QtyWrapper>
              
              <Icon
                name='plus-circle'
                type='font-awesome-5'
                color='primary'
                size={20}
                onPress={() => { handlePlus(item, ctx) }}
              />
              {newOrderProductList[index] && newOrderProductList[index].quantity > 0 ?
              <>
              <Qty>{newOrderProductList[index].quantity}</Qty>
              <Icon
                name='minus-circle'
                type='font-awesome-5'
                color='grey'
                size={20}
                onPress={() => { handleMinus(item, ctx) }}
              />
              </>: null }
            </QtyWrapper>

        </PriceQtyWrapper>
        </View>
  )
};

const PriceQtyWrapper = styled.View`
  /* flex: 1; */
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  width: 100%;
`;
const QtyWrapper = styled.View`
  flex: 3;
  width: 100%;
  flex-direction: row-reverse;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-end;
`;
const PricesWrapper = styled.View`
  flex: 3;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-end;
`;
const Name = styled.Text`
  font-size: 15px;
  margin-top: 6px;
  margin-bottom: 5px;
  font-weight: bold;
`;
const Qty = styled.Text`
  color: black;
  font-size: 16px;
  margin: ${Platform.OS === 'web' ? "0 10px 2px 10px" : "0 10px 0px 10px"};
`;
const Description = styled.Text`
  font-size: 12px;
  color: gray;
  margin-bottom: 5px;

`;
const RegPrice = styled.Text`
text-decoration: line-through;
`;
const DisPrice = styled.Text`
color: primary;
/* font-weight: bold; */
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
// const Content = styled.View`
//       /* position: absolute; */
//       flex: 3;
//       flex-direction: column;
//       flex-wrap: nowrap;
//       align-items: flex-start;
//       justify-content: space-between;
//       background-color: white;
//       width: 100%;
//       min-height: 100px;
//       padding: 0 10px 5px 10px;
      
// `;
const Image = styled.Image`
      flex: 2;
      width: 100px;
      height: 100px;
      background-color: white;
      resize-mode: contain;
`;