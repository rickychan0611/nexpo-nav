
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import Sidebar from "react-sidebar";
import { Appbar } from 'react-native-paper';

import { Input } from 'react-native-elements';
import { View, TouchableOpacity, Platform, Animated, Button } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import SideMenu from 'react-native-side-menu'
import { db } from "../../firebase";

import BottomBar from "../../components/BottomBar";
import ProductCard from "../../components/ProductCard";
import AppContainer from "../../components/AppContainer";
import AdminTopBar from "../../components/AdminTopBar";
import AdminSideBar from "../../components/AdminSideBar";
import CreateProduct from "./CreateProduct";

import dataJson from '../../public/db.json';
import CartCheckoutBar from "../../components/CartCheckoutBar";
import { ScrollView } from "react-native-gesture-handler";

const API_URL = `https://strapi-ric.herokuapp.com/categories`
// const API_URL = `http://localhost:1337/categories`

export default function panel({ ssrData }) {
  const { navigate } = useRouting();
  const {
    user, openAdminMenu, openWebAdminMenu, setOpenWebAdminMenu,
    selectedItem, data, setData, total,
    categories, setCategories
  } = useContext(Context);

  const outline = Platform.OS === 'web' ? { outline: "none" } : null;
  const [product, setProduct] = useState({});

  const handleChange = (name, value) => {
    setProduct(prev => {
      return { ...prev, [name]: value }
    })
  };

  useEffect(() => {
    db.collection("categories").get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id)
          setCategories(prev => {
            return [...prev, doc.id]
          })
        })
      })
      .catch((err) => console.log(err))
  }, [])

  const menu = <AdminSideBar data={data} />

  //This is WEB layout, website has fixed side bar
  if (Platform.OS === "web") {
    return (
      <>
        <AdminTopBar />
        <WebContextArea>
          <Sidebar
            sidebar={menu}
            open={openWebAdminMenu}
            onSetOpen={()=>setOpenWebAdminMenu(false)}
            shadow
            styles={{ sidebar: { background: "white", paddingLeft: 30, paddingRight: 30, paddingTop: 10, minWidth: 170} }}
          >
            <WebContentColumn>
              <CreateProduct />
            </WebContentColumn>
          </Sidebar>
        </WebContextArea>
      </>
    )
  }
  //This is mobile layout, mobile has side bar closed
  else return (
    <SideMenu
      menu={<View style={{padding: 20, backgroundColor: "#ededed", height: "100%"}}>{menu}</View>}
      isOpen={openAdminMenu}
      animationFunction={(prop, value) =>
        Animated.spring(prop, {
          toValue: value,
          friction: 8,
          useNativeDriver: true,
        })
      }
      >
      <ScrollView>
        <MobileContextArea>
          <CreateProduct />
        </MobileContextArea>
      </ScrollView>
    </SideMenu>
  );
}

const MobileContextArea = styled.View`
      flex: 1;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: flex-start;
      background-color: white;
      width: 100%;
      max-width: 900px;
      padding: 0px 10px 20px 10px;
`;
const WebContextArea = styled.View`
      flex: 1;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: flex-start;
      background-color: white;
      width: 100%;
      max-width: 900px;
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

const SideBarColumn = styled.ScrollView`
      flex: 1;
      height: 100%;
      min-width: 40px;
      background-color: white;
      border-right-color: #e8e6e6;
      border-right-width: 4px;
`;
const WebContentColumn = styled.ScrollView`
      flex: 3;
      height: 100%;
      background-color: white;
      /* border-right-color: #e8e6e6;
      border-right-width: 4px; */
      padding: 0px 10px 20px 10px;

`;

const Title = styled.Text`
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
`;