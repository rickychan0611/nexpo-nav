import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import Elevations from 'react-native-elevation'
import useQty from '../../hooks/useQty';

import styled from 'styled-components/native';
import { Badge, Icon, withBadge } from 'react-native-elements'
import { Context } from "../../context/Context";

export default function BottomBar() {
  const { navigate } = useRouting();

  const { user, selected, setSelected } = useContext(Context);
  const qty = useQty();

  const BadgedIcon = qty > 0 ? withBadge(qty)(Icon) : Icon

  return (
    <>
      <Wrapper style={Elevations[6]}>
        <ContentArea>
          <Button onPress={() => {
            setSelected("home")
            navigate({
              routeName: "home"
            })
          }}>
            <Icon
              name='home'
              type='font-awesome-5'
              color={selected === "home" ? 'black' : '#ababab'}
            />
            <Name selected={selected === "home" ? 'black' : '#ababab'}>Home</Name>
          </Button>

          <Button>
            <Icon
              name='star'
              type='font-awesome-5'
              color={selected === "star" ? 'black' : '#ababab'}
            />
            <Name selected={selected === "star" ? 'black' : '#ababab'}>Special</Name>
          </Button>

          <Button onPress={() => {
            setSelected("store")
            navigate({
              routeName: "store"
            })
          }}>

            <Icon
              name='store'
              type='font-awesome-5'
              color={selected === "store" ? 'black' : '#ababab'}
            />
            <Name selected={selected === "store" ? 'black' : '#ababab'}>Shop</Name>
          </Button>

          <Button onPress={() => {
            setSelected("cart")
            navigate({
              routeName: "cart"
            })
          }}>

            <BadgedIcon
              name='shopping-cart'
              type='font-awesome-5'
              color={selected === "cart" ? 'black' : '#ababab'}
            />
            <Name selected={selected === "cart" ? 'black' : '#ababab'}>Cart</Name>
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
            <Icon
              name='user-circle'
              type='font-awesome-5'
              color={selected === "account" ? 'black' : '#ababab'}
            />
            <Name selected={selected === "account" ? 'black' : '#ababab'}>Account</Name>
          </Button>

        </ContentArea>
      </Wrapper >
    </>
  )
};

const Name = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${props => props.selected}
`;
const Button = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
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
  max-width: 500px;
  flex: 1;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  /* margin-bottom: 3px; */
`;