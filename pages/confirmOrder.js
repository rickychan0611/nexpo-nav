
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../context/Context";
import { ThemeContext } from "../context/ThemeContext";

import { Divider, Surface, Headline, IconButton, RadioButton } from "react-native-paper";
import { db } from "../firebaseApp";
import { TouchableOpacity, Platform, ScrollView, Text, View } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";

import BottomBar from "../components/BottomBar";
import ProductCard from "../components/ProductCard";
import CartCheckoutBar from "../components/CartCheckoutBar";
import CartItems from "../components/CartItems";
import AddressForm from "../components/AddressForm";
import { forEach } from "react-native-elevation";
import ConfirmOrderBar from "../components/ConfirmOrderBar";

export default function confirmOrder() {
  const { navigate, goBack } = useRouting();
  const { theme } = useContext(ThemeContext);

  const {
    total, user,
    newOrderProductList, setNewOrderProductList,
    shippingAddress, setShippingAddress,
    deliveryMsg, setSelected,
    paymentMethod,
    selectedCard, setSelectedCard,
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
    console.log(selectedCard)
    if (!user || !shippingAddress) {
      setSelected("cart")
      navigate({
        routeName: "cart",
      })
    }
  }, [])

  return (
    <>
      <ContextArea>
        <IconButton icon="arrow-left"
          onPress={() => { navigate({ routeName: "checkout/choose-card" }) }} />
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // width: Platform.OS === "web" ? "100vw" : "100%",
            }}>

            <Headline
              style={{
                paddingBottom: 20,
                fontWeight: "bold",
                color: theme.black
              }}
            >
              Review
            </Headline>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "nowrap",
              width: Platform.OS === "web" ? "100vw" : "100%",
              maxWidth: 900,
              marginBottom: 10
            }}>
            <IconButton icon="circle" size={14} color={theme.lightGrey} />
            <IconButton icon="circle" size={14} color={theme.lightGrey} />
            <IconButton icon="circle" size={14} color={theme.lightGrey} />
            <IconButton icon="circle" size={14} color={theme.green} />
          </View>
          <Divider />

          <Title style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 16,
            marginHorizontal: 10,
            marginVertical: 20
          }}>
            Before ordering, please review your information, including your order details, below.
              </Title>

          <Divider />

          <View style={{
            backgroundColor: theme.lightGrey,
            padding: 20,
            marginBottom: 20
          }}>
            <TableRow style={{ paddingTop: 20, paddingBottom: 15 }}>
              <Text style={{ fontSize: 18 }}>Order Total</Text>
            </TableRow>
            <Divider />
            <TableRow style={{ paddingTop: 10 }}>
              <Left><Text style={{ color: "grey" }}>Product Total</Text></Left>
              <Right><Text style={{ color: "grey" }}>${total.toFixed(2)}</Text></Right>
            </TableRow>
            <TableRow style={{ paddingRight: 25 }}>
              <Left><Text style={{ color: "grey" }}>Discount</Text></Left>
              <Right><Text style={{ color: "grey" }}>-$0.00</Text></Right>
            </TableRow>
            <TableRow style={{ paddingRight: 25 }}>
              <Left><Text style={{ color: "grey" }}>Shipping</Text></Left>
              <Right><Text style={{ color: "grey" }}>FREE</Text></Right>
            </TableRow>
            <TableRow style={{ paddingRight: 25, paddingBottom: 15 }}>
              <Left><Text style={{ color: "grey" }}>GST</Text></Left>
              <Right><Text style={{ color: "grey" }}>${(+total * 0.15).toFixed(2)}</Text></Right>
            </TableRow>
            <Divider />
            <TableRow style={{ paddingTop: 20, paddingBottom: 20, paddingRight: 25 }}>
              <Left><Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>You Pay:</Text></Left>
              <Right><Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>${(+total * 1.15).toFixed(2)}</Text></Right>
            </TableRow>
          </View>

          <Title style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 16,
            marginHorizontal: 10,
            paddingTop: 10
          }}>
            Shipping Address
              </Title>


          {shippingAddress &&
            <>
              <TableRow style={{ paddingRight: 40 }}>
                <AddressLeft><Text style={{ color: "grey", textAlign: "left" }}>
                  {shippingAddress.firstName + " " + shippingAddress.lastName + "\n"}
                  {shippingAddress.address1 + "\n"}
                  {shippingAddress.address2 && shippingAddress.address2 + "\n"}
                  {shippingAddress.city + "\n"}
                  {shippingAddress.province + ", "}
                  {shippingAddress.country + "\n"}
                  {shippingAddress.postalCode + "\n"}
                  {shippingAddress.phoneNumber + "\n"}
                </Text></AddressLeft>
              </TableRow>
              {shippingAddress.message ?
                <TableRow style={{ paddingTop: 10, paddingRight: 40 }}>
                  <AddressLeft><Text style={{ color: "grey", textAlign: "left" }}>Note:</Text></AddressLeft>
                  <AddressLeft><Text style={{ color: "grey", textAlign: "left" }}>{shippingAddress.message}</Text></AddressLeft>
                </TableRow>
                : null}


              {/* <Title style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 16,
                marginHorizontal: 10,
                paddingTop: 10
              }}>
                Billing Address
                  </Title>
                  <TableRow style={{ paddingRight: 40 }}>
                    <AddressLeft><Text style={{ color: "grey", textAlign: "left" }}>
                      {shippingAddress.firstName + " " + shippingAddress.lastName + "\n"}
                      {shippingAddress.address1 + "\n"}
                      {shippingAddress.address2 && shippingAddress.address2 + "\n"}
                      {shippingAddress.city + "\n"}
                      {shippingAddress.province + ", "}
                      {shippingAddress.country + "\n"}
                      {shippingAddress.postalCode + "\n"}
                      {shippingAddress.phoneNumber + "\n"}
                    </Text></AddressLeft>
                  </TableRow>
              {shippingAddress.message ?
                <TableRow style={{ paddingTop: 10, paddingRight: 40 }}>
                  <AddressLeft><Text style={{ color: "grey", textAlign: "left" }}>Note:</Text></AddressLeft>
                  <AddressLeft><Text style={{ color: "grey", textAlign: "left" }}>{shippingAddress.message}</Text></AddressLeft>
                </TableRow>
                : null} */}

            </>}


          <Title style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 16,
            marginHorizontal: 10,
            paddingTop: 10
          }}>
            Payment Information
          </Title>

          <TableRow style={{ paddingRight: 40 }}>
            <AddressLeft><Text style={{ color: "grey" }}>
              {paymentMethod === "cash" ?
                "Pay upon delivery" :
                <>
                  {
                    selectedCard && <>
                      <Text style={{ fontWeight: "bold", fontSize: 15 }}>{selectedCard.card.name.split(',')[0] + "\n"}</Text>
                      <Text>{selectedCard.card.number + "\n"}</Text>
                      <Text>Expiry Date: {selectedCard.card.expiry_month + "/" + selectedCard.card.expiry_year + "\n"}</Text>
                    </>
                  }
                </>
              }
            </Text></AddressLeft>
          </TableRow>


          <TableRow style={{ paddingTop: 40, paddingBottom: 15 }}>
            <Text style={{ fontSize: 18 }}>Your order details.</Text>
          </TableRow>

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


          <View style={{ height: 200 }}></View>

        </ScrollView>
      </ContextArea>

      <ConfirmOrderBar />

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
  /* width: ${Platform.OS === "web" ? `100vw` : `null`}; */
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 900px;
  padding: 5px 25px 5px 25px;
`;
const AddressLeft = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Left = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Right = styled.View`
  flex: 2;
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
  max-width: 900px;
  background-color: white;
  /* padding-bottom: ${Platform.OS === "web" ? `35px` : `95px`}; */
`;
