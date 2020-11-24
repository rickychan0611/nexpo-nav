
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { ScrollView, Text, TouchableOpacity, Platform } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import { Icon } from 'react-native-elements'
import CartCheckoutBar from "../components/CartCheckoutBar";
import {handleMinus, handlePlus} from  "../hooks/onPlusMinusQty";

import BottomBar from "../components/BottomBar";
import ImageSwiper from "../components/ImageSwiper";
import Divider from "../components/Divider";

export default function Product() {
  const { getParam } = useRouting()
  const id = getParam('id')

  const [counter, setCounter] = useState(0);
  const { newOrderProductList, setNewOrderProductList, selectedItem, setTotal } = useContext(Context);
  const ctx = useContext(Context);

  let idArray = [];
  let index;

  if (newOrderProductList[0]) {
    newOrderProductList.forEach(item => {
      idArray.push(item.productId);
    });
    index = idArray.indexOf(selectedItem.uid)
  }

  useEffect(() => {
    if (newOrderProductList[0]) {
      newOrderProductList.forEach(e => {
        if (e.productId == selectedItem.uid) {
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
    console.log("newOrderProductList in details", newOrderProductList)
  }, [newOrderProductList])


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
            <ImageSwiper images={selectedItem.images} />
            <Divider tall="3px" />
            <Content>
              <Name>{selectedItem.chineseName + " " + selectedItem.englishName}</Name>

              <ScrollView style={{ width: "100%", marginBottom: 10 }}>
                <Description>{selectedItem.ch_description + "\n" + selectedItem.en_description}</Description>
              </ScrollView>
              
              <PriceQtyWrapper>
                <PricesWrapper>
                  <RegPrice>${(+selectedItem.original_price).toFixed(2)}</RegPrice>
                  <DisPrice>${(+selectedItem.final_price).toFixed(2)}</DisPrice>
                </PricesWrapper>

                <QtyWrapper>

                  <Icon
                    name='plus-circle'
                    type='font-awesome-5'
                    color='red'
                    size={20}
                    onPress={() => { handlePlus(selectedItem, ctx) }}
                  />
                  {newOrderProductList[index] && newOrderProductList[index].quantity > 0 ?
                    <>
                      <Qty>{newOrderProductList[index].quantity}</Qty>
                      <Icon
                        name='minus-circle'
                        type='font-awesome-5'
                        color='grey'
                        size={20}
                        onPress={() => { handleMinus(selectedItem, ctx) }}
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
    font-Size: 20px;
    margin-top: 6px;
    font-weight: 500;
    margin-bottom: 10px;
    padding: 10px 20px 0 20px;
`;
const Description = styled.Text`
    font-size: 16px;
    color: gray;
    margin-bottom: 10px;
    padding: 5px 20px 0 20px;
`;
const PriceQtyWrapper = styled.View`
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