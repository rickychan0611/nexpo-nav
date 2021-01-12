import React, { useContext } from "react";
import Sidebar from "react-sidebar";

import { Platform } from "react-native";
import styled from "styled-components/native";

import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import AdminTopBar from "../../components/AdminTopBar";
import AdminSideBar from "../../components/AdminSideBar";

export default function AdminWebWrapper({ children }) {
  const { theme } = useContext(ThemeContext);
  const {
    openWebAdminMenu, setOpenWebAdminMenu, data
  } = useContext(Context);

  const menu = <AdminSideBar data={data} />

  //This is WEB layout, website has fixed side bar
  if (Platform.OS === "web") {
    return (
      <>
        <AdminTopBar />
        <WebContextArea>
          <Sidebar
            sidebar={menu}
            open={openWebAdminMenu}
            onSetOpen={() => setOpenWebAdminMenu(false)}
            shadow
            styles={{ sidebar: { position: "fixed", left: 0, background: "white", paddingLeft: 30, paddingRight: 30, paddingTop: 10, minWidth: 170 } }}
          >
            {/* <WebContentColumn   backgroundColor={theme.backgroundColor}> */}
            {children}
            {/* </WebContentColumn> */}
          </Sidebar>
        </WebContextArea>
      </>
    )
  }
}

const WebContextArea = styled.View`
      flex: 1;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: flex-start;
      background-color: white;
      width: 100%;
      max-width: 500px;
      height: 100vh;
`;