
import React from "react";
import { Button } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";

export default function Home() {
  const { navigate } = useRouting();

  return (
    <View style={styles.container}>
      <Title>Title</Title>
      <Text style={styles.text}>Home Screen 🥳</Text>
      <Button
        title="Click me to open profile :)"
        onPress={() =>
          navigate({
            routeName: "Profile",
            params: { id: "chris" },
          })
        }
      />
    </View>
  );
}

const Title = styled.Text`
  color: red;
`;

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