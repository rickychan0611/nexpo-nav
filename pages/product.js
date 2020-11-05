
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { ScrollView, Text, TouchableOpacity, Platform } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import { Icon } from 'react-native-elements'
import CartCheckoutBar from "../components/CartCheckoutBar";
import produce from "immer";

import BottomBar from "../components/BottomBar";
import ImageSwiper from "../components/ImageSwiper";
import Divider from "../components/Divider";

export default function Product() {
  const { navigate, push, getParam } = useRouting();
  const [counter, setCounter] = useState(0);
  const { newOrderProductList, setNewOrderProductList, selectedItem, setTotal } = useContext(Context);

  let idArray = [];
  const handlePlus = () => {

    if (newOrderProductList[0]) {
      newOrderProductList.forEach(item => {
        idArray.push(item.productId);
      });
    }

    if (counter < selectedItem.qty) {
      setCounter(prev => prev + 1);
      setTotal(prev => prev + +selectedItem.price)

      setNewOrderProductList(
        //update state object in nested array
        produce(
          prev => {
            if (prev[0]) {
              // check if current state contains the same id
              if (idArray.indexOf(selectedItem.id) === -1) {
                // if the ID is not found, push the new object into the state
                return [...prev, { item: selectedItem, productId: selectedItem.id, quantity: counter + 1, price: selectedItem.price }];
              }
              else {
                // if the ID is found, get the index and update prev state

                let index = idArray.indexOf(selectedItem.id)
                if (index !== -1) {
                  prev[idArray.indexOf(selectedItem.id)] = { selectedItem, productId: selectedItem.id, quantity: counter + 1, price: selectedItem.price };
                }
              }
            }
            // if state is empty, just return the value
            else return [{ item: selectedItem, productId: selectedItem.id, quantity: counter + 1, price: selectedItem.price }];
          }
        )
      );
    }
    else alert("Sorry, not enough stock.")
  }

  const handleMinus = () => {
    if (counter > 0) {
      setCounter(prev => prev - 1);
      setTotal(prev => prev - +selectedItem.price)

      // remove object if it is the last one
      if (counter === 1) {
        setNewOrderProductList(
          produce(prev => prev.filter(e => e.productId !== selectedItem.id))
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
              let index = idArray.indexOf(selectedItem.id)
              if (index !== -1) {
                prev[index] = { item: selectedItem, productId: selectedItem.id, quantity: counter - 1, price: selectedItem.price };
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
        if (e.productId == selectedItem.id) {
          setCounter(e.quantity)
        }
      })
    }
  }, [newOrderProductList])

  useEffect(() => {
    setCounter(prev => prev)
  }, [counter])

  useEffect(() => {
        console.log("selectedItem in details" , selectedItem)
        // console.log("newOrderProductList in details" , newOrderProductList)

  }, [])

  useEffect(()=>{
    setNewOrderProductList(prev => prev)
    console.log("newOrderProductList in details" , newOrderProductList)

  },[newOrderProductList])


  return (
    <>
      <CartBarWrapper>
        {Platform.OS === 'web' &&
          <IconContainer >
            <Link
              routeName="store"
              Web={{ scroll: false }}
            >
              <Icon
                name='arrow-alt-circle-left'
                type='font-awesome-5'
                color='grey'
                size={30}
              />
            </Link>
          </IconContainer>
        }
        {selectedItem &&
          <ContextArea>
            <ImageSwiper images={selectedItem.image} />
            <Divider tall="3px" />
            <Content>
              <Name>{selectedItem.name}</Name>
              {/* <Divider tall="2px" /> */}
              <ScrollView style={{ width: "100%", marginBottom: 10 }}>
                <Description>{selectedItem.description}</Description>
              </ScrollView>
              <PriceQtyWrapper>
                <PricesWrapper>
                  <RegPrice>${(+selectedItem.price).toFixed(2)}</RegPrice>
                  <DisPrice>${(+selectedItem.price).toFixed(2)}</DisPrice>
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
                    </> : null}
                </QtyWrapper>

              </PriceQtyWrapper>
            </Content>

          </ContextArea>
        }
        {newOrderProductList.length > 0 ?
          <CartCheckoutBar />
          : null}
      </CartBarWrapper>
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
    /* margin-bottom: 60px; */
    padding-bottom: 20px;
`;
const CartBarWrapper = styled.View`
      flex: 1;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      max-width: 500px;
      padding-bottom: 62px;
`;
const IconContainer = styled.View`
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1000;
`;
const Content = styled.View`
    flex: 2;
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
    font-weight: 500;
    margin-bottom: 10px;
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
  /* flex: 1; */
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  padding: 5px 20px 0 20px;

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
  flex: 5;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
`;
const Qty = styled.Text`
  color: black;
  font-size: 20px;
  /* margin-bottom: ${Platform.OS === 'web' ? "2px" : "0px"}; */
`;
const RegPrice = styled.Text`
font-size: 20px;
text-decoration: line-through;
margin: 0 10px 0 0;
`;
const DisPrice = styled.Text`
font-size: 20px;
color: red;
`;