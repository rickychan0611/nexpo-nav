
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import { Divider, TextInput, Headline, HelperText } from "react-native-paper";
import { db } from "../../firebaseApp";
import { Image, Platform, ScrollView, Text, View } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import emptyCart from "../../public/emptyCart.jpg"
import validator from 'validator';

import BottomBar from "../../components/BottomBar";
import ProductCard from "../../components/ProductCard";
import CartCheckoutBar from "../../components/CartCheckoutBar";
import CartItems from "../../components/CartItems";
import AddressForm from "../../components/AddressForm";
import { forEach } from "react-native-elevation";
import Loader from "../../components/Loader";

export default function Cart() {
  const { navigate } = useRouting();
  const [loading, setLoading] = useState(false);
  const [pointErr, setPointErr] = useState("");
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

    else if (!user) {
      navigate({
        routeName: "account",
      })
    }

    else {
      navigate({
        routeName: "checkout/shipping",
      })
    }
  }

  const handleChanage = (value) => {
    setRedeemPoint(value)
  }

  useEffect(() => {
    setNewOrderProductList(prev => prev)
  }, [newOrderProductList])

  useEffect(() => {
    setLoading(false)
    if (user) {
      db.collection('addressBook').where("userId", "==", user.uid).get()
        .then((snapshot) => {
          !snapshot.empty && snapshot.forEach((doc) => {
            setShippingAddress(prev => ({ ...prev, ...doc.data() }))
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [user])

  const shippingFee = (total) => {
    if (+total > 60) {
      return "FREE"
    }
    else return "$8.00"
  }

  const totalAmt = (total) => {
    let shipping = 8
    if (+total > 60) {
      shipping = 0
    }
    return (+total * 1.15 - (+redeemPoint / 1000) + shipping).toFixed(2)
  }

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
            <>
              <CartItems />

              {/***** POINTS REDEM ******/}
              {/* <View style={{ padding: 25 }}>
                <Text>Your points: {user.points} (eg. 1,000 points = $1 value)</Text>
                <TextInput
                  label="Redeem your point"
                  placeholder='Enter the number of points'
                  theme={{ colors: { primary: "grey" } }}
                  mode="outlined"
                  dense
                  value={redeemPoint}
                  onChangeText={value => {
                    if (value.slice(value.length - 1) === ".") {
                      return
                    }
                    if ((!value || validator.isInt(value))) {
                      setPointErr("")
                      handleChanage(value)
                    }
                    else {
                      setPointErr("You can enter number only.")
                    }
                    if (+value <= user.points && +value >= 0) {
                      setPointErr("")
                      handleChanage(value)
                    }
                    else {
                      setPointErr('Value has to be smaller or equal to "' + user.points + '"')
                      setTimeout(() => {
                        handleChanage("")
                      }, 700)
                    }
                  }}
                  keyboardType="phone-pad"
                  returnKeyLabel="done"
                  textContentType="oneTimeCode"
                  error={pointErr}
                />
                <HelperText type="error" visible={pointErr}>
                  {pointErr}
                </HelperText>
              </View> */}


              <Divider />
              <TotalContainer style={{ paddingTop: 20, paddingRight: 30 }}>
                <Content ><Text style={{ color: "grey" }}>Subtotal:</Text></Content>
                <Price ><Text style={{ color: "grey" }}>${total.toFixed(2)}</Text></Price>
              </TotalContainer>

              {/*****Discount *****/}
              {/* <TotalContainer style={{ paddingRight: 30 }}>
                <Content ><Text style={{ color: "grey" }}>Discount:</Text></Content>
                <Price ><Text style={{ color: "grey" }}>-${(+redeemPoint / 1000).toFixed(2)}</Text></Price>
              </TotalContainer> */}


              <TotalContainer style={{ paddingRight: 30 }}>
                <Content ><Text style={{ color: "grey" }}>Shipping: (Free over $60) </Text></Content>
                <Price ><Text style={{ color: "grey" }}>{shippingFee(total)}</Text></Price>
              </TotalContainer>
              <TotalContainer style={{ paddingRight: 30 }}>
                <Content ><Text style={{ color: "grey" }}>Taxes:</Text></Content>
                <Price ><Text style={{ color: "grey" }}>${(+total * 0.15).toFixed(2)}</Text></Price>
              </TotalContainer>
              <TotalContainer style={{ paddingBottom: 20, paddingRight: 30 }}>
                <Content ><Text style={{ color: "black" }}>Total:</Text></Content>
                <Price ><Text style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>
                  ${totalAmt(total)}
                </Text></Price>
              </TotalContainer>
              <Divider />
            </>
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

          {/* <AddressForm err={err} setErr={setErr} /> */}

          <View style={{ height: 100 }}></View>

        </ScrollView>
      </ContextArea>

      {newOrderProductList[0] && <CartCheckoutBar onSubmit={onSubmit} />}

    </>
  );
}

const TotalContainer = styled.View`
  width: ${Platform.OS === "web" ? `100vw` : `null`};
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 900px;
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
  height: ${Platform.OS === "web" ? `calc(100vh - 60px) ` : `100%`};
  max-width: 900px;
  background-color: white;
`;
