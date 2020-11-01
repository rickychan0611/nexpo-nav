import React from "react";
import { View, StyleSheet } from "react-native";
import { Link } from 'expo-next-react-navigation'
import styled from 'styled-components/native';
import { Icon } from 'react-native-elements'

export default function BottomBar() {
  return (
    <>
      <Wrapper style={styles.container}>
        <ContentArea>

          <Link routeName="Profile" style={styles.link}>
          <Button>
            <Icon
              name='home'
              type='font-awesome-5'
              color='#517fa4'
            />
            <Name>Home</Name>
            </Button>
          </Link>

          <Link routeName="Profile" style={styles.link}>
          <Button>
            <Icon
              name='star'
              type='font-awesome-5'
              color='#517fa4'
            />
            <Name>Home</Name>
            </Button>
          </Link>

          <Link routeName="Profile" style={styles.link}>
          <Button>
            <Icon
             name='store'
             type='font-awesome-5'
             color='#517fa4'
            />
            <Name>Home</Name>
            </Button>
          </Link>

          <Link routeName="Profile" style={styles.link}>
          <Button>
            <Icon
              name='shopping-cart'
              type='font-awesome-5'
              color='#517fa4'
            />
            <Name>Home</Name>
            </Button>
          </Link>

          <Link routeName="Profile" style={styles.link}>
          <Button>
            <Icon
              name='user-circle'
              type='font-awesome-5'
              color='#517fa4'
            />
            <Name>Home</Name>
            </Button>
          </Link>
          </ContentArea>
      </Wrapper >
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 2,
    shadowRadius: 3.84,
    elevation: 20,
  },
  link : {
    flex: 1,
  flexDirection: "column",
  flexWrap: "nowrap",
  alignItems: "center",
  justifyContent: "center"
  }
});

const Name = styled.Text`
  color: #517fa4;
`;
const Button = styled.View`
  flex: 1;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.View`
  position: absolute;
  bottom: 0;
  height: 65px;
  width: 100%;
  flex: 1;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  background-color: white;
`;
const ContentArea = styled.View`
  position: absolute;
  bottom: 0;
  height: 60px;
  width: 100%;
  max-width: 500px;
  flex: 1;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding: 10px;
  /* background-color: lightblue; */
`;