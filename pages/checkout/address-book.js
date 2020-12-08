
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import { Divider, Button, Headline, IconButton, Surface } from "react-native-paper";
import { db } from "../../firebase";
import { Image, Platform, ScrollView, Text, View } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";

import BottomBar from "../../components/BottomBar";
import ShippingNextBtn from "../../components/ShippingNextBtn";
import Loader from "../../components/Loader";
import { route } from "next/dist/next-server/server/router";

export default function shipping() {
  const { navigate, getParam } = useRouting();

  const userId = getParam('userId')
  const type = getParam('type')

  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { shippingAddress, setShippingAddress } = useContext(Context);

  const {
    total, user, setSelected,
    newOrderProductList, setNewOrderProductList,
    primaryeemPoint, setprimaryeemPoint,
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
    
  }

  useEffect(() => {
    setNewOrderProductList(prev => prev)
  }, [newOrderProductList])

  useEffect(() => {
    setLoading(false)
    if (user) {
      db.collection('shippingAddresses').where("userId", "==", user.email).get()
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
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // width: Platform.OS === "web" ? "100vw" : "100%",
            }}>

            <Headline
              style={{
                padding: 25,
                paddingBottom: 0,
                fontWeight: "bold",
                color: theme.black
              }}
            >
              Checkout</Headline>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "nowrap",
              width: Platform.OS === "web" ? "100vw" : "100%",
              maxWidth: 500,
              marginBottom: 10
            }}>
            <IconButton icon="circle" size={14} color={theme.green} />
            <IconButton icon="circle" size={14} color={theme.lightGrey} />
            <IconButton icon="circle" size={14} color={theme.lightGrey} />
            <IconButton icon="circle" size={14} color={theme.lightGrey} />
          </View>
          <Divider />

          <Title style={{ color: "black", fontWeight: 700, fontSize: 16, marginHorizontal: 10 }}>
            Choose an address:
          </Title>
          <View style={{ marginBottom: 20, marginHorizontal: 20 }} >
            <Edit theme={theme}
              onPress={() => {
                navigate({
                  routeName: "checkout/new-address",
                  params: {
                    type, 
                    userId
                  }
                })
              }}>{"+ Add a New Address"}</Edit>
          </View>
          <Surface style={{ marginHorizontal: 20, borderWidth: 1, borderColor: theme.lightGrey }}>
            <View style={{ paddingHorizontal: 35, paddingVertical: 15 }}>
              <Text style={{ fontWeight: 600, fontSize: 15 }}>{shippingAddress.firstName} {shippingAddress.lastName}</Text>
              <Text>{shippingAddress.address1}</Text>
              <Text>{shippingAddress.address2}</Text>
              <Text>{shippingAddress.city}, {shippingAddress.province} {shippingAddress.postalCode}</Text>
              <Text>{shippingAddress.country}</Text>
              <Text>{shippingAddress.phoneNumber}</Text>
              <Text> </Text>
              <Button mode="contained" color={theme.primary} dark uppercase={false}
                labelStyle={{ fontSize: 14, fontWeight: 600 }}
                style={{ marginBottom: 10 }}
                onPress={() => {
                  navigate({
                    routeName: "addressBook",
                    params: {
                      type: "billing",
                      userId: user.email
                    }
                  })
                }}>Select</Button>
              <View style={{
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "center",
              }}>
                <Edit theme={theme}>Edit</Edit>
                <Text>{"     |     "}</Text>
                <Edit theme={theme} disabled>Delete</Edit>
              </View>
            </View>
          </Surface>



          <View style={{ height: 100 }}></View>
        </ScrollView>
      </ContextArea>

      <ShippingNextBtn onSubmit={onSubmit} />

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
const Edit = styled.Text`
 font-size: 14px;
 font-weight: 600;
 color: ${props => props.disabled ? props.theme.darkGrey : props.theme.primary}
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
