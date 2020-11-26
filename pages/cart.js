
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

export default function Cart() {
  const { navigate } = useRouting();
  const {
    total, user,
    newOrderProductList, setNewOrderProductList,
    redeemPoint, setRedeemPoint,
    shippingAddress, setShippingAddress
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

  const onSubmit = () => {
    setErr(shippingDefault)

    let validate = new Promise((resolve, reject) => {

      if (!shippingAddress.firstName) {
        setErr(prev => ({ ...prev, firstName: "Required" }))
        reject()
      }
      if (!shippingAddress.lastName) {
        setErr(prev => ({ ...prev, lastName: "Required" }))
        reject()
      }
      if (!shippingAddress.address1) {
        setErr(prev => ({ ...prev, address1: "Required" }))
        reject()
      }
      if (!shippingAddress.city) {
        setErr(prev => ({ ...prev, city: "Required" }))
        reject()
      }
      if (!shippingAddress.province) {
        setErr(prev => ({ ...prev, province: "Required" }))
        reject()
      }
      if (!shippingAddress.country) {
        setErr(prev => ({ ...prev, country: "Required" }))
        reject()
      }
      if (!shippingAddress.postalCode) {
        setErr(prev => ({ ...prev, postalCode: "Required" }))
        reject()
      }
      if (!shippingAddress.phoneNumber) {
        setErr(prev => ({ ...prev, phoneNumber: "Required" }))
        reject()
      }
      else resolve()
    })

    validate.then(() => {

      const orderRef = db.collection("order").doc()
      const shippingAddressRef = db.collection("shippingAddresses").doc()
      const timestamp = new Date()

      shippingAddressRef.set({
        ...shippingAddress,
        uid: shippingAddressRef.id,
        createAt: timestamp,
        userId: user.email
      })
        .then(() => {
          //reset everything after sumbitting to server
          // setProduct(productInitValue)
          // setSelectedCategory([])
          navigate({
            routeName: "home"
          })
        })
        .catch(error => console.log(error))
    })
  }

  useEffect(() => {
    setNewOrderProductList(prev => prev)
    console.log("newOrderProductList::::")
    console.log(newOrderProductList)
  }, [newOrderProductList])


  return (
    <>
      <ContextArea>
        <ScrollView>
          <Headline
            style={{
              padding: 25
            }}
          >
            Your order</Headline>

          <Divider />

          <CartItems />

          <View style={{ padding: 25 }}>
            <Text>Your points: 10000</Text>
            <TextInput
              label="Redeem your point"
              placeholder='Enter the number of points that you want to redeem'
              theme={{ colors: { primary: "grey" } }}
              mode="outlined"
              dense
              value={redeemPoint}
              onChangeText={value => { handleChanage(value) }}
            // error={catErrMsg.englishName}
            />
          </View>
          <Divider />

          <TotalContainer style={{ paddingTop: 20, paddingRight: 40 }}>
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
          </TotalContainer>

          <Divider />

          <ShippingAddress err={err} setErr={setErr} />

          <View style={{ height: 100 }}></View>

        </ScrollView>
      </ContextArea>

      <CartCheckoutBar onSubmit={onSubmit} />

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

const TotalContainer = styled.View`
  width: ${Platform.OS === "web" ? `100vw` : `null`};
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 500px;
  padding: 5px 25px 5px 25px;

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
