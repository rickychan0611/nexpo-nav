import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Divider, IconButton, Headline, Drawer, ActivityIndicator } from "react-native-paper";

export default function Status({status, theme}) {
  return (
    <View>
      {status === "Out for Delivery" ? <IconButton icon="truck-delivery" color={theme.green} size={16} /> :
        status === "Order Cancelled" ? <IconButton icon="close-circle" color={theme.red} size={16} /> :
          status === "Order in Proccess" ? <IconButton icon="clock" color={"orange"} size={16} /> :
            status === "Order Completed" ? <IconButton icon="check-circle" color={theme.green} size={16} /> :
              <IconButton icon="check-circle-outline" color={theme.green} size={16} />
      }
    </View>
  )
};

