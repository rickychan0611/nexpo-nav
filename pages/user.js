

import React, {useContext} from "react";
import { Context } from "../context/Context";
import { Button } from 'react-native-elements';
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import BottomBar from "../components/BottomBar";
import AppContainer from "../components/AppContainer";

export default function User() {
  const { navigate, goBack } = useRouting();
  const { user } = useContext(Context);

  return (
    <>
      <ContextArea>
        <MyText>Profile! 🏋️‍♀️</MyText>
        <Button title="👈 Go back" onPress={() => goBack()} />  
      </ContextArea>
      <BottomBar />
    </>
  );
}


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