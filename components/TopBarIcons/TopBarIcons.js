import React, { useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import Elevations from 'react-native-elevation'
import useQty from '../../hooks/useQty';

import styled from 'styled-components/native';
import { Badge, Icon, withBadge } from 'react-native-elements'
import { Context } from "../../context/Context";

let useRouter;
if (Platform.OS === 'web') {
  import('next/router')
    .then((importNext) => {
      useRouter = importNext.useRouter
    })
}


export default function TopBarIcons() {
  const router = Platform.OS === 'web' ? useRouter() : null

  const { navigate } = useRouting();

  const { user, selected, setSelected } = useContext(Context);
  const qty = useQty();

  const BadgedIcon = qty > 0 ? withBadge(qty)(Icon) : Icon

  //for web only. make bottom bar icon selected
  useEffect(() => {

    if (router) {
      let pathname = router.pathname.substring(1)
      if (
        pathname === "checkout" ||
        pathname === "checkout/shipping"
      ) { setSelected("cart") }
      else setSelected(pathname)
    }
  }, [router, user])

  return (
    <View style={{
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "flex-end",
      alignItems: "center",
    }}>

      {/* <Button onPress={() => {
        setSelected("home")
        navigate({
          routeName: "home"
        })
      }}>
        <Icon
          name='home'
          type='font-awesome-5'
          color={selected === "home" ? 'black' : '#ababab'}
          size={18}
        />
        <Name selected={selected === "home" ? 'black' : '#ababab'}>Home</Name>
      </Button> */}

      {/* <Button>
            <Icon
              name='star'
              type='font-awesome-5'
              color={selected === "star" ? 'black' : '#ababab'}
            />
            <Name selected={selected === "star" ? 'black' : '#ababab'}>Special</Name>
          </Button> */}

      <Button onPress={() => {
        setSelected("store")
        navigate({
          routeName: "store"
        })
      }}>

        <Name selected={selected === "store" ? 'black' : '#ababab'}>Shop</Name>
        <Icon
          name='store'
          type='font-awesome-5'
          color={selected === "store" ? 'black' : '#ababab'}
          size={18}
        />
      </Button>

      <Button onPress={() => {
        setSelected("cart")
        navigate({
          routeName: "cart"
        })
      }}>

        <Name selected={selected === "cart" ? 'black' : '#ababab'}>Cart</Name>
        <BadgedIcon
          name='shopping-cart'
          type='font-awesome-5'
          color={selected === "cart" ? 'black' : '#ababab'}
          size={18}

        />
      </Button>

      <Button onPress={() => {
        setSelected("account")
        if (user) {
          navigate({
            routeName: "account",
          })
        }
        else {
          navigate({
            routeName: "login",
          })
        }
      }}>
        <Name selected={selected === "account" ? 'black' : '#ababab'}>Account</Name>
        <Icon
          name='user-circle'
          type='font-awesome-5'
          color={selected === "account" ? 'black' : '#ababab'}
          size={18}
        />
      </Button>

      <Button onPress={() => {
        setSelected("qrcode")
        if (user) {
          if (user.role === "admin") {
            navigate({
              routeName: "admin/redeem-points",
            })
          }
          else {
            navigate({
              routeName: "qrcode",
            })
          }
        }
        else {
          navigate({
            routeName: "login",
          })
        }
      }}>
        <Name selected={selected === "qrcode" ? 'black' : '#ababab'}>My QRcode</Name>
        <Icon
          name='barcode'
          type='font-awesome-5'
          color={selected === "qrcode" ? 'black' : '#ababab'}
          size={18}
        />
      </Button>
    </View>
  )
};

const Name = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${props => props.selected};
  margin-right: 5px;
`;
const Button = styled.TouchableOpacity`
  /* flex: 1; */
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  margin-right: 20px;
  /* min-width: 50px; */
`;
const Wrapper = styled.View`
  position: ${Platform.OS === "web" ? `fixed` : `absolute`};
  bottom: 0;
  height: 65px;
  width: 100%;
  flex: 1;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  background-color: white;

`;
const ContentArea = styled.View`
  position: ${Platform.OS === "web" ? `fixed` : `absolute`};
  bottom: 0;
  height: 60px;
  width: 100%;
  max-width: 900px;
  flex: 1;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  /* margin-bottom: 3px; */
`;