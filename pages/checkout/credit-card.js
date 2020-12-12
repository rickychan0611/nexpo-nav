
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import { Divider, Checkbox, Headline, IconButton } from "react-native-paper";
import { db } from "../../firebase";
import { Image, Platform, ScrollView, Text, View } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";

import BottomBar from "../../components/BottomBar";
import ShippingNextBtn from "../../components/ShippingNextBtn";
import Loader from "../../components/Loader";
import BillingAddressForm from "../../components/BillingAddressForm";
import Row from "../../components/Row";
import InitLoader from "../../components/InitLoader";
import CreditCardForm from "../../components/CreditCardForm";

export default function creditCard() {
  const { navigate, goBack } = useRouting();
  const { theme } = useContext(ThemeContext);
  const {
    total, user, setSelected,
    addressBook, setAddressBook,
    shippingAddress, setShippingAddress,
    billingAddress, setBillingAddress,
    onEdit, setOnEdit,
    onAddNew, setOnAddNew,
    initLoaded
  } = useContext(Context);

  const [checked, setChecked] = useState(false);

  const onSubmit = () => {
    navigate({ routeName: "checkout/payment-method" })
  }

  // useEffect(() => {
  //   addressBook && addressBook.map((address) => {

  //     if (user && user.addressType && user.addressType.shipping === address.id) {
  //       setShippingAddress(address)
  //       setHasShippingAddress(true)
  //     }
  //   })
  // }, [addressBook])

  return (
    <>
      {!initLoaded ? <InitLoader /> :
        <>
          {/* {!billing && !shipping && <Loader />} */}
          <ContextArea>
            <IconButton icon="arrow-left" onPress={() => { goBack() }} />
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
                  Credit Card Payment</Headline>
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
                <IconButton icon="circle" size={14} color={theme.lightGrey} />
                <IconButton icon="circle" size={14} color={theme.lightGrey} />
                <IconButton icon="circle" size={14} color={theme.green} />
                <IconButton icon="circle" size={14} color={theme.lightGrey} />
              </View>

              <Divider />
              <CreditCardForm />
              <Divider />

              <Checker>
                <Text style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 16,
                  marginHorizontal: 10,
                }}>
                  Use shipping address as billing address?
                </Text>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </Checker>

              {!checked ?
                <>
                  <BillingAddressForm type="billing" tasker={"1stBillingAddress"} />
                </>
                :
                <>
                  {/* <Text style={{ 
                    color: "black", 
                    fontWeight: "bold", 
                    fontSize: 16, 
                    marginHorizontal: 10,
                    paddingLeft: 15
                    }}>
                    Billing Address:
                  </Text> */}
                  <View style={{ paddingHorizontal: 25 }}>
                    <Text>{shippingAddress.firstName} {shippingAddress.lastName}</Text>
                    <Text>{shippingAddress.address1}</Text>
                    {shippingAddress.address2 ? <Text>{shippingAddress.address2}</Text> : null}
                    <Text>{shippingAddress.city}, {shippingAddress.province} {shippingAddress.postalCode}</Text>
                    <Text>{shippingAddress.phoneNumber}</Text>
                    <Text style={{ marginTop: 20, paddingBottom: 20, color: theme.primary }}
                      onPress={() => {
                       setChecked(false)
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

const TotalContainer = styled.View`
  width: ${Platform.OS === "web" ? `100vw` : `null`};
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 500px;
  padding: 5px 25px 5px 25px;
`;
const Checker = styled.View`
  flex-direction:row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  padding-left: 15px;
  margin-top: 20;
`;
const ContextArea = styled.View`
  /* flex: 1; */
  width: ${Platform.OS === "web" ? `100vw` : `100%`};
  height: ${Platform.OS === "web" ? `calc(100vh - 54px) ` : `100%`};
  max-width: 500px;
  background-color: white;
  /* padding-bottom: ${Platform.OS === "web" ? `35px` : `95px`}; */
`;
