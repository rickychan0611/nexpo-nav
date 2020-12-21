import React, { useRef, useContext, useEffect, useState } from "react";
import * as Print from "expo-print";
// import * as MediaLibrary from "expo-media-library";
// import * as Sharing from "expo-sharing";
import invoiceHTML from "./invoiceHTML";

import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { IconButton } from 'react-native-paper';

export default function PrintAllMobile({allOrders}) {

  const printHTML = async (order) => {
    console.log(order)
    try {
      await Print.printAsync({ html: invoiceHTML(order) });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrint = () => {console.log("print something man")}

  return (
    <>
      <IconButton icon="printer-wireless" color="grey"
        style={{ position: 'absolute', right: -10, top: -35 }}
        onPress={
          () => printHTML(order)
        }
      />
    </>
  )
};