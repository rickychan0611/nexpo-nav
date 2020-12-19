
import React from "react";

import { Platform } from "react-native";
import EditProduct from "./EditProduct/EditProduct";

import AdminWebWrapper from "../../components/AdminWebWrapper";
import AdminMobileWrapper from "../../components/AdminMobileWrapper";

export default function editProduct() {

  //This is WEB layout, website has fixed side bar
  if (Platform.OS === "web") {
    return (
      <AdminWebWrapper>
        <EditProduct />
      </AdminWebWrapper>
    )
  }

  //This is mobile layout, mobile has side bar closed
  else return (
    <AdminMobileWrapper>
      <EditProduct />
    </AdminMobileWrapper>
  );
}
