
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import { Divider, TextInput, Headline, IconButton } from "react-native-paper";
import { db } from "../../firebaseApp";
import { Image, Platform, ScrollView, Text, View } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";

import BottomBar from "../../components/BottomBar";
import AddressForm from "../../components/AddressForm";
import Loader from "../../components/Loader";

export default function newAddress() {
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
    setErr(shippingDefault)

    if (!newOrderProductList[0]) {
      alert("Your shopping Cart is empty. Please add something : )")
      return
    }

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
      setSelected("confirmOrder")
      navigate({
        routeName: "confirmOrder",
      })
    })
  }

  useEffect(() => {
    setNewOrderProductList(prev => prev)
  }, [newOrderProductList])

  useEffect(() => {
    setLoading(false)
    if (user) {
      db.collection('addressBook').where("userId", "==", user.email).get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            snapshot.forEach((doc) => {
              setShippingAddress(prev => ({ ...prev, ...doc.data() }))
            })
          }
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
              maxWidth: 900,
              marginBottom: 10
            }}>
            <IconButton icon="circle" size={14} color={theme.green} />
            <IconButton icon="circle" size={14} color={theme.lightGrey} />
            <IconButton icon="circle" size={14} color={theme.lightGrey} />
            <IconButton icon="circle" size={14} color={theme.lightGrey} />
          </View>
          <Divider />

          <AddressForm err={err} setErr={setErr} onSubmit={onSubmit} />

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
  height: ${Platform.OS === "web" ? `calc(100vh - 54px) ` : `100%`};
  max-width: 900px;
  background-color: white;
  /* padding-bottom: ${Platform.OS === "web" ? `35px` : `95px`}; */
`;
