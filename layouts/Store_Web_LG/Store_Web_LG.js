
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { ProductsContext } from "../../context/ProductsContext";
import { ScrollView, TouchableOpacity, Platform, Text } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FlatGrid } from 'react-native-super-grid'

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
    <Grid>
      <Col size={1} style={{
        maxWidth: 150,
        minWidth: 100,
        height: Platform.OS === "web" ? "calc(100vh - 60px)" : "100%",
        paddingLeft: 10,
        paddingRight: 10
      }}>
        <ScrollView>
          <CategoryNames />
        </ScrollView>
      </Col>

      <Col size={3} style={{
        height: Platform.OS === "web" ? "calc(100vh - 60px)" : "100%",
        backgroundColor: "#e8dfe1"
      }}>

        <FlatGrid style={{
          marginTop: 10,
          flex: 1
        }}
          data={productData[selectedCat]}
          itemDimension={200}
          spacing={10}
          renderItem={({ item }) => {
            return (
              <>
                <TouchableOpacity key={item.uid}
                  onPress={() => {
                    setSelectedItem(item)
                    navigate({
                      routeName: "product",
                      params: { id: item.uid },
                      web: { as: `/product?id=${item.uid}` },
                    })
                  }}>
                  <ProductCard item={item} />
                </TouchableOpacity>


                {/* <TouchableOpacity key={item.uid}
                  onPress={() => {
                    setSelectedItem(item)
                    navigate({
                      routeName: "product",
                      params: { id: item.uid },
                      web: { as: `/product?id=${item.uid}` },
                    })
                  }}>
                  <ProductCard item={item} />
                </TouchableOpacity>
                <TouchableOpacity key={item.uid}
                  onPress={() => {
                    setSelectedItem(item)
                    navigate({
                      routeName: "product",
                      params: { id: item.uid },
                      web: { as: `/product?id=${item.uid}` },
                    })
                  }}>
                  <ProductCard item={item} />
                </TouchableOpacity> */}
              </>
            )
          }} />


      </Col>
    </Grid>
  );
}
