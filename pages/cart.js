
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../context/Context";
import { ThemeContext } from "../context/ThemeContext";
import { Divider, TextInput, Headline, HelperText } from "react-native-paper";
import { db } from "../firebaseApp";
import { Image, Platform, ScrollView, Text, View } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import emptyCart from "../public/emptyCart.jpg"
import validator from 'validator';

import BottomBar from "../components/BottomBar";
import ProductCard from "../components/ProductCard";
import CartCheckoutBar from "../components/CartCheckoutBar";
import CartItems from "../components/CartItems";
import AddressForm from "../components/AddressForm";
import { forEach } from "react-native-elevation";
import Loader from "../components/Loader";

import AppWrapper from "../components/AppWrapper";
import Cart_Web_LG from "../layouts/Cart_Web_LG"

export default function Cart() {
  const { navigate } = useRouting();
  const [loading, setLoading] = useState(false);
  const [pointErr, setPointErr] = useState("");
  const { theme } = useContext(ThemeContext);

  const {
    total, user, setSelected,
    newOrderProductList, setNewOrderProductList,
    redeemPoint, setRedeemPoint,
    shippingAddress, setShippingAddress,
    deliveryMsg, setDeliveryMsg
  } = useContext(Context);

  const shippingDefault = {
    address1: "",
    address2: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
    phoneNumber: ""
  }

  const [err, setErr] = useState(shippingDefault);

  const onSubmit = () => {

    if (!newOrderProductList[0]) {
      alert("Your shopping Cart is empty. Please add something : )")
      return
    }

    else if (!user) {
      navigate({
        routeName: "account",
      })
    }

    else {
      navigate({
        routeName: "checkout/shipping",
      })
    }
  }

  const handleChanage = (value) => {
    setRedeemPoint(value)
  }

  useEffect(() => {
    setNewOrderProductList(prev => prev)
  }, [newOrderProductList])

  useEffect(() => {
    setLoading(false)
    if (user) {
      db.collection('addressBook').where("userId", "==", user.uid).get()
        .then((snapshot) => {
          !snapshot.empty && snapshot.forEach((doc) => {
            setShippingAddress(prev => ({ ...prev, ...doc.data() }))
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [user])


  return (
    <AppWrapper>
      <Cart_Web_LG />
    </AppWrapper>
  );
}

