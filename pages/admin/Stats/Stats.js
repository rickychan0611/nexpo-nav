import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { ProductsContext } from "../../../context/ProductsContext";
import { Context } from "../../../context/Context";
import styled from "styled-components/native";
import arrayMove from 'array-move';
import { View, Platform, Image, TouchableOpacity, Text } from "react-native";
import {
  Surface, IconButton, Button, TextInput, Portal,
  Dialog, Card, Headline, HelperText, Paragraph
} from 'react-native-paper';
import { db, database } from "../../../firebaseApp";
export const firebase = require("firebase");

export default function Stats() {

  const { theme } = useContext(ThemeContext);
  const { productData } = useContext(ProductsContext)
  const { selectedCat, setSelectedCat } = useContext(Context)
  const [cat, setCat] = useState({});
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({})
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")
  const [isNew, setIsNew] = useState(false)

  // useEffect(() => {
  //   db.collection("stats").doc(today)
  // }, []
  // )
  return (
    <>
      <Container>
        <Row >
          <Headline style={{ color: theme.titleColor }}>Stats Overview</Headline>
          <View style={{ alignItems: "flex-end" }}>
            <IconButton icon="plus-circle"
              onPress={() => {
                setShowEditDialog(true)
                setIsNew(true)
                setSelectedCategory({ position: 1 })
              }} />
          </View>
        </Row>
        <CardsWrapper>
          <Surface style={{
            paddingHorizontal: 4,
            height: 80,
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 4,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: theme.lightGrey,
          }}>
            <Text>Orders</Text>
          </Surface>
          <Surface style={{
            paddingHorizontal: 4,
            height: 80,
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 4,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: theme.lightGrey,
          }}>
            <Text>Revenue</Text>
          </Surface>
        </CardsWrapper>
      </Container>
    </>
  )
};

const Container = styled.ScrollView`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  height: ${Platform.OS === "web" ? "calc(100vh - 76px)" : "100%"};
  background-color: white;
`;

const CardsWrapper = styled.View`
  /* width: 100%; */
  /* margin: 10px; */
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 0px 10px 0px 10px ;
`;

const InputView = styled.View`
  margin-bottom: 10px
`;

const Row = styled.View`
 flex-direction: row;
 flex-wrap: nowrap;
 justify-content: space-between;
 align-items: center;
 max-width: 460px;
 padding: 0px 10px 0px 10px;
 margin-bottom: 10;
`;