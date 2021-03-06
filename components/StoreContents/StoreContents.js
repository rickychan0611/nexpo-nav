
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { ProductsContext } from "../../context/ProductsContext";

import { SearchBar, Button } from 'react-native-elements';
import { View, TouchableOpacity, Platform, Text } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import { db } from "../../firebaseApp";

import BottomBar from "../../components/BottomBar";
import ProductCard from "../../components/ProductCard";
import CategoryNames from "../../components/CategoryNames";
import ViewCartBar from "../../components/ViewCartBar";

import Store_Web_LG from "../../layouts/Store_Web_LG"

// const API_URL = `https://strapi-ric.herokuapp.com/categories`
// const API_URL = `http://localhost:1337/categories`

export default function StoreContents({ ssrData }) {
  // Edit Mode

  const { navigate } = useRouting();

  const {
    setSelectedItem, selectedCat, selected,
    newOrderProductList, setSelected, setProduct
  } = useContext(Context);

  const {
    listenCategories,
    productData, queryProduct,
  } = useContext(ProductsContext);

  const outline = Platform.OS === 'web' ? { outline: "none" } : null;

  useEffect(() => {
    if (selected === "store") {
      listenCategories()
      queryProduct()
    }
  }, [selected])

  return (
    <>
      {/* <CartBarWrapper up={newOrderProductList.length > 0}> */}
      <View style={{
        // flex:1,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
        flexWrap: "nowrap",
        backgroundColor: "#fcfa92"
      }}>
        <Text> --- Edit Mode ---</Text>
      </View>
      {productData && <>
        {/* <SearchBar
            placeholder="Search"
            // onChangeText={this.updateSearch}
            // value={"search"}
            lightTheme
            platform="ios"
            containerStyle={{ width: "100%", maxWidth: 900, backgroundColor: "white" }}
            inputContainerStyle={{ backgroundColor: "#f2f2f2", ...outline }}
            inputStyle={outline}
          /> */}
        <ContextArea up={newOrderProductList.length > 0}>
          <Store_Web_LG edit={true} />
        </ContextArea>
      </>
      }
    </>
  );
}

const CartBarWrapper = styled.View`
      flex: 1;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      max-width: 900px;
`;
const ContextArea = styled.View`
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: flex-start;
      background-color: white;
      width: 100%;
      max-width: 900px;
      height: ${Platform.OS === 'web' ? `calc(100vh)` : `100%`}; */
`;
const CategoryScrollView = styled.ScrollView`
      height: 100%;
      background-color: white;
      border-right-color: #e8e6e6;
`;

const CategoryContainer = styled.View`
      /* flex: 2;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: flex-start;
      background-color: yellow;
      width: 100%;
      padding-bottom: 200px;
      height: ${Platform.OS === 'web' ? `calc(100vh - 160px)` : `100%`}; */
`;
const ProductContainer = styled.ScrollView`
      flex: 6;
      background-color: white;
      /* background-color: #e8e6e6; */
      height: 100%;
      flex-direction: column;
`;