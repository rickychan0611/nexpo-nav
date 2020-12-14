import React, { useContext, useState, useEffect } from "react";
import { View, Platform, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { ThemeContext } from "../../context/ThemeContext";
import { Divider, TextInput, Title, HelperText, Checkbox  } from "react-native-paper";
import { Context } from "../../context/Context";
import validator from 'validator';
import { db } from "../../firebaseApp";
import { useRouting } from "expo-next-react-navigation";
import moment from "moment";
import Loader from "../Loader";
import InitLoader from "../InitLoader";

export default function BillingAddressForm({
  newCard, setNewCard, err, setErr
}) {

  const { theme } = useContext(ThemeContext);

  const handleChanage = (name, value) => {
    setNewCard(prev => {
      return { ...prev, [name]: value }
    })
  }

  return (
    <>
      {/* <InitLoader /> */}

      <View style={{ padding: 25 }}>
        
        <Divider/>
        
        <InputView  style={{marginTop: 20}}>
          <TextInput
            label="Address Line 1"
            placeholder='Address Line 1'
            theme={{ colors: { primary: "grey" } }}
            mode="outlined"
            dense
            value={newCard.address1}
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
            value={newCard.address2}
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
              value={newCard.city}
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
              value={newCard.postalCode}
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
              value={newCard.province}
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
              value={newCard.country}
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
