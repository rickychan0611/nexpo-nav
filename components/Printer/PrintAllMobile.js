import React, { useRef, useContext, useEffect, useState } from "react";
import * as Print from "expo-print";
// import * as MediaLibrary from "expo-media-library";
// import * as Sharing from "expo-sharing";
import InvoiceHTMLAll from "./invoiceHTMLAll";

import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Button } from 'react-native-paper';

export default function PrintAllMobile({allOrders}) {

  const printHTML = async (allOrders) => {
    try {
      await Print.printAsync({ html: InvoiceHTMLAll(allOrders) });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrint = () => {console.log("print something man")}

  return (
    <>
    <Button color="#e0e0e0" icon="printer" mode="contained"
        onPress={
          () => printHTML(allOrders)
        }
        style={{ marginBottom: 15 }}>
        Print All
          </Button>
    </>
  )
};