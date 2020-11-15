
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";
import { SearchBar, Button } from 'react-native-elements';
import { View, TouchableOpacity, Platform } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";

import BottomBar from "../components/BottomBar";
import ProductCard from "../components/ProductCard";
import AppContainer from "../components/AppContainer";
import CategoryNames from "../components/CategoryNames";

import dataJson from '../public/db.json';
import CartCheckoutBar from "../components/CartCheckoutBar";

const API_URL = `https://strapi-ric.herokuapp.com/categories`
// const API_URL = `http://localhost:1337/categories`

export default function Store({ ssrData }) {
  const { navigate } = useRouting();
  const {
    selectedItem, data, setData, total,
    setSelectedItem, selectedCat,
    newOrderProductList, setNewOrderProductList,
  } = useContext(Context);

  const outline = Platform.OS === 'web' ? { outline: "none" } : null;

  const query = async () => {
    // const res = await fetch(API_URL)
    // const data = await res.json()

    // ssrData ? setData(ssrData) : setData(data)
    ssrData ? setData(dataJson) : setData(dataJson)
  }

  useEffect(() => {
    query()
  }, [])

  return (
    <>
      <CartBarWrapper>
        {data && <>
          <SearchBar
            placeholder="Search"
            // onChangeText={this.updateSearch}
            // value={"search"}
            lightTheme
            platform="ios"
            containerStyle={{ width: "100%", maxWidth: "500px", backgroundColor: "white" }}
            inputContainerStyle={{ backgroundColor: "#f2f2f2", ...outline }}
            inputStyle={outline}
          />
          <ContextArea>

            <CategoryScrollView>
              <CategoryNames data={data} />
            </CategoryScrollView>

            <ProductContainer>
              {data && data[selectedCat].products.map((item) => {
                return (
                  <TouchableOpacity key={item.id}
                    onPress={() => {
                      setSelectedItem(item)
                      navigate({
                        routeName: "product",
                        params: { id: item.id },
                        web: { as: `/product/${item.name}` },
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
      background-color: #e8e6e6;
      height: 100%;
      flex-direction: column;
`;