
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";
import { ProductsContext } from "../context/ProductsContext";

import { View, TouchableOpacity, Platform, Text } from "react-native";

import Store_Mobile_XS from "../layouts/Store_Mobile_XS";
import Store_Web_LG from "../layouts/Store_Web_LG";

import AppWrapper from "../components/AppWrapper";
import ViewCartBar from "../components/ViewCartBar";

export default function Store() {

  const {
    selectedCat, selected,
    setSelected, categories
  } = useContext(Context);

  const {
    newOrderProductList,
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
    <AppWrapper>
      <Store_Web_LG />
      <ViewCartBar />

      {/* {newOrderProductList && newOrderProductList.length > 0 ?
        <ViewCartBar />
        : null} */}
    </AppWrapper>
  );
}

