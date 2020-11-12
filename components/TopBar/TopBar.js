import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { Icon } from 'react-native-elements'
import { Context } from "../../context/Context";

export default function TopBar() {
  const {openAdminMenu, setOpenAdminMenu} = useContext(Context);
  return (
    <>
      <Container>
        <TouchableOpacity 
          onPress={()=>{setOpenAdminMenu(!openAdminMenu)}}>
          <BarsIcon
            name='bars'
            type='font-awesome'
            color='black'
          />
        </TouchableOpacity>
      </Container>
    </>
  )
};

const Container = styled.View`
  flex: .04;
  flex-direction: row;
  justify-content: flex-end;
  padding: 15px 25px 15px 25px;
  background-color: yellow;
`;
const BarsIcon = styled(Icon)`
`;