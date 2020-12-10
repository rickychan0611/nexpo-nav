
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import { Divider, TextInput, Headline, IconButton } from "react-native-paper";
import { db } from "../../firebase";
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
    onEdit, setOnEdit,
    onAddNew, setOnAddNew
  } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [billing, setBilling] = useState()
  const [shipping, setShipping] = useState()
  const [hasShippingAddress, setHasShippingAddress] = useState(false)
  const [visible, setVisible] = useState(true)

  const shippingDefault = {
    address1: "",
    address2: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
    phoneNumber: ""
  }

  const onSubmit = () => {
    navigate({ routeName: "payment" })
  }

  useEffect(() => {
    addressBook && addressBook.map((address) => {
      // console.log(user.addressType && user.addressType.shipping)
      // console.log(address.id)
      // if (user.addressType.shipping === address.id) {
      //   setBilling(address)
      // }
      if (user && user.addressType && user.addressType.shipping === address.id) {
        setShipping(address)
        setHasShippingAddress(true)
      }
    })
  }, [addressBook])

  return (
    <>
    {visible ?
      <InitLoader visible={visible} setVisible={setVisible}/>
:
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

          {!addressBook ?
            <>
              <AddressForm type="shipping" tasker={"1stAddress"} />
            </>
            :
            <>


              <Title style={{ color: "black", fontWeight: "bold", fontSize: 16, marginHorizontal: 10 }}>
                Shipping Address:
              </Title>
              <View style={{ paddingHorizontal: 25 }}>
                <Text>{shipping.firstName} {shipping.lastName}</Text>
                <Text>{shipping.address1}</Text>
                {shipping.address2 ? <Text>{shipping.address2}</Text> : null}
                <Text>{shipping.city}, {shipping.province} {shipping.postalCode}</Text>
                <Text>{shipping.phoneNumber}</Text>
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

      {shipping && !onEdit && !onAddNew &&
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
