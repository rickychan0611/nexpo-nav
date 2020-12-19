import React, { useContext, useState, useEffect } from "react";
import { View, Platform, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { ThemeContext } from "../../context/ThemeContext";
import { Divider, TextInput, Title, HelperText, Button } from "react-native-paper";
import { Context } from "../../context/Context";
import validator from 'validator';
import { db } from "../../firebaseApp";
import { useRouting } from "expo-next-react-navigation";
import moment from "moment";
import Loader from "../Loader";
import InitLoader from "../InitLoader";

export default function CreditCardForm({
  newCard, setNewCard,
  err, setErr
}) {

  const { theme } = useContext(ThemeContext);
  // const [newAddress, setNewCard] = useState(shippingDefault);

  const { navigate, goBack } = useRouting();

  const handleChanage = (name, value) => {
    setNewCard(prev => {
      return { ...prev, [name]: value }
    })
  }
  return (
    <>
      {/* <InitLoader /> */}

      <View style={{ paddingHorizontal: 25 }}>
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
            maxLength={16}
          />
          <HelperText type="error" visible={err.cardNumber}>
            {err.cardNumber}
          </HelperText>
        </InputView>

        <Row style={{ marginBottom: 0 }}>
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
              keyboardType="phone-pad"
              maxLength={2}
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
              keyboardType="phone-pad"
              maxLength={2}
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
              value={newCard.CVV}
              onChangeText={value => { handleChanage("CVV", value) }}
              error={err.CVV}
              returnKeyLabel="next"
              keyboardType="phone-pad"
              maxLength={3}
            />
            <HelperText type="error" visible={err.CVV}>
              {err.CVV}
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
