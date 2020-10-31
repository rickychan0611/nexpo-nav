
import React from "react";
import { Button } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";

export default function Profile() {
  const { goBack } = useRouting();

  return (
    <View style={styles.container}>
    <Text style={styles.text}>Profile! 🏋️‍♀️</Text>
    <Button title="👈 Go back" onPress={() => goBack()} />
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: 20,
      margin: 20,
    },
  });