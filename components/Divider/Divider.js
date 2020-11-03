import React, {useContext} from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";

export default function Divider({tall}) {
  return (
      <>
      {/* <Text>{wide}</Text> */}
      <Hr a={tall}/>
      </>
    )
};

const Hr = styled.View`
    flex: 1;
    flex-direction: row;
    width: 100%;
    max-height: ${props => props.a};
    background-color: #d1d1d1;
`;