import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Context } from "../../context/Context";

import { View, Text, Platform, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { Icon } from 'react-native-elements'
import { Title } from 'react-native-paper';

export default function AdminTopBar() {
  const { theme } = useContext(ThemeContext);
  const { title } = useContext(Context);

  const { setOpenWebAdminMenu, openWebAdminMenu } = useContext(Context);
  return (
    <>
      <Container theme={theme}>
        <Header theme={theme}>Admin Panel</Header>
        <IconWrapper>
          <TouchableOpacity
            onPress={() => { setOpenWebAdminMenu(true) }}>
            <Icon
              name='bars'
              type='font-awesome'
              color={theme.TopBarTitleColor}
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
  padding: 15px 15px 10px 15px;
  background-color: ${props => props.theme.TopBarBackgroundColor};
  border-bottom-color: #d9d7d7;
  border-bottom-width: 1px;
  /* box-shadow: 0px 12px 10px rgba(0,0,0,0.25); */
`;
const IconWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

const Header = styled(Title)`
  flex: 1;
  color: ${props => props.theme.TopBarTitleColor};
  font-weight: ${Platform.OS === "web" ? "bold" : "normal"};
   /* margin-top: 25px; */
   /* margin-bottom: 20px; */
`;