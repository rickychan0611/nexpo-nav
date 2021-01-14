
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { Platform, Image, View, Dimensions, Text } from "react-native";
import { Headline, HelperText, Title, Button, Surface, Divider } from 'react-native-paper';
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
import success from "../public/success.png"
import { ThemeContext } from "../context/ThemeContext";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";

// WebBrowser.maybeCompleteAuthSession();

export default function orderSuccess() {
  const { navigate } = useRouting();
  const { setSelected, total, user, shippingAddress, newOrderProductList, newOrderId } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const vw = Dimensions.get('window').width;
  const vh = Dimensions.get('window').height;

  return (
    <>
      <View style={{
        flex: 1,
        width: Platform.OS === "web" ? '100vw' : '100%',
        maxWidth: 900,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 60,
        posotion: "relative"
      }}>

        <Surface style={{
          padding: 40,
          width: Platform.OS === "web" ? "80vw" : "80%",
          height: Platform.OS === "web" ? "70vh" : "80%",
          maxWidth: 350,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 4,
          borderRadius: 30
        }}>
          <Image
            style={{
              width: 100,
              height: 100,
            }}
            source={success} />
          <Headline style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 24,
            marginBottom: 30,
            color: theme.green
          }}>
            {`Thank You ${"\n"} for your Order!`}
          </Headline>

          <Headline style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 24,
            marginBottom: 30,
            color: theme.black
          }}>
            {`Your Order ID: ${"\n" + newOrderId}`}
          </Headline>
          <Text>You have earned {total * 100} points</Text>
          {/* <TableRow >
            <Left><Text style={{ color: "grey" }}>Date:</Text></Left>
            <Right><Text style={{ color: "grey" }}>{moment().format("DD/MM/YYYY")}</Text></Right>
          </TableRow>
          <TableRow >
            <Left><Text style={{ color: "grey" }}>Order ID:</Text></Left>
            <Right><Text style={{ color: "grey" }}>{newOrderId}</Text></Right>
          </TableRow>
          <TableRow >
            <Left><Text style={{ color: "black" }}>Total:</Text></Left>
            <Right><Text style={{ color: "black" }}>${(+total * 1.15).toFixed(2)}</Text></Right>
          </TableRow> */}

          <Button
            icon="arrow-right"
            contained
            color="white"
            style={{
              marginTop: 60,
              backgroundColor: theme.primary,
              borderWidth: 1,
              borderRadius: 25,
              // width: 100,
              marginBottom: 10
            }}
            onPress={() => navigate({
              routeName: "account"
            })}>
            Track Your Order</Button>

        </Surface>
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

const TableRow = styled.View`
  width: ${Platform.OS === "web" ? `100vw` : `100%`};
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 280px;
  padding: 10px 0px 10px 0px;
`;
const Left = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Right = styled.View`
  flex: 2;
  justify-content: flex-end;
  align-items: flex-end;
  `;