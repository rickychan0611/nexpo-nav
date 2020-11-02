import React, { useContext } from "react";
import { ImageBackground, StyleSheet, Platform, View } from "react-native";
import styled from "styled-components/native";

const image = { uri: "/background.jpg" }

export default function AppContainer({ children }) {
  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ?
        <ImageBackground source={image} style={styles.image}>
          <Container>
            {children}
          </Container>
        </ImageBackground>
        :
        <Container>
          {children}
        </Container>
      }
    </View>
  )
};

const Container = styled.View`
      flex: 1;
      align-items: center;
      /* background-color: #f5f5f5; */
      width: 100%;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});