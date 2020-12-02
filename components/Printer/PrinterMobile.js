import React, { useRef, useContext, useEffect, useState } from "react";

import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { IconButton } from 'react-native-paper';

export default function PrinterMobile() {


  const handlePrint = () => {console.log("print something man")}

  return (
    <>
      <IconButton icon="printer-wireless" color="grey"
        style={{ position: 'absolute', right: -10, top: -35 }}
        onPress={
          () => handlePrint()
        }
      />
    </>
  )
};