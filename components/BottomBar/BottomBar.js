import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";

import styled from 'styled-components/native';
import { Icon } from 'react-native-elements'

export default function BottomBar() {
  const { navigate } = useRouting();

  return (
    <>
      <Wrapper style={styles.container}>
        <ContentArea>
          <Button onPress={() => {
            navigate({
              routeName: "home"
            })
          }}>
            <Icon
              name='home'
              type='font-awesome-5'
              color='#517fa4'
            />
            <Name>Home</Name>
          </Button>

          <Button>
            <Icon
              name='star'
              type='font-awesome-5'
              color='#517fa4'
            />
            <Name>Special</Name>
          </Button>

          <Button>

            <Icon
              name='store'
              type='font-awesome-5'
              color='#517fa4'
            />
            <Name>Shop</Name>
          </Button>

          <Button>
            <Icon
              name='shopping-cart'
              type='font-awesome-5'
              color='#517fa4'
            />
            <Name>Cart</Name>
          </Button>

          <Button onPress={() => {
            navigate({
              routeName: "profile",
            })
          }}>
            <Icon
              name='user-circle'
              type='font-awesome-5'
              color='#517fa4'
            />
            <Name>Me</Name>
          </Button>

        </ContentArea>
      </Wrapper >
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 2,
    shadowRadius: 3.84,
    elevation: 20,
  },
});

const Name = styled.Text`
  color: #517fa4;
`;
const Button = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.View`
  position: absolute;
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
  position: absolute;
  bottom: 0;
  height: 60px;
  width: 100%;
  max-width: 500px;
  flex: 1;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding: 10px;
  /* background-color: lightblue; */
`;