import React, { useContext, useState, useEffect } from "react";
import { View, Platform, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { ThemeContext } from "../../context/ThemeContext";
import { Divider, TextInput, Title, HelperText, Button } from "react-native-paper";
import { Context } from "../../context/Context";
import validator from 'validator';
import { db } from "../../firebase";
import { useRouting } from "expo-next-react-navigation";
import moment from "moment";
import Loader from "../Loader";
import InitLoader from "../InitLoader";

export default function CreditCardForm({
  type, isNewShipping,
  address, index,
  onEdit, setOnEdit,
  onAddNew, setOnAddNew,
  hasShippingAddress, setHasShippingAddress,
  tasker
}) {

  const { user, addressBook, editAddress, setEditAddress,
    initLoading, setInitLoading } = useContext(Context);

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

  const creditInfoDefault = empty

  const { theme } = useContext(ThemeContext);
  // const [newAddress, setNewCard] = useState(shippingDefault);
  const [newCard, setNewCard] = useState(creditInfoDefault);

  const { navigate, goBack } = useRouting();

  const [err, setErr] = useState(empty);
  const handleChanage = (name, value) => {
    setNewCard(prev => {
      return { ...prev, [name]: value }
    })
  }

  // useEffect(()=>{
  //   if (address) {
  //     setNewCard(address)
  //   }
  // },[])

  const onSubmit = (clicker) => {
    setErr(shippingDefault)

    // if (!newOrderProductList[0]) {
    //   alert("Your shopping Cart is empty. Please add something : )")
    //   return
    // }

    let validate = new Promise((resolve, reject) => {

      if (!newCard.firstName) {
        setErr(prev => ({ ...prev, firstName: "Required" }))
        reject()
      }
      if (!newCard.lastName) {
        setErr(prev => ({ ...prev, lastName: "Required" }))
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
      if (!newCard.phoneNumber) {
        setErr(prev => ({ ...prev, phoneNumber: "Required" }))
        reject()
      }
      else resolve()
    })

    validate.then(() => {
      setErr(empty)

      console.log(hasShippingAddress)
      if (tasker === "1stAddress") {
        const id = moment().unix()
        const keyName = `addressBook.${id}`

        db.collection("users").doc(user.email).update({
          [keyName]: { ...newCard, id },
          "addressType.shipping": id,
        }).then(() => {
        })
      }
      else if (onAddNew) {
        const id = moment().unix()
        const keyName = `addressBook.${id}`
        db.collection("users").doc(user.email).update({
          [keyName]: {
            ...newCard,
            id
          },
        })
          .then(() => {
            setOnEdit(false)
            setOnAddNew(false)
          })

      }
      else if (onEdit) {
        const keyName = `addressBook.${editAddress.id}`
        db.collection("users").doc(user.email).update({
          [keyName]: newCard,
        })
          .then(() => {
            setOnEdit(false)
            setOnAddNew(false)
          })
      }
    })
  }

  // useEffect(() => {
  //   if (!initLoading && !user) {
  //     navigate({ routeName: "home" })
  //   }
  // }, [initLoading])

  return (
    <>
      {/* <InitLoader /> */}

      <View style={{ padding: 25 }}>
        <Title style={{
          color: "black",
          fontWeight: "bold",
          fontSize: 16,
          marginVertical: 20
        }}>
          Enter your card details:
        </Title>
        <Row >
          <InputView style={{ flex: 1 }}>
            <TextInput
              style={{ width: "96%" }}
              label="First Name"
              placeholder='First Name'
              theme={{ colors: { primary: "grey" } }}
              mode="outlined"
              dense
              value={newCard.firstName}
              onChangeText={value => { handleChanage("firstName", value) }}
              error={err.firstName}
              returnKeyLabel="next"
              keyboardType="default"
              textContentType="givenName"
            />
            <HelperText type="error" visible={err.firstName}>
              {err.firstName}
            </HelperText>
          </InputView>

          <InputView style={{ flex: 1, alignItems: "flex-end" }}>
            <TextInput
              style={{ width: "96%" }}
              label="Last Name"
              placeholder='Last Name'
              theme={{ colors: { primary: "grey" } }}
              mode="outlined"
              dense
              value={newCard.lastName}
              onChangeText={value => { handleChanage("lastName", value) }}
              error={err.lastName}
              returnKeyLabel="next"
              keyboardType="default"
              textContentType="familyName"
            />
            <HelperText type="error" visible={err.lastName}>
              {err.lastName}
            </HelperText>
          </InputView>
        </Row>

        <InputView>
          <TextInput
            label="Card Number"
            placeholder='Card Number'
            theme={{ colors: { primary: "grey" } }}
            mode="outlined"
            dense
            value={newCard.cardNumber}
            onChangeText={value => {
              if (!value || validator.isInt(value)) handleChanage("cardNumber", value)
            }}
            error={err.cardNumber}
            returnKeyLabel="next"
            keyboardType="phone-pad"
            textContentType="creditCardNumber"
            maxLength={10}
          />
          <HelperText type="error" visible={err.cardNumber}>
            {err.cardNumber}
          </HelperText>
        </InputView>

        <Row style={{marginBottom: 0}}>
          <InputView style={{ flex: 1 }}>
            <TextInput
              style={{ width: "96%" }}
              label="Exp. Month"
              placeholder='MM'
              theme={{ colors: { primary: "grey" } }}
              mode="outlined"
              dense
              value={newCard.expMonth}
              onChangeText={value => { handleChanage("expMonth", value) }}
              error={err.expMonth}
              returnKeyLabel="next"
              keyboardType="default"
            />
            <HelperText type="error" visible={err.expYear}>
              {err.expMonth}
            </HelperText>
          </InputView>

          <InputView style={{ flex: 1 }}>
            <TextInput
              style={{ width: "96%" }}
              label="Exp. Year"
              placeholder='YY'
              theme={{ colors: { primary: "grey" } }}
              mode="outlined"
              dense
              value={newCard.expYear}
              onChangeText={value => { handleChanage("expYear", value) }}
              error={err.expYear}
              returnKeyLabel="next"
              keyboardType="default"
            />
            <HelperText type="error" visible={err.expYear}>
              {err.expYear}
            </HelperText>
          </InputView>

          <InputView style={{ flex: 1, alignItems: "flex-end" }}>
            <TextInput
              style={{ width: "96%" }}
              label="CVV"
              placeholder='CVV'
              theme={{ colors: { primary: "grey" } }}
              mode="outlined"
              dense
              value={newCard.lastName}
              onChangeText={value => { handleChanage("newCard", value) }}
              error={err.newCard}
              returnKeyLabel="next"
              keyboardType="default"
            />
            <HelperText type="error" visible={err.newCard}>
              {err.newCard}
            </HelperText>
          </InputView>
        </Row>
      </View>
    </>
  )
};

const InputView = styled.View`
  margin-bottom: 15px;
`;

const Row = styled.View`
 flex-direction: row;
 flex-wrap: nowrap;
 justify-content: space-between;
`;
