
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../context/Context";
import { Divider, IconButton, Headline } from "react-native-paper";
import { Image, Platform, ScrollView, View, Text } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import moment from "moment";

import BottomBar from "../components/BottomBar";
import TotalDetails from "../components/TotalDetails";

import Loader from "../components/Loader";
export default function order() {
  const { navigate, goBack } = useRouting();
  const [loading, setLoading] = useState(false);

  const {
    selectedOrder
  } = useContext(Context);

  useEffect(()=>{
    setLoading(true)
    console.log(selectedOrder)
    if (!selectedOrder) {
      setLoading(false)
      navigate({
        routeName: "account"
      })
    }
    else setLoading(false)
  }, [])

  return (
    <>
      { loading || !selectedOrder ? 
      <Loader />
      :
      <>
      <ContextArea>
        <IconButton icon="arrow-left" onPress={()=>{
          goBack()
        }}/>
        <ScrollView>
          <Headline
            style={{
              padding: 25
            }}
          >
            Order #{selectedOrder &&  selectedOrder.orderId}</Headline>
          <Title style={{
              paddingLeft: 25
            }}>{moment(selectedOrder.createAt.toDate()).format("MMM. DD, YYYY, hh:mm A")}</Title>
          <Divider />

        {selectedOrder && selectedOrder.orderItems[0] && selectedOrder.orderItems.map(item => {
        return (
          <View key={item.uid} >
            <ItemsContainer key={item.uid}>
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
            <Divider />
          </View>
        )
      })}

          <Divider />

          <TotalDetails total={selectedOrder ? selectedOrder.total_amt : 0}/>
         
          <Divider />

          <View style={{ height: 100 }}></View>

        </ScrollView>
      </ContextArea>
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
      }
    </>
  );
}

const ItemsContainer = styled.View`
  width: ${Platform.OS === "web" ? `100vw` : `null`};
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 500px;
  padding: 15px 40px 15px 25px;
`;

const Qty = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
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
  /* padding-bottom: ${Platform.OS === "web" ? `35px` : `95px`}; */
`;
