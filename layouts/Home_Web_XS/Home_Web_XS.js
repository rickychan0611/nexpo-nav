import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components/native";
import { ThemeContext } from "../../context/ThemeContext";
import { Button, TextInput, Headline, IconButton } from "react-native-paper";

import mom1 from "../../public/mom1.jpg"
import mom2 from "../../public/mom2.jpg"

export default function Home_Web_XS({ vw }) {

  const { theme } = useContext(ThemeContext);

  return (

    <>
      <View>

        <Text style={{
          fontSize: 50,
          fontWeight: "bold",
          color: theme.red,
          textAlign: "left",
          paddingHorizontal: 30,
          marginTop: 30
        }}>
          天天漁港超市{"\n"}天天送貨到家
         </Text>

        <Text style={{
          fontSize: 20,
          fontWeight: "bold",
          color: theme.darkGrey,
          textAlign: "left",
          marginTop: 20,
          paddingHorizontal: 30
        }}>
          無論你想選購你最喜愛的水果蔬菜、海鮮肉類、五谷雜糧、手工點心、養生食材或生活用品。天天漁港超市使你足不出戶，輕鬆為你送到府上！
        </Text>

        <Button
          contained
          color="white"
          style={{
            backgroundColor: "black",
            width: 150,
            fontSize: 20,
            fontWeight: "bold",
            margin: 30,
            // paddingHorizontal: 30

          }}
          onPress={() => {
            navigate({ routeName: "store" })
          }}>
          立即購物
      </Button>

        <Image source={mom2} style={{
          width: vw,
          height: 300,
          aspectRatio: 1,
        }} />

      </View>

      <View style={{
        backgroundColor: theme.red,
        height: 100,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Text style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          // marginTop: 20,
        }}>
          會員積分優惠{vw < 450 ? "\n" : "  "}天天讓你省更多!
      </Text>
      </View>

      <Image source={mom1} style={{
        width: vw,
        height: 300,
        aspectRatio: 1,
      }} />

    </>
  )
};