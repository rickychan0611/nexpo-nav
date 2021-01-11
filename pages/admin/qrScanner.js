
import React from "react";

import { Platform } from "react-native";
import QrScanning from "./QrScanning";

import AdminWebWrapper from "../../components/AdminWebWrapper";
import AdminMobileWrapper from "../../components/AdminMobileWrapper";

export default function qrScanner() {

  //This is WEB layout, website has fixed side bar
  if (Platform.OS === "web") {
    return (
      <AdminWebWrapper>
        <QrScanning />
      </AdminWebWrapper>
    )
  }

  //This is mobile layout, mobile has side bar closed
  else return (
    <AdminMobileWrapper>
      <QrScanning />
    </AdminMobileWrapper>
  );
}
