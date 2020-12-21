import React, { useRef, useContext, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";

import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Button } from 'react-native-paper';
import InvoiceToPrintALL from './InvoiceToPrintALL';
import { ViewBase } from "react-native";

export default function PrintAllWeb({ allOrders }) {

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Button color="#e0e0e0" icon="printer" mode="contained"
        onPress={
          () => handlePrint(componentRef)
        }
        style={{ marginBottom: 15 }}>
        Print All
          </Button>
      <View
      style={{
        overflow: "hidden", height: 0
      }}>
        <View style={{width: "99%"}} ref={componentRef} >
        {allOrders.map((order, index) => {
          return (
            <InvoiceToPrintALL order={order} isAll={true} index={index}/>
          )
        })}
        </View>
      </View>
    </>
  )
};