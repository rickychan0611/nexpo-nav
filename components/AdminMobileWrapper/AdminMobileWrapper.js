
import React, { useContext } from "react";
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import SideMenu from 'react-native-side-menu'

import { View, Animated } from "react-native";
import styled from "styled-components/native";

import AdminTopBar from "../../components/AdminTopBar";
import AdminSideBar from "../../components/AdminSideBar";

import { ScrollView } from "react-native-gesture-handler";

export default function AdminMobileWrapper({ children }) {
  const { theme } = useContext(ThemeContext);
  const { openWebAdminMenu, setOpenWebAdminMenu,  data
  } = useContext(Context);

   const menu = <AdminSideBar data={data} />

  //This is mobile layout, mobile has side bar closed
  return (
    <SideMenu
      menu={<View style={{ padding: 20, backgroundColor: "#ededed", height: "100%" }}>{menu}</View>}
      isOpen={openWebAdminMenu}
      onChange={() => { setOpenWebAdminMenu(!openWebAdminMenu) }}
      animationFunction={(prop, value) =>
        Animated.spring(prop, {
          toValue: value,
          friction: 7,
          useNativeDriver: true,
        })
      }
    >
      <AdminTopBar />
        <MobileContextArea backgroundColor={theme.backgroundColor}>
          {children}
        </MobileContextArea>
    </SideMenu>
  );
}

const MobileContextArea = styled.View`
      flex: 1;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: flex-start;
      background-color: ${props => props.backgroundColor};
      width: 100%;
      /* App width */
      max-width: 500px; 
      /* padding: 0px 10px 20px 10px; */
`;