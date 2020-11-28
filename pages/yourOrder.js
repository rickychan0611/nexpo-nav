
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../context/Context";
import { Divider, TextInput, Headline } from "react-native-paper";
import { db } from "../firebase";
import { Image, Platform, ScrollView, Text, View } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import emptyCart from "../public/emptyCart.jpg"

import BottomBar from "../components/BottomBar";
import TotalDetails from "../components/TotalDetails";
import CartCheckoutBar from "../components/CartCheckoutBar";
import CartItems from "../components/CartItems";
import ShippingAddress from "../components/ShippingAddress";

import Loader from "../components/Loader";

export default function yourOrder() {
  const { navigate } = useRouting();
  const [loading, setLoading] = useState(false);

  const {
    total, user, setSelected,
    newOrderProductList, setNewOrderProductList,
    redeemPoint, setRedeemPoint,
    shippingAddress, setShippingAddress,
    deliveryMsg, setDeliveryMsg
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

  const [err, setErr] = useState(shippingDefault);

  return (
    <>
      {loading && <Loader />}
      <ContextArea>
        <ScrollView>
          <Headline
            style={{
              padding: 25
            }}
          >
            Your order</Headline>

          <Divider />

          {newOrderProductList[0] ?
            <CartItems />
            :
            <>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  style={{
                    width: 200,
                    height: 200,
                    resizeMode: "cover"
                  }}
                  source={emptyCart} />
                <Title style={{ textAlign: "center" }}>Your shopping cart is empty!</Title>
              </View>
              <Divider />
            </>
          }

          <Divider />

          <TotalDetails total={total}/>
          {/* <TotalContainer style={{ paddingTop: 20, paddingRight: 40 }}>
            <Content ><Text style={{ color: "grey" }}>Subtotal:</Text></Content>
            <Price ><Text style={{ color: "grey" }}>${total.toFixed(2)}</Text></Price>
          </TotalContainer>
          <TotalContainer style={{ paddingRight: 40 }}>
            <Content ><Text style={{ color: "grey" }}>Discount:</Text></Content>
            <Price ><Text style={{ color: "grey" }}>-$0.00</Text></Price>
          </TotalContainer>
          <TotalContainer style={{ paddingRight: 40 }}>
            <Content ><Text style={{ color: "grey" }}>Taxes:</Text></Content>
            <Price ><Text style={{ color: "grey" }}>${(+total * 0.15).toFixed(2)}</Text></Price>
          </TotalContainer>
          <TotalContainer style={{ paddingBottom: 20, paddingRight: 40 }}>
            <Content ><Text style={{ color: "black" }}>Total:</Text></Content>
            <Price ><Text style={{ color: "black" }}>${(+total * 1.15).toFixed(2)}</Text></Price>
          </TotalContainer> */}

          <Divider />

          <ShippingAddress err={err} setErr={setErr} />

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
  );
}

// const TotalContainer = styled.View`
//   width: ${Platform.OS === "web" ? `100vw` : `null`};
//   flex-direction: row;
//   flex-wrap: nowrap;
//   max-width: 500px;
//   padding: 5px 25px 5px 25px;

// `;
// const Content = styled.View`
//   flex: 10;
//   justify-content: center;
//   align-items: flex-start;
// `;
// const Price = styled.View`
//   flex: 2;
//   justify-content: center;
//   align-items: flex-end;
// `;
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
