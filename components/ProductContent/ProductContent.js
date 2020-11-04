import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Icon } from 'react-native-elements'
import produce from "immer";

import styled from "styled-components/native";
import { Context } from "../../context/Context";

export default function ProductContent({item}) {
  const [counter, setCounter] = useState(0);
  const { newOrderProductList, setNewOrderProductList, total, setTotal } = useContext(Context);
  let idArray = [];

  const handlePlus = () => {
    console.log("plus pressed")
    
    if (newOrderProductList[0]) {
      newOrderProductList.forEach(item => {
        idArray.push(item.productId);
      });
    }

    if (counter < item.qty) {
      setCounter(prev => prev + 1);
      setTotal(prev => prev + +item.price)

      setNewOrderProductList(
        //update state object in nested array
        produce(
          prev => {
            if (prev[0]) {
              // check if current state contains the same id
              if (idArray.indexOf(item.id) === -1) {
                // if the ID is not found, push the new object into the state
                return [...prev, { item, productId: item.id, quantity: counter + 1, price: item.price }];
              }
              else {
                // if the ID is found, get the index and update prev state

                let index = idArray.indexOf(item.id)
                console.log("index ", index)
                if (index !== -1) {
                  prev[idArray.indexOf(item.id)] = { item, productId: item.id, quantity: counter + 1, price: item.price };
                }
              }
            }
            // if state is empty, just return the value
            else return [{ item, productId: item.id, quantity: counter + 1, price: item.price }];
          }
        )
      );
    }
    else alert("Sorry, not enough stock.")
  }

  const handleMinus = () => {
    if (counter > 0) {
      setCounter(prev => prev - 1);
      setTotal(prev => prev - +item.price)

      // remove object if it is the last one
      if (counter === 1) {
        setNewOrderProductList(
          produce(prev => prev.filter(e => e.productId !== item.id))
        );
      }

      // update quantity if it is not the last one
      else if (counter > 1) {
        if (newOrderProductList[0]) {
          newOrderProductList.forEach(item => {
            idArray.push(item.productId);
          });
        }
        setNewOrderProductList(
          produce(prev => {
            if (prev[0]) {
              let index = idArray.indexOf(item.id)
              console.log("index ", index)
              if (index !== -1) {
                prev[index] = { item, productId: item.id, quantity: counter - 1, price: item.price };
                return
              }
            };
          })
        )
      }
    };
  };


  useEffect(() => {
    if (newOrderProductList[0]) {
      newOrderProductList.forEach(e => {
        if (e.productId == item.id) {
          console.log(e)
          console.log("counter: ", e.quantity)
          setCounter(e.quantity)
        }
      })
    }
  }, [])

  useEffect(() => {
    setCounter(prev => prev)
    console.log("counter: ", item.name + "::::" + counter)
  }, [counter])

  useEffect(() => {
    setNewOrderProductList(prev => prev)
  }, [newOrderProductList])

  return (
        <View>
        <Name>{item.name}</Name>
        <Description>{item.description}</Description>
        <Description>Stock: {item.qty}</Description>

        <PriceQtyWrapper>

            <PricesWrapper>
              <RegPrice>${(+item.price).toFixed(2)}</RegPrice>
              <DisPrice>${(+item.price).toFixed(2)}</DisPrice>
            </PricesWrapper>

            <QtyWrapper>
              
              <Icon
                name='plus-circle'
                type='font-awesome-5'
                color='red'
                size={20}
                onPress={() => { handlePlus() }}
              />
              {counter > 0 ?
              <>
              <Qty>{counter}</Qty>
              <Icon
                name='minus-circle'
                type='font-awesome-5'
                color='grey'
                size={20}
                onPress={() => { handleMinus() }}
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
  flex: 2;
  width: 100%;
  flex-direction: row-reverse;
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
  font-size: 18px;
  margin-top: 6px;
  margin-bottom: 5px;
  /* font-weight: bold; */
`;
const Qty = styled.Text`
  color: black;
  font-size: 16px;
  margin-bottom: ${Platform.OS === 'web' ? "2px" : "0px"};
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
color: red;
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