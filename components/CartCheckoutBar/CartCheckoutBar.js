import React, { useContext } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import Elevations from 'react-native-elevation'
import { Button } from 'react-native-elements';
import useQty from '../../hooks/useQty';
import { LinearGradient } from 'expo-linear-gradient';

import styled from 'styled-components/native';
import { Icon } from 'react-native-elements'
import { Context } from "../../context/Context";

export default function CartCheckoutBar() {
  const { navigate } = useRouting();
  const { setSelected, total } = useContext(Context);
  const qty = useQty();

  return (
    <>
      <Wrapper onPress={() => {
        setSelected("cart")
        navigate({
          routeName: "cart",
        })
      }}>
         {/* <LinearGradient
        // Background Linear Gradient
        colors={['#1662e2', '#00ffb8']}
        start={{x: 0, y: 0}}
        start={{x: 1, y: 1}}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 60,
        }}
      /> */}
        <ViewCart>View Cart</ViewCart>
        <Total>
          ${(+total).toFixed(2)}
        </Total>
        <Qty>{qty}</Qty>
      </Wrapper>
    </>
  )
};


const Total = styled.Text`
  color: white;
  font-size: 16px;
  margin: 0 30px;
`;
const Qty = styled.Text`
  color: white;
  border-width: 1px;
  border-radius: 5px;
  border-color: white;
  padding: 4px;
  text-align: center;
  font-size: 13px;
  margin: 0 30px;
`;
const ViewCart = styled.Text`
  position: absolute;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
const Wrapper = styled.TouchableOpacity`
  /* position: absolute; */
  /* bottom: 0; */
  height: 55px;
  width: 100%;
  /* flex: 1; */
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  background-color: #096e00; 
`;
