
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";
import { ProductsContext } from "../context/ProductsContext";

import { View, TouchableOpacity, Platform, Text } from "react-native";

import Store_Mobile_XS from "../layouts/Store_Mobile_XS";
import Store_Web_LG from "../layouts/Store_Web_LG";


export default function Store({ ssrData }) {

  const {
    selectedCat, selected,
    setSelected, categories
  } = useContext(Context);

  const {
    listenCategories,
    queryProduct,
  } = useContext(ProductsContext);


  useEffect(() => {
    if (selected === "store") {
      listenCategories()
      queryProduct()
    }
  }, [selected])

  useEffect(() => {
    setSelected("store")
  }, [])


  useEffect(() => {
    if (!categories) {
      listenCategories()
    }
    else if (!selectedCat && categories) {
      setSelectedCat(categories[0].uid)
    }
  }, [selectedCat, categories])

  return (
    <>
      {Platform.OS === "web" && <Store_Web_LG />}
      {Platform.OS !== "web" && <Store_Mobile_XS />}
    </>
  );
}

