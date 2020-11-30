
import React, { useContext, useState, useEffect } from "react";
import { Dimensions, View, Text, TouchableOpacity, Platform } from "react-native";
import { Headline, Surface, Divider, Switch  } from 'react-native-paper';

import { Context } from "../../../context/Context";
import { ThemeContext } from "../../../context/ThemeContext";
import { AdminContext } from "../../../context/AdminContext";
import styled from "styled-components/native";
import moment from "moment";
import { useRouting } from "expo-next-react-navigation";

import { db } from "../../../firebase";

export default function Orders() {
  let ScreenHeight = Dimensions.get("window").height;

  const { navigate } = useRouting();
  const { theme } = useContext(ThemeContext);
  const {
    listenOrders, unsubscribe,
    orders, setOrders
  } = useContext(AdminContext);

  const setComplete = (product) => {

    db.collection("orders").doc(product.productId).update(product)
  }

  useEffect(() => {
    listenOrders()
  }, [])

  return (
    <>

      <Container ScreenHeight={ScreenHeight} theme={theme}>

        <Headline style={{ color: theme.titleColor, marginTop: 20, marginBottom: 20 }}>Orders</Headline>

        {orders.map((order) => {
          return (
            <Surface style={{
              padding: 20,
              width: "100%",
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              elevation: 4,
              marginBottom: 20
            }}>
              <View key={order.orderId} style={{ width: "100%" }}>

                <View style={{ width: "100%", flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center" }}>
                  <Date style={{ flex: 2 }}>{moment(order.createAt.toDate()).format("MMM. DD, YYYY")} -- #{order.orderId}</Date>
                  <View style={{flex: 1,flexDirection: "row", flexWrap: "nowrap", 
                  justifyContent: "space-between", alignItems: "center", margin: 0}}>
                      <Text>Completed?</Text><Switch style={{transform: [{ scaleX: .6 }, { scaleY: .6 }]}}/>
                  </View>
                </View>
                {order.orderItems.map((item, index) => {
                  // console.log(item)
                  return (
                    // <Text>{item.quantity}</Text>
                    <TouchableOpacity key={index}
                      onPress={() => {
                        // setSelectedItem(item.item)
                        // navigate({
                        //   routeName: "product",
                        //   params: { id: item.item.uid },
                        //   web: { as: `/product?id=${item.item.uid}` },
                        // })
                      }}>
                      <Divider />

                      <ItemsContainer key={item.productId}>
                        <Qty>
                          <Text style={{ color: "green" }}>{item.quantity}X</Text>
                        </Qty>
                        <Content>
                          <Text style={{ fontSize: 16 }}>
                            {item.item.chineseName + " " + item.item.englishName}
                          </Text>
                        </Content>
                        <Price>
                          <Text style={{ textAlign: "right" }}>${(+item.item.final_price).toFixed(2)}</Text>
                        </Price>
                      </ItemsContainer>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </Surface>
          )
        })}
        {/* <View style={{ heigth: 40 }}></View> */}
      </Container>

    </>
  );
}

const Container = styled.ScrollView`
  /* flex: 1; */
  width: 100%;
  height: ${props => Platform.OS === "web" ? `120%` : props.ScreenHeight};
  /* margin-bottom: 20px; */
  padding: 10px;
  background-color: ${props => props.theme.lightGrey};
`;
const Date = styled.Text`
font-size: 14px;
  margin-bottom: 10px;
`;
const ItemsContainer = styled.View`
  /* width: ${Platform.OS === "web" ? `100%` : `null`}; */
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 440px;
  padding: 10px 0px 10px 0px;
`;

const Qty = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;
const Content = styled.View`
  flex: 8;
  justify-content: center;
  align-items: flex-start;
`;
const Price = styled.View`
  flex: 2;
  justify-content: center;
  align-items: flex-end;
`;
