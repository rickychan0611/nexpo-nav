
import React from "react";

import { Platform } from "react-native";
import CreateProduct from "./CreateProduct/CreateProduct";

import AdminWebWrapper from "../../components/AdminWebWrapper";
import AdminMobileWrapper from "../../components/AdminMobileWrapper";

export default function panel() {

  //This is WEB layout, website has fixed side bar
  if (Platform.OS === "web") {
    return (
      <AdminWebWrapper>
        <CreateProduct />
      </AdminWebWrapper>
    )
  }

  //This is mobile layout, mobile has side bar closed
  else return (
    <AdminMobileWrapper>
      <CreateProduct />
    </AdminMobileWrapper>
  );
}
