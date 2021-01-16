
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { ScrollView, Text, View, Platform } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import { Icon } from 'react-native-elements'
import ViewCartBar from "../components/ViewCartBar";
import { handleMinus, handlePlus } from "../hooks/onPlusMinusQty";
import { db } from "../firebaseApp";

import BottomBar from "../components/BottomBar";
import ImageSwiper from "../components/ImageSwiper";
import Divider from "../components/Divider";
import { IconButton } from "react-native-paper";

export default function Product() {
  const { getParam, goBack } = useRouting()
  const id = getParam('id')

  const [counter, setCounter] = useState(0);
  const { newOrderProductList, setNewOrderProductList, selectedItem, setSelectedItem } = useContext(Context);
  const ctx = useContext(Context);

  let idArray = [];
  let index;

  if (newOrderProductList[0] && selectedItem) {
    newOrderProductList.forEach(item => {
      idArray.push(item.productId);
    });
    index = idArray.indexOf(selectedItem.uid)
  }

  useEffect(() => {
    if (newOrderProductList[0] && selectedItem) {
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
    if (!selectedItem && id) {
      db.collection("products").doc(id).get()
        .then((doc) => {
          !doc.empty && setSelectedItem(doc.data())
        })
    }
  }, [id])

  useEffect(() => {
    setNewOrderProductList(prev => prev)
    console.log("newOrderProductList in details", newOrderProductList)
  }, [newOrderProductList])


  return (
    <>
      <CartBarWrapper>
        {selectedItem &&
          <ContextArea>
            <IconButton
              onPress={() => {
                goBack()
              }}
              icon="arrow-left">
              {/* <Icon
                name='arrow-alt-circle-left'
                type='font-awesome-5'
                color='grey'
                size={30}
              /> */}
            </IconButton>

            <ImageSwiper images={selectedItem.images} />
            {/* <Divider tall="2px" /> */}
            <Content>
              <ScrollView>
                <Name>{selectedItem.chineseName + " " + selectedItem.englishName}</Name>

                <View style={{ width: "100%", marginBottom: 10 }}>
                  <Description>{selectedItem.ch_description + "\n" + selectedItem.en_description}</Description>
                </View>
              </ScrollView>
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10
              }}>
                <RegPrice>${(+selectedItem.original_price).toFixed(2)}</RegPrice>
                <Text style={{
                  color: "#999999",
                  fontSize: 14
                }}>/ {selectedItem.unit} </Text>
              </View>
              <DisPrice>${(+selectedItem.final_price).toFixed(2)}</DisPrice>

              <QtyWrapper>
                <Icon
                  name='plus-circle'
                  type='font-awesome-5'
                  color='red'
                  size={20}
                  onPress={() => { handlePlus(selectedItem, ctx) }}
                />
                <>
                  <Qty>{newOrderProductList[index] && newOrderProductList[index].quantity > 0 ? newOrderProductList[index].quantity : 0}</Qty>
                  <Icon
                    name='minus-circle'
                    type='font-awesome-5'
                    color='grey'
                    size={20}
                    onPress={() => { handleMinus(selectedItem, ctx) }}
                  />
                </>
              </QtyWrapper>
            </Content>

          </ContextArea>
        }
        {newOrderProductList.length > 0 ?
          <ViewCartBar />
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
    max-width: 900px;
    /* margin-bottom: 60px; */
    padding-bottom: 80px;
`;
const CartBarWrapper = styled.View`
      flex: 1;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      max-width: 900px;
      padding-bottom: 62px;
`;
const IconContainer = styled.View`
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1000;
    background-color: white;
    border-radius: 100;
    width : 30px;
    height: 30px
`;
const Content = styled.View`
    flex: 2;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: white;
    width: 100%;
    padding-right: 20px;
`;
const Name = styled.Text`
    font-Size: 20px;
    /* margin-top: 6px; */
    font-weight: 500;
    margin-bottom: 10px;
    padding: 10px 20px 0 20px;
`;
const Description = styled.Text`
    font-size: 14px;
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
  /* flex: 2; */
  width: 100%;
  flex-direction: row-reverse;
  flex-wrap: nowrap;
  /* justify-content: space-between; */
  align-items: center;
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
  margin: 0 20px 0 20px;
  /* margin-bottom: ${Platform.OS === 'web' ? "2px" : "0px"}; */
`;
const RegPrice = styled.Text`
font-size: 20px;
text-decoration: line-through;
margin: 0 10px 0 20px;
`;
const DisPrice = styled.Text`
font-size: 20px;
color: red;
margin-left: 20px;
`;