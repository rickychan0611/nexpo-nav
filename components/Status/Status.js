import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Divider, IconButton, Headline, Drawer, ActivityIndicator } from "react-native-paper";

export default function Status({ status, theme }) {
  return (
    <View>
      {status === "Out for Delivery" ? <IconButton icon="truck-delivery" color={theme.green} size={16} /> :
        status === "Cancelled & Refunded" ? <IconButton icon="close-circle" color={theme.primary} size={16} /> :
          status === "Cancelled" ? <IconButton icon="close-circle" color={theme.primary} size={16} /> :
            status === "In Progress" ? <IconButton icon="clock" color={"orange"} size={16} /> :
              status === "Completed" ? <IconButton icon="check-circle" color={theme.green} size={16} /> :
                <IconButton icon="frequently-asked-questions" color={theme.green} size={16} />
      }
    </View>
  )
};

