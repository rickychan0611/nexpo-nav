import React, { useContext, useState } from "react";
import { View, Platform, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { ThemeContext } from "../../context/ThemeContext";
import { Divider, TextInput, Title, HelperText, Button } from "react-native-paper";
import { Context } from "../../context/Context";
import validator from 'validator';

export default function ShippingAddress() {
  const shippingDefault = {
    address1: "",
    address2: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
    phoneNumber: ""
  }

  const { theme } = useContext(ThemeContext);
  const { shippingAddress, setShippingAddress } = useContext(Context);
  const [newAddress, setNewAddress] = useState(shippingDefault);


  const [err, setErr] = useState(shippingDefault);
  const handleChanage = (name, value) => {
    setShippingAddress(prev => {
      return { ...prev, [name]: value }
    })
  }


  const onSubmit = () => {
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


      // setSelected("confirmOrder")
      setEditAddress(false)
    })
  }

  return (
    <>
      <View style={{ padding: 25 }}>

        <Title style={{ color: "black", fontWeight: "bold", fontSize: 16, marginHorizontal: 5, marginBottom: 20 }}>
          Edit Your Address:
          </Title>

        <Row>
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
              error={err.Province}
              returnKeyLabel="next"
              keyboardType="default"
              textContentType="addressState"
            />
            <HelperText type="error" visible={err.Province}>
              {err.Province}
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

        <Divider style={{ marginBottom: 20 }} />

        {/* <InputView>
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

        <Row >
          <>
            <Button mode="contained" color={theme.darkGrey} dark uppercase={false}
              labelStyle={{ fontSize: 14, fontWeight: "bold" }}
              style={{ marginBottom: 10 }}>
              Cancel</Button>
            <Button mode="contained" color={theme.primary} dark uppercase={false}
              labelStyle={{ fontSize: 14, fontWeight: "bold" }}
              style={{ marginBottom: 10 }}
              onPress={() => { onSubmit() }}>
              Save</Button>
          </>
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
