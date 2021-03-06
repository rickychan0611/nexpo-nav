import React, { useRef, useContext, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";

import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { IconButton } from 'react-native-paper';
import InvoiceToPrint from './InvoiceToPrint.web.js';

export default function PrinterWeb({order}) {

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <IconButton icon="printer" color="grey"
        style={{ position: 'absolute', right: -10, top: -35 }}
        onPress={
          () => handlePrint(componentRef)
        }
      />
      <View style={{
        overflow: "hidden", height: 0
      }}>
        <InvoiceToPrint ref={componentRef} order={order}/>
      </View>
    </>
  )
};