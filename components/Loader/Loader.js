import React, {useContext} from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Modal, Portal, TextInput, HelperText, Title, Button, Divider, Caption, ActivityIndicator } from 'react-native-paper';

export default function Loader() {

  const containerStyle = {
    padding: 20,
    width: "100%",
    height: "100%"
  };

  return (
      <>
      <Portal>
        <Modal visible={true}  contentContainerStyle={containerStyle}>
        <ActivityIndicator size="large" color="white"/>
        </Modal>
      </Portal>
      </>
    )
};