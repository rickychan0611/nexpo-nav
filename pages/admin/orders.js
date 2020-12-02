
import React from "react";

import { Platform } from "react-native";
import OrdersList from "./OrdersList";

import AdminWebWrapper from "../../components/AdminWebWrapper";
import AdminMobileWrapper from "../../components/AdminMobileWrapper";

export default function orders() {

  //This is WEB layout, website has fixed side bar
  if (Platform.OS === "web") {
    return (
      <AdminWebWrapper>
        <OrdersList />
      </AdminWebWrapper>
    )
  }

  //This is mobile layout, mobile has side bar closed
  else return (
    <AdminMobileWrapper>
      <OrdersList />
    </AdminMobileWrapper>
  );
}
