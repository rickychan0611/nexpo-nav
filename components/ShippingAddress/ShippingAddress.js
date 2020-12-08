import React, { useContext, useState } from "react";
import { View, Platform, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { ThemeContext } from "../../context/ThemeContext";
import { Divider, TextInput, Title, HelperText, Button } from "react-native-paper";
import { Context } from "../../context/Context";
import validator from 'validator';

export default function ShippingAddress({ err, setErr }) {
  const { theme } = useContext(ThemeContext);
  const { shippingAddress, setShippingAddress } = useContext(Context);

  const handleChanage = (name, value) => {
    setShippingAddress(prev => {
      return { ...prev, [name]: value }
    })
  }

  return (
    <>
      <View style={{ padding: 25 }}>

        <Title style={{ color: "black", fontWeight: 700, fontSize: 16, marginHorizontal: 5, marginBottom: 20 }}>
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
              value={shippingAddress.firstName}
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
              value={shippingAddress.lastName}
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
            value={shippingAddress.phoneNumber}
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
            value={shippingAddress.address1}
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
            value={shippingAddress.address2}
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
              value={shippingAddress.city}
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
              value={shippingAddress.postalCode}
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
              value={shippingAddress.province}
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
              value={shippingAddress.country}
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
            value={shippingAddress.message}
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
              labelStyle={{ fontSize: 14, fontWeight: 600 }}
              style={{ marginBottom: 10 }}>
              Cancel</Button>
            <Button mode="contained" color={theme.primary} dark uppercase={false}
              labelStyle={{ fontSize: 14, fontWeight: 600 }}
              style={{ marginBottom: 10 }}>
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
