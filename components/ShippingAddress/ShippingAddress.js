import React, { useContext } from "react";
import { View, Platform, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { ThemeContext } from "../../context/ThemeContext";
import { Divider, TextInput, Title } from "react-native-paper";
import { Context } from "../../context/Context";

export default function ShippingAddress() {
  const { theme } = useContext(ThemeContext);
  const { shippingAddress, setShippingAddress } = useContext(Context);

  const handleChanage = (name, value) => {
    setShippingAddress(prev => {
      return {...prev, [name]: value}
    })
  }

  return (
    <>
      <View style={{ padding: 25 }}>
        <Title>Shipping Info:</Title>

        <Row>
          <InputView style={{ flex: 1 }}>
            <TextInput
              style={{ width: "96%" }}
              label="Frist Name"
              placeholder='Frist Name'
              theme={{ colors: { primary: "grey" } }}
              mode="outlined"
              dense
              value={shippingAddress.firstName}
              onChangeText={value => { handleChanage("firstName", value) }}
            // error={catErrMsg.englishName}
            />
          </InputView>

          <InputView style={{ flex: 1, alignItems: "flex-end" }}>
            <TextInput
              style={{width: "96%" }}
              label="Last Name"
              placeholder='Last Name'
              theme={{ colors: { primary: "grey" } }}
              mode="outlined"
              dense
              value={shippingAddress.lastName}
              onChangeText={value => { handleChanage("lastName", value) }}
            // error={catErrMsg.englishName}
            />
          </InputView>
        </Row>

        <InputView>
          <TextInput
            label="Phone Numner"
            placeholder='Phone Numner'
            theme={{ colors: { primary: "grey" } }}
            mode="outlined"
            dense
            value={shippingAddress.phoneNumber}
            onChangeText={value => { handleChanage("phoneNumber", value) }}
          // error={catErrMsg.englishName}
          />
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
          // error={catErrMsg.englishName}
          />
        </InputView>

        <InputView>
          <TextInput
            label="Address Line 2"
            placeholder='Address Line 2'
            theme={{ colors: { primary: "grey" } }}
            mode="outlined"
            dense
            value={shippingAddress.address2}
            onChangeText={value => { handleChanage("address1", value) }}
          // error={catErrMsg.englishName}
          />
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
            // error={catErrMsg.englishName}
            />
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
            // error={catErrMsg.englishName}
            />
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
            // error={catErrMsg.englishName}
            />
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
            // error={catErrMsg.englishName}
            />
          </InputView>
        </Row>

        <Divider style={{ marginBottom: 10 }} />

        <InputView>
          <TextInput
            label="Message"
            placeholder='Message'
            theme={{ colors: { primary: "grey" } }}
            mode="outlined"
            dense
            value={shippingAddress.message}
            onChangeText={value => { handleChanage("message", value) }}
          // error={catErrMsg.englishName}
          />
        </InputView>

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
