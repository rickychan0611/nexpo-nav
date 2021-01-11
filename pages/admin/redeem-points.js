
import React from "react";

import { Platform } from "react-native";

import AdminWebWrapper from "../../components/AdminWebWrapper";
import AdminMobileWrapper from "../../components/AdminMobileWrapper";
import RedeemForm from "./RedeemForm";

export default function redeem_points() {

  //This is WEB layout, website has fixed side bar
  if (Platform.OS === "web") {
    return (
      <AdminWebWrapper>
        <RedeemForm />
      </AdminWebWrapper>
    )
  }

  //This is mobile layout, mobile has side bar closed
  else return (
    <AdminMobileWrapper>
      <RedeemForm />
    </AdminMobileWrapper>
  );
}
