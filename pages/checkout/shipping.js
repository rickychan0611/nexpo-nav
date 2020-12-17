
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import { Divider, TextInput, Headline, IconButton } from "react-native-paper";
import { db } from "../../firebaseApp";
import { Image, Platform, ScrollView, Text, View } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";

import BottomBar from "../../components/BottomBar";
import ShippingNextBtn from "../../components/ShippingNextBtn";
import Loader from "../../components/Loader";
import AddressForm from "../../components/AddressForm";
import Row from "../../components/Row";
import InitLoader from "../../components/InitLoader";

export default function shipping() {
  const { navigate, goBack } = useRouting();
  const { theme } = useContext(ThemeContext);
  const {
    total, user, setSelected,
    addressBook, setAddressBook,
    shippingAddress, setShippingAddress,
    onEdit, setOnEdit,
    onAddNew, setOnAddNew,
    initLoaded
  } = useContext(Context);

  const onSubmit = () => {
    navigate({ routeName: "checkout/payment-method" })
  }

  useEffect(() => {
    addressBook && addressBook.map((address) => {
      if (user && user.addressType && user.addressType.shipping === address.id) {
        setShippingAddress(address)
      }
    })
  }, [addressBook])

  return (
    <>
      {!initLoaded ? <InitLoader /> :
        <>
          {/* {!billing && !shipping && <Loader />} */}
          <ContextArea>
            <IconButton icon="arrow-left" onPress={() => { goBack() }}/>
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

              {!shippingAddress ?
                <>
                  <AddressForm type="shipping" tasker={"1stAddress"} />
                </>
                :
                <>


                  <Title style={{ color: "black", fontWeight: "bold", fontSize: 16, marginHorizontal: 10 }}>
                    Shipping Address:
              </Title>
                  <View style={{ paddingHorizontal: 25 }}>
                    <Text>{shippingAddress.firstName} {shippingAddress.lastName}</Text>
                    <Text>{shippingAddress.address1}</Text>
                    {shippingAddress.address2 ? <Text>{shippingAddress.address2}</Text> : null}
                    <Text>{shippingAddress.city}, {shippingAddress.province} {shippingAddress.postalCode}</Text>
                    <Text>{shippingAddress.country}</Text>
                    <Text>{shippingAddress.phoneNumber}</Text>
                    <Text style={{ marginTop: 20, paddingBottom: 20, color: theme.primary }}
                      onPress={() => {
                        navigate({
                          routeName: "checkout/address-book",
                          params: {
                            type: "shipping",
                            userId: user.uid
                          }
                        })
                      }}>Change</Text>
                  </View>
                  <Divider />
                </>
              }

              <Text style={{ height: 240 }}>{" "}</Text>

            </ScrollView>
          </ContextArea>

          {shippingAddress && !onEdit && !onAddNew &&
            <ShippingNextBtn onSubmit={onSubmit} />}

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
