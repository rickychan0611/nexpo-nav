import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { AdminContext } from "../../context/AdminContext";

export default function DatePickerWeb() {

  const { orderDate, setOrderDate } = useContext(AdminContext);

  return (
    <View>
      <div>Date: <DatePicker selected={orderDate} 
      onChange={date => {
        setOrderDate(date)
        console.log(date)
      }

      } /></div>
    </View>
  )
};

