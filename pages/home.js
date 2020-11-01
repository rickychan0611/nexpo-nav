
import React, {useContext} from "react";
import { Context } from "../context/Context";
import { ThemeProvider, Button } from 'react-native-elements';
import { View, Text, StyleSheet } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import BottomBar from "../components/BottomBar";

export default function Home() {
  const { navigate } = useRouting();
  const { user } = useContext(Context);

  console.log(user)
  return (
    <AppContainer>
      <ContextArea>
      <MyText>Home Screen 🥳 {user} </MyText>
      <Button
        title="Click me to open profile :)"
        onPress={() =>
          navigate({
            routeName: "profile",
            params: { id: "chris" },
          })
        }
      />
      </ContextArea>
      <BottomBar/>
    </AppContainer>
  );
}

const AppContainer = styled.View`
      flex: 1;
      align-items: center;
      background-color: #f5f5f5;
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