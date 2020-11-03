import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import Elevations from 'react-native-elevation'
import { Button } from 'react-native-elements';

import styled from 'styled-components/native';
import { Icon } from 'react-native-elements'

export default function CartCheckoutBar() {
  const { navigate } = useRouting();

  return (
    <>
      <Wrapper style={Elevations[6]}>
        <ContentArea >
          <Total>
            Total: $100.00
          </Total>
          <Button title="Checkout" color="red"/>
        </ContentArea>
      </Wrapper >
    </>
  )
};


const Total = styled.Text`
  color: red;
  font-size: 20px;
`;
// const Button = styled(Button)`
//   flex: 1;
//   flex-direction: column;
//   flex-wrap: nowrap;
//   align-items: center;
//   justify-content: center;
//   background-color: red;
// `;
const Name = styled.Text`
  color: white;
`;
const Wrapper = styled.View`
  position: absolute;
  bottom: 65px;
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
  padding: 0 20px 0 20px;
  justify-content: space-between;
  /* background-color: lightblue; */
`;