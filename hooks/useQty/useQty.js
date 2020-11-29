import React, {useContext, useEffect, useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Context } from "../../context/Context";

export default function useQty() {
  const {newOrderProductList, total} = useContext(Context);
  const [counter, setCounter] = useState(0)
  useEffect(()=>{
    let totalCount = 0;
    if (newOrderProductList.length > 0 ) {

      newOrderProductList.map((item, index) => {
        totalCount = totalCount + item.quantity
        setCounter(totalCount)
      })
    } 
    else setCounter(0);
  },[total])

  return counter;
};