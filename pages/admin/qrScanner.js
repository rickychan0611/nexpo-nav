
import React from "react";

import { Platform } from "react-native";
import QrScanner from "./QrScanner";

import AdminWebWrapper from "../../components/AdminWebWrapper";
import AdminMobileWrapper from "../../components/AdminMobileWrapper";

export default function qrScanner() {

  //This is WEB layout, website has fixed side bar
  if (Platform.OS === "web") {
    return (
      <AdminWebWrapper>
        <QrScanner />
      </AdminWebWrapper>
    )
  }

  //This is mobile layout, mobile has side bar closed
  else return (
    <AdminMobileWrapper>
      <QrScanner />
    </AdminMobileWrapper>
  );
}
