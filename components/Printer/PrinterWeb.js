import React, { useRef, useContext, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";

import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { IconButton } from 'react-native-paper';
import ComponentToPrint from './ComponentToPrint.web.js';

export default function PrinterWeb() {

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
        display: "none"
      }}>
        <ComponentToPrint ref={componentRef} />
      </View>
    </>
  )
};