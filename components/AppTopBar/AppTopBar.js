import React, { useContext, useEffect } from "react";
import { db } from "../../firebaseApp";
import { ThemeContext } from "../../context/ThemeContext";
import { Context } from "../../context/Context";

import { View, Text, Platform, Image } from "react-native";
import styled from "styled-components/native";

import { Title } from 'react-native-paper';
import logo from "../../assets/icon.png"

import SaveProductButton from '../../components/SaveProductButton';
import EditProductButton from '../../components/EditProductButton';
import TopBarIcons from "../../components/TopBarIcons"

import { Link, useRouting } from "expo-next-react-navigation";

export default function AppTopBar() {
  const { theme, setSelected } = useContext(ThemeContext);
  const { navigate, getParam } = useRouting();

  const {
    setOpenWebAdminMenu, selected
  } = useContext(Context);

  useEffect(() => {
    console.log("selected!!!!!!!!!!!!!")
    console.log(navigate)
  }, [])

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
        zIndex: 1000,
        backgroundColor: "white"
      }}>
        <View style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 25,
          backgroundColor: "white"

        }}>

          <View style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
            onPress={() => {
              setSelected("home")
              navigate({
                routeName: "home"
              })
            }}
          >
            <Image source={logo} style={
              {
                width: "40px",
                height: "40px",
              }
            } />
            <Header style={{
              textAlign: "left",
              color: theme.red
            }}>天天海港超市 </Header>
          </View>

          <View style={{
            flex: 2,
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "flex-end",
            alignItems: "center",
          }}>
            <TopBarIcons />
          </View>

        </View>

        {/* save button */}
        {(getParam("path") === "create-product" || selected === "edit-create") && <SaveProductButton />}
        {(getParam("path") === "edit-product" || selected === "edit-product") && <EditProductButton />}

      </Container>
    </>
  )
};

const Container = styled.View`
  /* flex: .5; */
  flex-direction: row;
  width: 100%;
  height: 60px;
  justify-content: flex-end;
  padding: 15px 15px 10px 15px;
  background-color: white;
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
   /* margin-left: 25px; */
   /* margin-bottom: 20px; */
`;
