import React, { useContext, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ThemeContext } from "../../context/ThemeContext";
import { Button, TextInput, Headline, IconButton } from "react-native-paper";
// import * as ScreenOrientation from 'expo-screen-orientation';
import { useRouting } from "expo-next-react-navigation";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';


import banner1 from "../../public/banner1.jpg"
import mom1 from "../../public/mom1.jpg"
import mom2 from "../../public/mom2.jpg"

export default function Home_Mobile_XS() {

  const { theme } = useContext(ThemeContext);
  const { navigate } = useRouting();

  return (
    <>
      {/* <Button>fuck</Button> */}

      <View>

        <Text style={{
          fontSize: wp('14%'),
          fontWeight: "bold",
          color: theme.red,
          textAlign: "center",
          paddingHorizontal: 30,
          marginTop: 30
        }}>
          天天漁港超市{"\n"}天天送貨到家
         </Text>

        <Text style={{
          fontSize: wp('3.5%'),
          fontWeight: "bold",
          color: theme.darkGrey,
          textAlign: "left",
          marginTop: 20,
          paddingHorizontal: wp('9%')
        }}>
          無論你想選購你最喜愛的水果蔬菜、海鮮肉類、五谷雜糧、手工點心、養生食材或生活用品。天天漁港超市使你足不出戶，輕鬆為你送到府上！
        </Text>

        <TouchableOpacity onPress={() => {
          console.log("fuck")
          navigate({ routeName: "store" })
        }}>
          <View style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            width: wp("33%"),
            height: wp("10%"),
            margin: wp("9%")
          }}
          >
            <Text style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: wp('4%')
            }}>
              立即購物
        </Text>
          </View>
        </TouchableOpacity>

        <Image source={mom2} style={{
          width: wp('100%')
        }} />

      </View>

      <View style={{
        backgroundColor: theme.red,
        height: wp('20%'),
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Text style={{
          fontSize: wp('6%'),
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          // marginTop: 20,
        }}>
          會員積分優惠  天天讓你省更多!
      </Text>
      </View>

      <Image source={mom1} style={{
        width: wp('100%'),
        marginBottom: wp('10%')
      }} />

    </>
  )
};