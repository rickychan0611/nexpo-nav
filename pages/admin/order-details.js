
import React from "react";

import { Platform } from "react-native";

import AdminWebWrapper from "../../components/AdminWebWrapper";
import AdminMobileWrapper from "../../components/AdminMobileWrapper";

import OrdersDetails from "./OrdersDetails";

export default function orders_dtails() {

  //This is WEB layout, website has fixed side bar
  if (Platform.OS === "web") {
    return (
      <AdminWebWrapper>
        <OrdersDetails />
      </AdminWebWrapper>
    )
  }

  //This is mobile layout, mobile has side bar closed
  else return (
    <AdminMobileWrapper>
      <OrdersDetails />
    </AdminMobileWrapper>
  );
}
