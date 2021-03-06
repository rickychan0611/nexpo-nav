import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components/native";
import { ThemeContext } from "../../context/ThemeContext";
import { Button, TextInput, Headline, IconButton } from "react-native-paper";
import { useRouting } from "expo-next-react-navigation";

import mom1 from "../../public/mom1.jpg"
import mom2 from "../../public/mom2.jpg"


export default function Home_Web_LG() {

  const { theme } = useContext(ThemeContext);
  const { navigate } = useRouting();

  return (
    <>
      <View style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        paddingLeft: 30,
        marginTop: 30
      }}>

        <View style={{ flex: 1 }}>
          <Text style={{
            fontSize: 28,
            fontWeight: "bold",
            color: theme.red,
            textAlign: "left",
            marginTop: 20,
          }}>
            Tin Tin Food Wholesale{"\n"}Home delivery every day
         </Text>

          <Text style={{
            fontSize: 50,
            fontWeight: "bold",
            color: theme.red,
            textAlign: "left",
            marginTop: 20,
          }}>
            天天漁港超市{"\n"}天天送貨到家
         </Text>

          <Text style={{
            fontSize: 18,
            fontWeight: "bold",
            color: theme.darkGrey,
            textAlign: "left",
            marginTop: 20,
            paddingRight: 40,
          }}>
            無論你想選購你最喜愛的水果蔬菜、海鮮肉類、五谷雜糧、手工點心、養生食材或生活用品。天天漁港超市使你足不出戶，輕鬆為你送到府上！
        </Text>
          <Text style={{
            fontSize: 16,
            fontWeight: "bold",
            color: theme.darkGrey,
            textAlign: "left",
            marginTop: 20,
            paddingRight: 40,
          }}>
            Whether you want to buy your favorite fruits, vegetables, seafood, meat, handmade dimsum, snacks, healthy ingredients or daily necessities, we deliver to your comfy home!
        </Text>

          <Button
            contained
            color="white"
            style={{
              backgroundColor: "black",
              width: 250,
              marginBottom: 10,
              fontSize: 20,
              fontWeight: "bold",
              marginVertical: 30
            }}
            onPress={() => {
              navigate({ routeName: "store" })
            }}>
            立即購物 Shop Now
      </Button>

        </View>


        <View style={{
          flex: 1,
          padding: 20,
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
          fontSize: 35,
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          // marginTop: 20,
        }}>
          會員積分優惠  天天讓你省更多!
        </Text>
        <Text style={{
          fontSize: 25,
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          // marginTop: 20,
        }}>
          Tin Tin Points rewards program saves you more every day
        </Text>
      </View>

    </>
  )
};