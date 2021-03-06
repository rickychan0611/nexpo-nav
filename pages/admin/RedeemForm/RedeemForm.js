import React, { useContext, useState, useEffect } from "react";
import { View, Text, Platform } from "react-native";
import styled from "styled-components/native";
import { TextInput, HelperText, Button } from 'react-native-paper';
import { Context } from "../../../context/Context";
import validator from 'validator';
import { useRouting } from "expo-next-react-navigation";

export default function RedeemForm() {
  const { redeemPoints, setRedeemPoints } = useContext(Context)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")
  const { navigate } = useRouting();

  const handleChange = (value) => {
    setRedeemPoints(value)
  }
  const onSubmit = () => {
    setError('')
    let validate = new Promise((resolve, reject) => {
      if (Platform.OS === 'web') {
        alert("This function doesn't work on web browser. Please use APP")
        reject()
      }
      if (!redeemPoints) {
        setError(prev => ({ ...prev, redeemPoints: "Required" }))
        reject()
      }
      if (!validator.isInt(redeemPoints)) {
        setError(prev => ({ ...prev, redeemPoints: "Please enter number only" }))
        reject()
      }
      else {
        resolve()
      }
    })
    validate.then(() => {
      setLoading(true)
      setError("")
      navigate({ routeName: "admin/qrScanner" })
    })
  }

  useEffect(() => {
    Platform.OS === 'web' && alert("This function doesn't work on web browser. Please use APP")
  }, []);

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: "45%",
        }}>
        <Text style={{ fontSize: 18, margin: 10 }}>Redeem Customer's Points</Text>

        <TextInput
          style={{ width: 300 }}
          label="Points"
          placeholder='Points'
          theme={{ colors: { primary: "grey" } }}
          mode="outlined"
          // dense
          value={redeemPoints}
          onChangeText={value => { handleChange(value) }}
          error={error.redeemPoints}
          keyboardType="number-pad"
        />
        <HelperText type="error" visible={error.redeemPoints}>
          {error.redeemPoints}
        </HelperText>
        <Button icon="camera" mode="contained"
          style={{ margin: 10 }}
          onPress={() => {
            onSubmit()
          }
          }>
          Scan customer's QR code
        </Button>
      </View>
    </>
  )
};

