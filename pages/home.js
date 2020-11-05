
import React, {useContext} from "react";
import { Context } from "../context/Context";
import { ThemeProvider, Button } from 'react-native-elements';
import { View, Text, StyleSheet } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import BottomBar from "../components/BottomBar";
import CartCheckoutBar from "../components/CartCheckoutBar";

export default function Home() {
  const { navigate } = useRouting();
  const { user, newOrderProductList } = useContext(Context);

  return (
    <>
          <CartBarWrapper>

      <ContextArea>
      <MyText>Home Screen 🥳 {user} </MyText>
      <Button
        title="Click me to go shopping :)"
        onPress={() =>
          navigate({
            routeName: "store",
            params: { id: "chris" },
          })
        }
      />
      </ContextArea>
      {newOrderProductList.length > 0 ?
          <CartCheckoutBar />
          : null}
      </CartBarWrapper>
      <BottomBar/>
      </>
  );
}

const CartBarWrapper = styled.View`
      flex: 1;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      max-width: 500px;
      padding-bottom: 62px;
`;
const ContextArea = styled.View`
      flex: 1;
      align-items: center;
      background-color: white;
      width: 100%;
      max-width: 500px;
`;
const MyText = styled.Text`
      font-size: 20px;
      margin: 20px;
`;