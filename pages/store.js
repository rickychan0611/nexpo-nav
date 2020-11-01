
import React, {useContext} from "react";
import { Context } from "../context/Context";
import { SearchBar, Button } from 'react-native-elements';
import { View, Text, StyleSheet } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import BottomBar from "../components/BottomBar";
import ProductCard from "../components/ProductCard";

export default function Store() {
  const { navigate } = useRouting();
  const { user } = useContext(Context);

  console.log(user)
  return (
    <AppContainer>
      <SearchBar
        placeholder="Search"
        // onChangeText={this.updateSearch}
        // value={"search"}
        lightTheme
        platform = "ios"
        containerStyle={{width: "100%", maxWidth: 500, backgroundColor: "white"}}
        inputContainerStyle={{backgroundColor: "#f2f2f2", outline: "none"}}
        inputStyle={{ outline: "none"}}
      />
      <ContextArea>
      <CategoryContainer>
        <Text>Fruits</Text>
        <Text>Seafood</Text>
        <Text>Rice</Text>
        <Text>Dim Sum</Text>
        <Text>Snacks</Text>
        <Text>Sauce</Text>
        <Text>Eggs</Text>
        <Text>Healthy</Text>
      </CategoryContainer>
      <ProductContainer>
        <ProductCard>
          
        </ProductCard>
      </ProductContainer>
      </ContextArea>
      <BottomBar/>
    </AppContainer>
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
`;
const CategoryContainer = styled.View`
      flex: 1;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: flex-start;
      background-color: #f5f5f5;
`;
const ProductContainer = styled.View`
      flex: 2;
      align-items: center;
      background-color: #f5f5f5;
`;
const AppContainer = styled.View`
      flex: 1;
      align-items: center;
      background-color: #f5f5f5;
`;
const MyText = styled.Text`
      font-size: 20px;
      margin: 20px;
`;