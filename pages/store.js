
import React, { useContext } from "react";
import { Context } from "../context/Context";
import { SearchBar, Button } from 'react-native-elements';
import { View, TouchableOpacity, Platform } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import BottomBar from "../components/BottomBar";
import ProductCard from "../components/ProductCard";
import AppContainer from "../components/AppContainer";

export default function Store() {
  const { navigate } = useRouting();
  const { user } = useContext(Context);
  const outline = Platform.OS === 'web' ? { outline: "none" } : null;
  const images = [
    'https://cdn3.volusion.com/hckyx.hepad/v/vspfiles/photos/CONC-REDAPPLE-2.jpg',
    'https://cdn3.volusion.com/hckyx.hepad/v/vspfiles/photos/CONC-REDAPPLE-2.jpg',
    'https://cdn3.volusion.com/hckyx.hepad/v/vspfiles/photos/CONC-REDAPPLE-2.jpg'
  ] 
  return (
    <>
      <SearchBar
        placeholder="Search"
        // onChangeText={this.updateSearch}
        // value={"search"}
        lightTheme
        platform="ios"
        containerStyle={{ width: "100%", maxWidth: 500, backgroundColor: "white" }}
        inputContainerStyle={{ backgroundColor: "#f2f2f2", ...outline }}
        inputStyle={outline}
      />
      <ContextArea>
        <ScrollView>
          <CategoryContainer>
          <CategoryName>Fruits</CategoryName>
            <CategoryName>Seafood</CategoryName>
            <CategoryName>Rice</CategoryName>
            <CategoryName>Dim Sum</CategoryName>
            <CategoryName>Snacks</CategoryName>
            <CategoryName>Sauce</CategoryName>
            <CategoryName>Eggs</CategoryName>
            <CategoryName>Healthy</CategoryName>
            <CategoryName>Fruits</CategoryName>
            <CategoryName>Seafood</CategoryName>
            <CategoryName>Rice</CategoryName>
            <CategoryName>Dim Sum</CategoryName>
            <CategoryName>Snacks</CategoryName>
            <CategoryName>Sauce</CategoryName>
            <CategoryName>Eggs</CategoryName>
            <CategoryName>Healthy</CategoryName>
            <CategoryName>Fruits</CategoryName>
            <CategoryName>Seafood</CategoryName>
            <CategoryName>Rice</CategoryName>
            <CategoryName>Dim Sum</CategoryName>
            <CategoryName>Snacks</CategoryName>
            <CategoryName>Sauce</CategoryName>
            <CategoryName>Eggs</CategoryName>
            <CategoryName>Healthy</CategoryName>
          </CategoryContainer>
        </ScrollView>
        <ProductContainer>

        <TouchableOpacity onPress={() => {
            navigate({
              routeName: "details",
            })
          }}>
            <ProductCard images={images}/>
          </TouchableOpacity>

          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ProductContainer>
      </ContextArea>
      <BottomBar />
    </>
  );
}

const ContextArea = styled.View`
      flex: 1;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: flex-start;
      background-color: white;
      width: 100%;
      max-width: 500px;
      padding-bottom: 70px;
`;
const ScrollView = styled.ScrollView`
      height: 100%;
`;
const CategoryContainer = styled.View`
      flex: 2;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: flex-start;
      background-color: #f5f5f5;
`;
const CategoryName = styled.Text`
      margin: 10px 0 10px 0;
`;
const ProductContainer = styled.ScrollView`
      flex: 5;
      background-color: #f5f5f5;
      height: 100%;
      flex-direction: column;
`;