
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import { Divider, Checkbox, Headline, IconButton } from "react-native-paper";
import { db } from "../../firebaseApp";
import { Image, Platform, ScrollView, Text, View } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import moment from "moment";

import BottomBar from "../../components/BottomBar";
import CreditCardNextBtn from "../../components/CreditCardNextBtn";
import Loader from "../../components/Loader";
import BillingAddressForm from "../../components/BillingAddressForm";
import Row from "../../components/Row";
import InitLoader from "../../components/InitLoader";
import CreditCardForm from "../../components/CreditCardForm";
import newAddress from "./new-address";

export default function creditCard() {
  const { navigate, goBack } = useRouting();
  const { theme } = useContext(ThemeContext);
  const {
    user, setSelected,
    addressBook, setAddressBook,
    newCard, setNewCard,
    shippingAddress, setShippingAddress,
    billingAddress, setBillingAddress,
    onEdit, setOnEdit,
    onAddNew, setOnAddNew,
    initLoaded,
    newBillingBoxchecked, setNewBillingBoxchecked,
    task, setTask
  } = useContext(Context);

  const empty = {
    firstName: "",
    lastName: "",
    cardNumber: "",
    CVV: "",
    expMonth: "",
    expYear: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
  }

  const [err, setErr] = useState(empty);


  const setShippingAsBilling = () => {
    console.log(newBillingBoxchecked)

    if (newBillingBoxchecked) {
      setNewCard(prev => ({ ...prev, ...shippingAddress }))
    }

    else {
      setNewCard(prev => ({
        ...prev,
        address1: "",
        address2: "",
        city: "",
        province: "",
        country: "",
        postalCode: "",
        id: ""
      }))
    }
  }

  useEffect(() => {
    setShippingAsBilling()
  }, [newBillingBoxchecked])

  const onSubmit = (clicker) => {
    setErr(empty)

    let validate = new Promise((resolve, reject) => {

      if (!newCard.firstName) {
        setErr(prev => ({ ...prev, firstName: "Required" }))
        reject()
      }
      if (!newCard.lastName) {
        setErr(prev => ({ ...prev, lastName: "Required" }))
        reject()
      }
      if (!newCard.cardNumber) {
        setErr(prev => ({ ...prev, cardNumber: "Required" }))
        reject()
      }
      if (!newCard.expMonth) {
        setErr(prev => ({ ...prev, expMonth: "Required" }))
        reject()
      }
      if (!newCard.expYear) {
        setErr(prev => ({ ...prev, expYear: "Required" }))
        reject()
      }
      if (!newCard.CVV) {
        setErr(prev => ({ ...prev, CVV: "Required" }))
        reject()
      }
      if (!newCard.address1) {
        setErr(prev => ({ ...prev, address1: "Required" }))
        reject()
      }
      if (!newCard.city) {
        setErr(prev => ({ ...prev, city: "Required" }))
        reject()
      }
      if (!newCard.province) {
        setErr(prev => ({ ...prev, province: "Required" }))
        reject()
      }
      if (!newCard.country) {
        setErr(prev => ({ ...prev, country: "Required" }))
        reject()
      }
      if (!newCard.postalCode) {
        setErr(prev => ({ ...prev, postalCode: "Required" }))
        reject()
      }
      // if (!newCard.phoneNumber) {
      //   setErr(prev => ({ ...prev, phoneNumber: "Required" }))
      //   reject()
      // }
      else resolve()
    })
    console.log(err)

    validate.then(() => {
      setErr(empty)

      if (!newBillingBoxchecked && newCard) {
        const id = moment().unix()
        const keyName = `addressBook.${id}`
        db.collection("users").doc(user.email).update({
          "addressType.billing": id,
          [keyName]: {
            firstName: newCard.firstName,
            lastName: newCard.lastName,
            address1: newCard.address1,
            address2: newCard.address2,
            city: newCard.city,
            province: newCard.province,
            country: newCard.country,
            postalCode: newCard.postalCode,
            "id": id,
            phoneNumber: shippingAddress && shippingAddress.phoneNumber
          },
        })
      }

      else if (newBillingBoxchecked) {
        db.collection("users").doc(user.email).update({
          "addressType.billing": newCard.id,
        })
      }

      //TODO: validate credit card. save profit get a token. 
      //1. get a token
      fetch("https://api.na.bambora.com/scripts/tokenization/tokens", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "number": "4030000010001234",
          "expiry_month": "02",
          "expiry_year": "20",
          "cvd": "123"
        })
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
          console.error(error);
        });
    })
  }

  useEffect(()=>{
    if (!shippingAddress) {
      navigate({routeName: "checkout/shipping"})
    }
  },[])

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
              <CreditCardForm
                newCard={newCard}
                setNewCard={setNewCard}
                err={err}
                setErr={setErr} />
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
                  status={newBillingBoxchecked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setNewBillingBoxchecked(!newBillingBoxchecked)
                  }}
                />
              </Checker>

              {!newBillingBoxchecked ?
                <>
                  <BillingAddressForm
                    type="billing"
                    tasker={"1stBillingAddress"}
                    newCard={newCard}
                    setNewCard={setNewCard}
                    err={err}
                    setErr={setErr} />
                </>
                :
                <>
                  {shippingAddress &&
                    <View style={{ paddingHorizontal: 25 }}>
                      {/* <Text>{shippingAddress.firstName} {shippingAddress.lastName}</Text> */}
                      <Text>{shippingAddress.address1}</Text>
                      {shippingAddress.address2 ? <Text>{shippingAddress.address2}</Text> : null}
                      <Text>{shippingAddress.city}, {shippingAddress.province} {shippingAddress.postalCode}</Text>
                      <Text>{shippingAddress.phoneNumber}</Text>
                      <Text style={{ marginTop: 20, paddingBottom: 20, color: theme.primary }}
                        onPress={() => {
                          setTask("changeBillingAddress")
                          navigate({ routeName: "checkout/address-book" })
                        }}>Change</Text>
                    </View>
                  }
                </>
              }
              <Text style={{ height: 200 }}>{" "}</Text>

            </ScrollView>
          </ContextArea>

          <CreditCardNextBtn onSubmit={onSubmit} />

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
