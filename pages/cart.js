
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../context/Context";
import { ThemeContext } from "../context/ThemeContext";
import { Divider, TextInput, Headline } from "react-native-paper";
import { db } from "../firebaseApp";
import { Image, Platform, ScrollView, Text, View } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import emptyCart from "../public/emptyCart.jpg"

import BottomBar from "../components/BottomBar";
import ProductCard from "../components/ProductCard";
import CartCheckoutBar from "../components/CartCheckoutBar";
import CartItems from "../components/CartItems";
import AddressForm from "../components/AddressForm";
import { forEach } from "react-native-elevation";
import Loader from "../components/Loader";

export default function Cart() {
  const { navigate } = useRouting();
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

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

  const onSubmit = () => {

    if (!newOrderProductList[0]) {
      alert("Your shopping Cart is empty. Please add something : )")
      return
    }

    navigate({
      routeName: "checkout/shipping",
    })
  }

  useEffect(() => {
    setNewOrderProductList(prev => prev)
  }, [newOrderProductList])

  useEffect(() => {
    setLoading(false)
    if (user) {
      db.collection('addressBook').where("userId", "==", user.uid).get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            setShippingAddress(prev => ({ ...prev, ...doc.data() }))
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [user])

  return (
    <>
      {loading && <Loader />}
      <ContextArea>
        <ScrollView>
          <Headline
            style={{
              padding: 25,
              fontWeight: "bold",
              color: theme.primary
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

          <TotalContainer style={{ paddingTop: 20, paddingRight: 30 }}>
            <Content ><Text style={{ color: "grey" }}>Subtotal:</Text></Content>
            <Price ><Text style={{ color: "grey" }}>${total.toFixed(2)}</Text></Price>
          </TotalContainer>
          <TotalContainer style={{ paddingRight: 30 }}>
            <Content ><Text style={{ color: "grey" }}>Discount:</Text></Content>
            <Price ><Text style={{ color: "grey" }}>-$0.00</Text></Price>
          </TotalContainer>
          <TotalContainer style={{ paddingRight: 30 }}>
            <Content ><Text style={{ color: "grey" }}>Taxes:</Text></Content>
            <Price ><Text style={{ color: "grey" }}>${(+total * 0.15).toFixed(2)}</Text></Price>
          </TotalContainer>
          <TotalContainer style={{ paddingBottom: 20, paddingRight: 30 }}>
            <Content ><Text style={{ color: "black" }}>Total:</Text></Content>
            <Price ><Text style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>${(+total * 1.15).toFixed(2)}</Text></Price>
          </TotalContainer>

          <Divider />

          {/* <AddressForm err={err} setErr={setErr} /> */}

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
  flex: 8;
  justify-content: center;
  align-items: flex-start;
`;
const Price = styled.View`
  flex: 6;
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
