
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import { Divider, Surface, Headline, IconButton, RadioButton } from "react-native-paper";
import { db } from "../../firebaseApp";
import { TouchableOpacity, Platform, ScrollView, Text, View } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import creditCards from "../../public/creditCards.png"

import BottomBar from "../../components/BottomBar";
import PaymentNextBtn from "../../components/PaymentNextBtn";
import Loader from "../../components/Loader";
import InitLoader from "../../components/InitLoader";

export default function paymentMethod() {
  const { navigate, goBack } = useRouting();
  const { theme } = useContext(ThemeContext);
  const {
    initLoaded,
    paymentMethod, setPaymentMethod,
    user
  } = useContext(Context);


  const onSubmit = () => {
    console.log(paymentMethod)
    if (paymentMethod === "cash") {
      navigate({ routeName: "confirmOrder" })
    }
    else if (paymentMethod === "credit") {
      if (user.defaultProfileId) {
        navigate({ routeName: "checkout/choose-card" })
      }
      else navigate({ routeName: "checkout/new-card" })
    }
  }

  return (
    <>
      {!initLoaded ? <InitLoader /> :
        <>
          <ContextArea>
            <IconButton icon="arrow-left" onPress={() => { goBack() }} />
            <ScrollView>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // width: Platform.OS === "web" ? "100vw" : "100%",
                }}>

                <Headline
                  style={{
                    paddingBottom: 20,
                    fontWeight: "bold",
                    color: theme.black
                  }}
                >
                  Payment Method</Headline>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  width: Platform.OS === "web" ? "100vw" : "100%",
                  maxWidth: 900,
                  marginBottom: 10
                }}>
                <IconButton icon="circle" size={14} color={theme.lightGrey} />
                <IconButton icon="circle" size={14} color={theme.green} />
                <IconButton icon="circle" size={14} color={theme.lightGrey} />
                <IconButton icon="circle" size={14} color={theme.lightGrey} />
              </View>
              <Divider />

              <Title style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 16,
                marginHorizontal: 10,
                marginVertical: 20
              }}>
                Choose your payment method:
              </Title>

              <TouchableOpacity onPress={() => setPaymentMethod('credit')}>
                <Surface style={{
                  elevation: 4,
                  marginHorizontal: 20,
                  marginBottom: 30,
                  borderWidth: 1,
                  borderColor: paymentMethod === "credit" ? theme.primary : theme.lightGrey,
                  backgroundColor: "white",
                  padding: 20
                }}
                >
                  <Row>
                    <View style={{
                      flexDirection: "column",
                      flexWrap: "nowrap",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                      <RadioButton
                        value="credit"
                        status={paymentMethod === 'credit' ? 'checked' : 'unchecked'}
                        color={theme.primary}
                        onPress={() => setPaymentMethod('credit')}
                      />
                    </View>
                    <View style={{
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      paddingLeft: 10
                    }}>
                      <Text style={{
                        fontSize: 16,
                        marginRight: 10
                      }}>
                        Pay by credit card
                    </Text>
                      <Image source={creditCards} />
                    </View>
                  </Row>
                </Surface>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setPaymentMethod('cash')}>
                <Surface style={{
                  elevation: 4,
                  marginHorizontal: 20,
                  marginBottom: 30,
                  borderWidth: 1,
                  borderColor: paymentMethod === "cash" ? theme.primary : theme.lightGrey,
                  backgroundColor: "white",
                  padding: 20
                }}
                >
                  <Row style={{ justifyContent: "flex-start" }}>
                    <RadioButton
                      value="cash"
                      status={paymentMethod === 'cash' ? 'checked' : 'unchecked'}
                      color={theme.primary}
                      onPress={() => setPaymentMethod('cash')}
                    />
                    <View style={{
                      justifyContent: "center",
                      alignItems: "flex-start",
                      paddingLeft: 10
                    }}>
                      <Text style={{
                        fontSize: 16
                      }}>
                        Pay upon delivery (Cash or Credit)
                    </Text>
                    </View>
                  </Row>
                </Surface>
              </TouchableOpacity>

              <View style={{ height: 100 }}></View>
            </ScrollView>
          </ContextArea>

          <PaymentNextBtn onSubmit={onSubmit} />

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
      }
    </>
  );
}

const Row = styled.View`
 flex-direction: row;
 flex-wrap: nowrap;
 justify-content: flex-start;
 
`;
const Title = styled.Text`
  font-size: 18px;
  width: 100%;
  padding: 15px;
  background-color: white;   
`;
const ContextArea = styled.View`
  /* flex: 1; */
  width: ${Platform.OS === "web" ? `100vw` : `100%`};
  height: ${Platform.OS === "web" ? `calc(100vh - 54px) ` : `100%`};
  max-width: 900px;
  background-color: white;
  /* padding-bottom: ${Platform.OS === "web" ? `35px` : `95px`}; */
`;

const Image = styled.Image`
      /* flex: 1; */
      width: 80px;
      height: 30px;
      resize-mode: contain;
`;