
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { Platform, Image, View, Dimensions, KeyboardAvoidingView } from "react-native";
import { TextInput, HelperText, Title, Button, Divider, Caption } from 'react-native-paper';
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import BottomBar from "../components/BottomBar";
import CartCheckoutBar from "../components/CartCheckoutBar";
import { firebase, db, auth } from "../firebaseApp";
import * as WebBrowser from 'expo-web-browser';
// import * as Facebook from 'expo-auth-session/providers/facebook';
// import { ResponseType } from 'expo-auth-session';
import * as Facebook from 'expo-facebook';
import poster from "../public/poster2.jpg"
import siginBanner from "../public/siginBanner.png"
import { ThemeContext } from "../context/ThemeContext";
import { ScrollView } from "react-native-gesture-handler";


// WebBrowser.maybeCompleteAuthSession();

export default function login() {
  const { navigate } = useRouting();
  const { user, setUser, selected, setSelected } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const vw = Dimensions.get('window').width;
  const vh = Dimensions.get('window').height;

  return (
    <>
      <View style={{
        flex: 1,
        width: Platform.OS === "web" ? '100vw' : '100%',
        maxWidth: 500,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingBottom: 60,
        posotion: "relative"
      }}>
        <View style={{ flex: 1 }}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover"
            }}
            source={poster} />
        </View>

        <View style={{
          position: "absolute",
          bottom: 80,
        }}>
          <View style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: Platform.OS ==="web" ? "100vw" : vw,
            maxWidth: 500
          }}>
            <Button 
            contained
            color="white"
              style={{
                backgroundColor: theme.primary,
                borderWidth: 1,
                borderRadius: 25,
                width: Platform.OS === "web" ? "90vw" : vw - 60,
                maxWidth: 400,
                marginBottom: 10
              }}
              onPress={() => navigate({
                routeName: "signIn"
              })}>
              登錄 / Login</Button>
            <Button contain color="white"
             mode="contained"
             color="white"
               style={{
                 borderWidth: 1,
                 borderRadius: 25,
                 width: Platform.OS === "web" ? "90vw" : vw - 60,
                 maxWidth: 400,
                 marginBottom: 10
               }}
               onPress={() => navigate({
                routeName: "signUp"
              })}>
              註冊 / Sign Up</Button>
          </View>
        </View>
      </View>

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

const Button1 = styled(Button)`
  margin-bottom: 5px;
  `;

const InputView = styled.View`
  margin-bottom: 15px;
`;