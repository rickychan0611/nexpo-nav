import React, { useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import Elevations from 'react-native-elevation'
import useQty from '../../hooks/useQty';

import styled from 'styled-components/native';
import { Badge, Icon, withBadge } from 'react-native-elements'
import { Context } from "../../context/Context";
import BottomBarIcons from "../../components/BottomBarIcons"

let useRouter;
if (Platform.OS === 'web') {
  import('next/router')
    .then((importNext) => {
      useRouter = importNext.useRouter
    })
}


export default function BottomBar() {
  const router = Platform.OS === 'web' ? useRouter() : null

  const { navigate } = useRouting();

  const { user, selected, setSelected } = useContext(Context);
  const qty = useQty();

  const BadgedIcon = qty > 0 ? withBadge(qty)(Icon) : Icon

  //for web only. make bottom bar icon selected
  useEffect(() => {

    if (router) {
      let pathname = router.pathname.substring(1)
      console.log(pathname)
      if (
        pathname === "checkout" ||
        pathname === "checkout/shipping"
      ) { setSelected("cart") }
      else setSelected(pathname)
    }
  }, [router, user])

  return (
    <>
      <Wrapper style={Elevations[6]}>
        <ContentArea>
          <BottomBarIcons />

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