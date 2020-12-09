
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
import AddressForm from "../../components/AddressForm";
import { route } from "next/dist/next-server/server/router";

export default function shipping() {
  const { navigate, getParam, goBack } = useRouting();

  const userId = getParam('userId')
  const addressType = getParam('type')

  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const { theme } = useContext(ThemeContext);

  const {
    user, addressBook
  } = useContext(Context);

  const updateAddress = (addressType, address) => {
    const key = `addressType.${addressType}`
    db.collection("users").doc(user.email).update({
      [key]: address
    })
    goBack()
  }

  const onSubmit = () => {

  }

  useEffect(() => {
    if (userId === user.uid && addressType === "billing" || addressType === "shipping") {
      null
    }
    else navigate({ routeName: "home" })

  }, [userId, addressType])

  return (
    <>
      {loading && <Loader />}
      <ContextArea>
        <IconButton icon="arrow-left" onPress={() => { goBack() }} />
        <ScrollView>
          <Title style={{ color: "black", fontWeight: "bold", fontSize: 16, marginHorizontal: 10 }}>
            Choose your {addressType} address:
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

          {addressBook && addressBook.map((address, index) => {
            return (

              <Surface style={{
                elevation: 4,
                marginHorizontal: 20,
                marginBottom: 20,
                borderWidth: 1,
                borderColor: theme.lightGrey
              }}>

                {onEdit ?
                  <AddressForm address={address} index={index} isEdit setOnEdit={setOnEdit}/>
                  :

                  <View style={{ paddingHorizontal: 35, paddingVertical: 15 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>{address.firstName} {address.lastName}</Text>
                    <Text>{address.address1}</Text>
                    {address.address2 ? <Text>{address.address2}</Text> : null}
                    <Text>{address.city}, {address.province} {address.postalCode}</Text>
                    <Text>{address.country}</Text>
                    <Text>{address.phoneNumber}</Text>
                    <Text> </Text>
                    <Button mode="contained" color={theme.primary} dark uppercase={false}
                      labelStyle={{ fontSize: 14, fontWeight: "bold" }}
                      style={{ marginBottom: 10 }}
                      onPress={() => {
                        updateAddress(addressType, address.address1)
                      }}>Select</Button>
                    <View style={{
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      justifyContent: "center",
                    }}>
                      <Edit theme={theme}
                        onPress={() => {
                          setOnEdit(true)
                        }}>Edit</Edit>
                      <Text>{"     |     "}</Text>
                      <Edit theme={theme} disabled>Delete</Edit>
                    </View>
                  </View>
                }
              </Surface>
            )
          })}

          <View style={{ height: 150 }}></View>
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
