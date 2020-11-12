import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { Icon } from 'react-native-elements'
import { Context } from "../../context/Context";

export default function AdminTopBar() {
  const { setOpenWebAdminMenu, openWebAdminMenu } = useContext(Context);
  return (
    <>
      <Container>
        <IconWrapper>
          <TouchableOpacity
            onPress={() => { setOpenWebAdminMenu(true) }}>
            <Icon
              name='bars'
              type='font-awesome'
              color='black'
            />
          </TouchableOpacity>
        </IconWrapper>
      </Container>
    </>
  )
};

const Container = styled.View`
  /* flex: .5; */
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  padding: 15px 25px 15px 25px;
  background-color: yellow;
`;
const IconWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;