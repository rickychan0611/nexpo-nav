import React, { useState, useContext, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { Button } from 'react-native-paper';

import { View, Text } from "react-native";
import styled from "styled-components/native";
import { AdminContext } from "../../context/AdminContext";

export default function DatePickerMobile() {

  const { orderDate, setOrderDate } = useContext(AdminContext);

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || orderDate;
    setShow(Platform.OS === 'ios');
    setOrderDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View>
      <Button 
      icon="calendar" 
      mode="contained" 
      color="white"
      onPress={showDatepicker}>{moment(orderDate).format("YYYY-MMM-DD")}
      </Button>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={orderDate}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  )
};

