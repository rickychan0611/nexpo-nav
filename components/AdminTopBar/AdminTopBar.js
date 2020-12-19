import React, { useContext, useEffect } from "react";
import { db } from "../../firebaseApp";
import { ThemeContext } from "../../context/ThemeContext";
import { Context } from "../../context/Context";

import { View, Text, Platform, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { Icon } from 'react-native-elements'
import { Title } from 'react-native-paper';

import SaveProductButton from '../../components/SaveProductButton';
import EditProductButton from '../../components/EditProductButton';

import { Link, useRouting } from "expo-next-react-navigation";

export default function AdminTopBar() {
  const { theme } = useContext(ThemeContext);
  const { navigate, getParam } = useRouting();

  const {
    setOpenWebAdminMenu, selected
  } = useContext(Context);

  useEffect(()=>{
    console.log("selected!!!!!!!!!!!!!")
    console.log(selected)
  },[])
  
  return (
    <>
      <Container theme={theme} style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
      }}>
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "nowrap" }}>

          <IconWrapper>
            <TouchableOpacity
              onPress={() => { setOpenWebAdminMenu(true) 
                console.log(selected)
              }}>
              <Icon
                name='bars'
                type='font-awesome'
                color={theme.TopBarTitleColor}
              />
            </TouchableOpacity>
          </IconWrapper>

          <Header theme={theme}>Admin Panel </Header>

        </View>

        {/* save button */}
        {getParam("path") === "create-product" && <SaveProductButton />}
        {getParam("path") === "edit-product" && <EditProductButton />}

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
  /* border-bottom-color: #fcba03;
  border-bottom-width: 1px; */
  /* box-shadow: 0px 12px 10px rgba(0,0,0,0.25); */
`;
const IconWrapper = styled.View`
  /* flex: 1; */
  justify-content: center;
  /* align-items: flex-end; */
`;

const Header = styled(Title)`
  flex: 1;
  justify-content: center;
  color: ${props => props.theme.TopBarTitleColor};
  font-weight: ${Platform.OS === "web" ? "bold" : "normal"};
   margin-left: 25px;
   /* margin-bottom: 20px; */
`;
