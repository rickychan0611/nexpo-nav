
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";
import { SearchBar, Button } from 'react-native-elements';
import { View, TouchableOpacity, Platform } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import { db } from "../firebase";

import BottomBar from "../components/BottomBar";
import ProductCard from "../components/ProductCard";
import AppContainer from "../components/AppContainer";
import CategoryNames from "../components/CategoryNames";
import CartCheckoutBar from "../components/CartCheckoutBar";

import dataJson from '../public/db.json';

// const API_URL = `https://strapi-ric.herokuapp.com/categories`
// const API_URL = `http://localhost:1337/categories`

export default function Store({ ssrData }) {
  const { navigate } = useRouting();
  const {
     productData, setProductData,
    setSelectedItem, selectedCat,
    newOrderProductList,
  } = useContext(Context);

  const outline = Platform.OS === 'web' ? { outline: "none" } : null;

  const queryProducts = async () => {
    setProductData([])
    // const res = await fetch(API_URL)
    // const data = await res.json()
    const productSnapshot = await db.collection("products").where("category", "array-contains", selectedCat).get()
    productSnapshot.forEach((doc) => {
      console.log(doc.data())
      setProductData(prev => {
        return [...prev, doc.data()]
      })
    })
    // ssrData ? setData(ssrData) : setData(data)
    // ssrData ? setData(dataJson) : setData(dataJson)
  }

  useEffect(() => {
    console.log(selectedCat)
    if (selectedCat) {
      queryProducts()
    }
  }, [selectedCat])

  useEffect(() => {
    console.log(newOrderProductList)
  }, [newOrderProductList])

  return (
    <>
      <CartBarWrapper>
        {productData && <>
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

            <CategoryScrollView>
              <CategoryNames />
            </CategoryScrollView>

            <ProductContainer>
              {productData && productData[0] && productData.map((item) => {
                return (
                  <TouchableOpacity key={item.uid}
                    onPress={() => {
                      setSelectedItem(item)
                      navigate({
                        routeName: "product",
                        params: { id: item.uid },
                        web: { as: `/product/${item.englishName}` },
                      })
                    }}>
                    <ProductCard item={item} />
                  </TouchableOpacity>
                )
              })}
            </ProductContainer>
          </ContextArea>
        </>
        }
        {newOrderProductList.length > 0 ?
          <CartCheckoutBar />
          : null}
      </CartBarWrapper>
      <BottomBar />
    </>
  );
}

// export async function getServerSideProps() {

//   const res = await fetch(API_URL)
//   const data = await res.json()
//   return { props: { ssrData: data } }

//   // return { props: { ssrData: dataJson } }

// }

const CartBarWrapper = styled.View`
      flex: 1;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      max-width: 500px;
      padding-bottom: 62px;
`;
const ContextArea = styled.View`
      flex: 1;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: flex-start;
      background-color: white;
      width: 100%;
      max-width: 500px;
      /* padding-bottom: 70px; */
`;
const CategoryScrollView = styled.ScrollView`
      height: 100%;
      background-color: white;
      border-right-color: #e8e6e6;
      border-right-width: 4px;
`;
const ProductContainer = styled.ScrollView`
      flex: 5;
      background-color: white;
      /* background-color: #e8e6e6; */
      height: 100%;
      flex-direction: column;
`;