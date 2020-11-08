
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { Input } from 'react-native-elements';
import { View, TouchableOpacity, Platform } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";

import BottomBar from "../../components/BottomBar";
import ProductCard from "../../components/ProductCard";
import AppContainer from "../../components/AppContainer";
import AdminSideBar from "../../components/AdminSideBar";
import CreateProduct from "./CreateProduct";

import dataJson from '../../public/db.json';
import CartCheckoutBar from "../../components/CartCheckoutBar";

const API_URL = `https://strapi-ric.herokuapp.com/categories`
// const API_URL = `http://localhost:1337/categories`

export default function panel({ ssrData }) {
  const { navigate } = useRouting();
  const {
    user,
    selectedItem, data, setData, total,
    setSelectedItem, selectedCat,
    newOrderProductList, setNewOrderProductList,
  } = useContext(Context);

  const outline = Platform.OS === 'web' ? { outline: "none" } : null;
  const [product, setProduct] = useState({});

  const handleChange = (name, value) => {
    setProduct(prev => {
      return { ...prev, [name]: value }
    })
  };

  return (
    <>
      <ContextArea>

        <SideBarScrollView>
          <AdminSideBar data={data} />
        </SideBarScrollView>

        <ContentWrapper>

          <CreateProduct />
          
        </ContentWrapper>
      </ContextArea>
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
      /* padding: 0px 10px 20px 10px; */
`;

const ContentWrapper = styled.View`
      flex: 6;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: flex-start;
      background-color: white;
      width: 100%;
      padding: 20px;
      /* padding-bottom: 70px; */
`;

const SideBarScrollView = styled.ScrollView`
      height: 100%;
      background-color: white;
      border-right-color: #e8e6e6;
      border-right-width: 4px;
`;

const Title = styled.Text`
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
`;