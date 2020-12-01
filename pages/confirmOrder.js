
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../context/Context";
import { Divider, TextInput, Headline } from "react-native-paper";
import { db } from "../firebase";
import { TouchableOpacity, Platform, ScrollView, Text, View } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";

import BottomBar from "../components/BottomBar";
import ProductCard from "../components/ProductCard";
import CartCheckoutBar from "../components/CartCheckoutBar";
import CartItems from "../components/CartItems";
import ShippingAddress from "../components/ShippingAddress";
import { forEach } from "react-native-elevation";
import ComfirmOrderBar from "../components/ComfirmOrderBar";

export default function confirmOrder() {
  const { navigate } = useRouting();
  const {
    total, user,
    newOrderProductList, setNewOrderProductList,
    redeemPoint, setRedeemPoint,
    shippingAddress, setShippingAddress,
    deliveryMsg, setSelected
  } = useContext(Context);

  const shippingDefault = {
    address1: "",
    address2: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
    phoneNumber: ""
  }

  useEffect(() => {
    if (!user || !shippingAddress || !newOrderProductList) {
      setSelected("cart")
      navigate({
        routeName: "cart",
      })
    }
  }, [])

  return (
    <>
      <ContextArea>
        <ScrollView>
          <Headline
            style={{
              padding: 25
            }}
          >
            Confirm Order</Headline>

          <Divider />

          <CartItems />

          <Divider />

          <TableRow style={{ paddingTop: 20, paddingRight: 25 }}>
            <Left><Text style={{ color: "grey" }}>Subtotal:</Text></Left>
            <Right><Text style={{ color: "grey" }}>${total.toFixed(2)}</Text></Right>
          </TableRow>
          <TableRow style={{ paddingRight: 25 }}>
            <Left><Text style={{ color: "grey" }}>Discount:</Text></Left>
            <Right><Text style={{ color: "grey" }}>-$0.00</Text></Right>
          </TableRow>
          <TableRow style={{ paddingRight: 25 }}>
            <Left><Text style={{ color: "grey" }}>Taxes:</Text></Left>
            <Right><Text style={{ color: "grey" }}>${(+total * 0.15).toFixed(2)}</Text></Right>
          </TableRow>
          <TableRow style={{ paddingBottom: 20, paddingRight: 25 }}>
            <Left><Text style={{ color: "black" }}>Total:</Text></Left>
            <Right><Text style={{ color: "black" }}>${(+total * 1.15).toFixed(2)}</Text></Right>
          </TableRow>

          <Divider />

          <Title>Delivery Info:</Title>

          <TableRow style={{ paddingTop: 10, paddingRight: 40 }}>
            <Left><Text style={{ color: "grey" }}>Receiver:</Text></Left>
            <Right><Text style={{ color: "grey" }}>{shippingAddress.firstName + " " + shippingAddress.lastName}</Text></Right>
          </TableRow>
          <TableRow style={{ paddingRight: 40 }}>
            <Left><Text style={{ color: "grey" }}>Address:</Text></Left>
            <Right><Text style={{ color: "grey", textAlign: "right" }}>
              {shippingAddress.address1 + "\n"}
              {shippingAddress.address2 && shippingAddress.address2 + "\n"}
              {shippingAddress.city + "\n"}
              {shippingAddress.province + ", "}
              {shippingAddress.country + "\n"}
              {shippingAddress.postalCode}
            </Text></Right>
          </TableRow>

          <TableRow style={{ paddingTop: 10, paddingRight: 40 }}>
            <Left><Text style={{ color: "grey" }}>Phone#:</Text></Left>
            <Right><Text style={{ color: "grey" }}>{shippingAddress.phoneNumber}</Text></Right>
          </TableRow>

          {shippingAddress.message ?
            <TableRow style={{ paddingTop: 10, paddingRight: 40 }}>
              <Left><Text style={{ color: "grey" }}>Note:</Text></Left>
              <Right><Text style={{ color: "grey" }}>{shippingAddress.message}</Text></Right>
            </TableRow>
            : null}

          <View style={{ height: 200 }}></View>

        </ScrollView>
      </ContextArea>

      <ComfirmOrderBar />

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

const TableRow = styled.View`
  width: ${Platform.OS === "web" ? `100vw` : `null`};
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 500px;
  padding: 5px 25px 5px 25px;
`;
const Left = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Right = styled.View`
  flex: 3;
  justify-content: flex-end;
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
