
import React from "react";

import { Platform } from "react-native";

import StoreContents from "../../components/StoreContents";
import AdminWebWrapper from "../../components/AdminWebWrapper";
import AdminMobileWrapper from "../../components/AdminMobileWrapper";

export default function storeListings() {
  // Edit Mode
  
  //This is WEB layout, website has fixed side bar
  if (Platform.OS === "web") {
    return (
      <AdminWebWrapper>
        <StoreContents />
      </AdminWebWrapper>
    )
  }

  //This is mobile layout, mobile has side bar closed
  else return (
    <AdminMobileWrapper>
      <StoreContents />
    </AdminMobileWrapper>
  );
}

