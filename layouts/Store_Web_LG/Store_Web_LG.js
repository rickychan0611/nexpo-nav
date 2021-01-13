
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { ProductsContext } from "../../context/ProductsContext";

import { View, TouchableOpacity, Platform, Text } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";

import BottomBar from "../../components/BottomBar";
import ProductCard from "../../components/ProductCard";
import CategoryNames from "../../components/CategoryNames";
import ViewCartBar from "../../components/ViewCartBar";

// const API_URL = `https://strapi-ric.herokuapp.com/categories`
// const API_URL = `http://localhost:1337/categories`

export default function Store_Web_LG() {
  const { navigate } = useRouting();

  const {
    setSelectedItem, selectedCat, selected,
    newOrderProductList, setSelected, categories
  } = useContext(Context);

  const {
    listenCategories,
    productData, queryProduct,
  } = useContext(ProductsContext);

  const outline = Platform.OS === 'web' ? { outline: "none" } : null;

  return (
    <>

    </>
  );
}
