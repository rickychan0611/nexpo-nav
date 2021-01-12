
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../context/Context";
import { Link, useRouting } from "expo-next-react-navigation";

import { Platform, Image, Text, View } from "react-native";

import { Button, TextInput, Headline, IconButton } from "react-native-paper";

import banner1 from "../public/banner1.jpg"
import BottomBar from "../components/BottomBar";
import AppTopBar from "../components/AppTopBar";

import useWindowSize from "../hooks/useWindowSize"
import { ThemeContext } from "../context/ThemeContext";
import mom1 from "../assets/mom1.jpg"
import mom2 from "../assets/mom2.jpg"

export default function Home() {
  const { navigate } = useRouting();
  const { user, setUser, newOrderProductList } = useContext(Context);
  const { vh, vw } = useWindowSize();
  const { theme } = useContext(ThemeContext);

  return (
    <>
      {Platform.OS == "web" && vw > 690 && <AppTopBar />}
      <Wrapper>
        <CartBarWrapper>


          {Platform.OS !== "web" && <Image
            style={{
              width: Platform.OS === "web" ? '100vw' : '100%',
              maxWidth: 500,
              height: 120
            }}
            source={banner1} />}
          <ContextArea>

            <View style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}>

              <View style={{ flex: 1 }}>

                <Text style={{
                  fontSize: 50,
                  fontWeight: "bold",
                  color: theme.red,
                  textAlign: "left",
                  marginTop: 20,

                }}>
                  天天渔港超市{"\n"}天天送貨到家
                 </Text>

                <Text style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: theme.darkGrey,
                  textAlign: "left",
                  marginTop: 20,
                  paddingRight: 40

                }}>
                  無論你想選購你最喜愛的水果蔬菜、海鮮肉類、五谷雜糧、手工點心、養生食材或生活用品。天天漁港超市使你足不出戶，輕鬆為你送到府上！
                </Text>

                <Button
                  contained
                  color="white"
                  style={{
                    backgroundColor: "black",
                    width: 150,
                    marginBottom: 10,
                    fontSize: 20,
                    fontWeight: "bold",
                    marginVertical: 30
                  }}
                  onPress={() => {
                    navigate({ routeName: "store" })
                  }}>
                  立即購物
              </Button>

              </View>


              <View style={{
                flex: 1,
                padding: 20
              }}>
                <Image source={mom2} style={{
                  width: '100%',
                  height: '100%',
                  aspectRatio: 1,
                }} />
              </View>

            </View>

            <View style={{
              backgroundColor: theme.red,
              height: 100,
              marginTop: 40,
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Text style={{
                fontSize: 40,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                // marginTop: 20,
              }}>
                會員積分優惠  天天讓你省更多!
              </Text>

            </View>



          </ContextArea>
        </CartBarWrapper>
      </Wrapper>

      {Platform.OS === "web" && vw < 690 && <BottomBar />}
      {Platform.OS !== "web" && <BottomBar />}
    </>
  );
}

const Wrapper = styled.ScrollView`
      flex: 1;
      width: 100%;
      max-width: 900px;
      padding-bottom: 62px;
      background-color: white;
`;
const CartBarWrapper = styled.View`
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;

`;
const ContextArea = styled.View`
      flex: 1;
      align-items: left;
      background-color: white;
      width: 100%;
      max-width: 900px;
      padding: 30px;
`;
const MyText = styled.Text`
      font-size: 20px;
      margin: 20px;
`;