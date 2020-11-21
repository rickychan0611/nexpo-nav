import React, { useContext } from "react";
import { Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import Elevations from 'react-native-elevation'
import { Button } from 'react-native-elements';
import useQty from '../../hooks/useQty';
import { LinearGradient } from 'expo-linear-gradient';

import styled from 'styled-components/native';
import { Icon } from 'react-native-elements'
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";

export default function CartCheckoutBar() {
  const { navigate } = useRouting();
  const { setSelected, total } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const qty = useQty();

  return (
    <>
      <Wrapper onPress={() => {
        setSelected("cart")
        navigate({
          routeName: "cart",
        })
      }}>
          <Margin theme={theme}>
          <Total>
          View Cart  ●  ${(+total).toFixed(2)}
          </Total>
          </Margin>
          {/* <Qty>{qty}</Qty> */}
      </Wrapper>
    </>
  )
};

const Total = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
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
const Margin = styled.View`
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
  background-color: ${props => props.theme.black}; 
  height: 40px;
  width: 90%
`;
const Wrapper = styled.TouchableOpacity`
  position: ${Platform.OS === "web" ? `fixed` : `absolute`};
  bottom: 68px;
  height: 55px;
  width: 100%;
  max-width: 500px;
  /* flex: 1; */
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  
`;
