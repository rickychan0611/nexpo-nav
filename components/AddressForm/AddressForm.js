import React, { useContext, useState, useEffect } from "react";
import { View, Platform, Text } from "react-native";
import styled from "styled-components/native";
import { ThemeContext } from "../../context/ThemeContext";
import { Divider, TextInput, Title, HelperText, Button } from "react-native-paper";
import { Context } from "../../context/Context";
import validator from 'validator';
import { db } from "../../firebaseApp";
import { useRouting } from "expo-next-react-navigation";
import moment from "moment";
import Loader from "../../components/Loader"

export default function AddressForm({
  type, isNewShipping,
  address, index,
  onEdit, onAddNew,
  hasShippingAddress, setHasShippingAddress,
  tasker
}) {

  const { user, editAddress, setOnEdit, setOnAddNew } = useContext(Context);

  const empty = {
    address1: "",
    address2: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
    phoneNumber: ""
  }

  const shippingDefault = editAddress && !onAddNew ? editAddress : empty

  const { theme } = useContext(ThemeContext);
  const [newAddress, setNewAddress] = useState(shippingDefault);
  const [loading, setLoading] = useState(false);

  const { navigate, goBack } = useRouting();

  const [err, setErr] = useState(empty);

  const handleChanage = (name, value) => {
    setNewAddress(prev => {
      return { ...prev, [name]: value }
    })
  }



  const onSubmit = (clicker) => {
    setErr(shippingDefault)

    // if (!newOrderProductList[0]) {
    //   alert("Your shopping Cart is empty. Please add something : )")
    //   return
    // }

    let validate = new Promise((resolve, reject) => {

      if (!newAddress.firstName) {
        setErr(prev => ({ ...prev, firstName: "Required" }))
        reject()
      }
      if (!newAddress.lastName) {
        setErr(prev => ({ ...prev, lastName: "Required" }))
        reject()
      }
      if (!newAddress.address1) {
        setErr(prev => ({ ...prev, address1: "Required" }))
        reject()
      }
      if (!newAddress.city) {
        setErr(prev => ({ ...prev, city: "Required" }))
        reject()
      }
      if (!newAddress.province) {
        setErr(prev => ({ ...prev, province: "Required" }))
        reject()
      }
      if (!newAddress.country) {
        setErr(prev => ({ ...prev, country: "Required" }))
        reject()
      }
      if (!newAddress.postalCode) {
        setErr(prev => ({ ...prev, postalCode: "Required" }))
        reject()
      }
      if (!newAddress.phoneNumber) {
        setErr(prev => ({ ...prev, phoneNumber: "Required" }))
        reject()
      }
      else resolve()
    })

    validate.then(() => {
      setLoading(true)
      setErr(empty)

      if (tasker === "1stAddress") {
        const id = moment().unix()
        const keyName = `addressBook.${id}`

        db.collection("users").doc(user.email).update({
          [keyName]: { ...newAddress, id },
          "addressType.shipping": id,
        }).then(() => {
          setLoading(false)
          setOnEdit(false)
          setOnAddNew(false)
        })
          .catch(() => {
            setLoading(false)
            alert("Something Wrong. Please try again")
          })
      }
      else if (onAddNew) {
        const id = moment().unix()
        const keyName = `addressBook.${id}`
        db.collection("users").doc(user.email).update({
          [keyName]: {
            ...newAddress,
            id
          },
        })
          .then(() => {
            setLoading(false)
            setOnEdit(false)
            setOnAddNew(false)
          })
          .catch(() => {
            setLoading(false)
            alert("Something Wrong. Please try again")
          })

      }
      else if (onEdit) {
        const keyName = `addressBook.${editAddress.id}`
        db.collection("users").doc(user.email).update({
          [keyName]: newAddress,
        })
          .then(() => {
            setLoading(false)
            setOnEdit(false)
            setOnAddNew(false)
          })
          .catch(() => {
            setLoading(false)
            alert("Something Wrong. Please try again")
          })
      }
    })
  }

  useEffect(() => {
    return () => {
      if (setOnAddNew && setOnEdit) {
        setOnAddNew(false)
        setOnEdit(false)
      }
    }
  }, [])

  return (
    <>
      {loading && <Loader />}
      <View style={{ padding: 25 }}>
        <Row>
          <Title style={{ color: "black", fontWeight: "bold", fontSize: 16, marginHorizontal: 5, marginBottom: 20 }}>
            Enter your address:
          </Title>
          <Button mode="contained" color={theme.primary} dark uppercase={false}
            labelStyle={{ fontSize: 14, fontWeight: "bold" }}
            style={{ marginBottom: 15 }}
            onPress={() => { onSubmit() }}>
            Save</Button>
        </Row>
        <Divider />
        <Row style={{ marginTop: 20 }}>
          <InputView style={{ flex: 1 }}>
            <TextInput
              style={{ width: "96%" }}
              label="First Name"
              placeholder='First Name'
              theme={{ colors: { primary: "grey" } }}
              mode="outlined"
              dense
              value={newAddress.firstName}
              onChangeText={value => { handleChanage("firstName", value) }}
              error={err.firstName}
              returnKeyLabel="next"
              keyboardType="default"
              textContentType="givenName"
            />
            <HelperText type="error" visible={true}>
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
              value={newAddress.lastName}
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
            label="Phone Number"
            placeholder='Phone Number'
            theme={{ colors: { primary: "grey" } }}
            mode="outlined"
            dense
            value={newAddress.phoneNumber}
            onChangeText={value => {
              if (!value || validator.isInt(value)) handleChanage("phoneNumber", value)
            }}
            error={err.phoneNumber}
            returnKeyLabel="next"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            maxLength={10}
          />
          <HelperText type="error" visible={err.phoneNumber}>
            {err.phoneNumber}
          </HelperText>
        </InputView>

        <InputView>
          <TextInput
            label="Address Line 1"
            placeholder='Address Line 1'
            theme={{ colors: { primary: "grey" } }}
            mode="outlined"
            dense
            value={newAddress.address1}
            onChangeText={value => { handleChanage("address1", value) }}
            error={err.address1}
            returnKeyLabel="next"
            keyboardType="default"
            textContentType="streetAddressLine1"
          />
          <HelperText type="error" visible={err.address1}>
            {err.address1}
          </HelperText>
        </InputView>

        <InputView>
          <TextInput
            label="Address Line 2"
            placeholder='Address Line 2'
            theme={{ colors: { primary: "grey" } }}
            mode="outlined"
            dense
            value={newAddress.address2}
            onChangeText={value => { handleChanage("address2", value) }}
            error={err.address2}
            returnKeyLabel="next"
            keyboardType="default"
            textContentType="streetAddressLine2"
          />
          <HelperText type="error" visible={err.address2}>
            {err.address2}
          </HelperText>
        </InputView>

        <Row>
          <InputView style={{ flex: 1 }}>
            <TextInput
              style={{ width: "96%" }}
              label="City"
              placeholder='City'
              theme={{ colors: { primary: "grey" } }}
              mode="outlined"
              dense
              value={newAddress.city}
              onChangeText={value => { handleChanage("city", value) }}
              error={err.city}
              returnKeyLabel="next"
              keyboardType="default"
              textContentType="addressCity"
            />
            <HelperText type="error" visible={err.city}>
              {err.city}
            </HelperText>
          </InputView>

          <InputView style={{ flex: 1, alignItems: "flex-end" }}>
            <TextInput
              style={{ width: "96%" }}
              label="Postal Code"
              placeholder='Postal Code'
              theme={{ colors: { primary: "grey" } }}
              mode="outlined"
              dense
              value={newAddress.postalCode}
              onChangeText={value => { handleChanage("postalCode", value) }}
              error={err.postalCode}
              returnKeyLabel="next"
              keyboardType="default"
              textContentType="postalCode"
            />
            <HelperText type="error" visible={err.postalCode}>
              {err.postalCode}
            </HelperText>
          </InputView>
        </Row>

        <Row>
          <InputView style={{ flex: 1 }}>
            <TextInput
              style={{ width: "96%" }}
              label="Province"
              placeholder='Province'
              theme={{ colors: { primary: "grey" } }}
              mode="outlined"
              dense
              value={newAddress.province}
              onChangeText={value => { handleChanage("province", value) }}
              error={err.province}
              returnKeyLabel="next"
              keyboardType="default"
              textContentType="addressState"
            />
            <HelperText type="error" visible={err.province}>
              {err.province}
            </HelperText>
          </InputView>
          <InputView style={{ flex: 1, alignItems: "flex-end" }}>
            <TextInput
              style={{ width: "96%" }}
              label="Country"
              placeholder='Country'
              theme={{ colors: { primary: "grey" } }}
              mode="outlined"
              dense
              value={newAddress.country}
              onChangeText={value => { handleChanage("country", value) }}
              error={err.country}
              returnKeyLabel="next"
              keyboardType="default"
              textContentType="countryName"
            />
            <HelperText type="error" visible={err.country}>
              {err.country}
            </HelperText>
          </InputView>
        </Row>

        {/* 
        <Divider style={{ marginBottom: 20 }} />
        <InputView>
          <TextInput
          label="Note for delivery"
          placeholder='Leave you message'
          theme={{ colors: { primary: "grey" } }}
          mode="outlined"
          dense
          value={newAddress.message}
          onChangeText={value => { handleChanage("message", value) }}
          error={err.message}
          multiline={true}
          numberOfLines={2}
          />
          <HelperText type="error" visible={err.message}>
          {err.message}
          </HelperText>
        </InputView> */}

        <>
          <Divider style={{ marginBottom: 20 }} />
          <Row>
            <>
              {!isNewShipping ?
                <Button mode="contained" color={theme.darkGrey} dark uppercase={false}
                  labelStyle={{ fontSize: 14, fontWeight: "bold" }}
                  style={{ marginBottom: 10 }}
                  onPress={() => {
                    setOnEdit(false)
                    setOnAddNew(false)
                    goBack()
                  }}
                >
                  Cancel</Button>
                : <View style={{ flex: 1 }}></View>
              }
              <Button mode="contained" color={theme.primary} dark uppercase={false}
                labelStyle={{ fontSize: 14, fontWeight: "bold" }}
                style={{ marginBottom: 10 }}
                onPress={() => { onSubmit() }}>
                Save</Button>
            </>
          </Row>
        </>
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
