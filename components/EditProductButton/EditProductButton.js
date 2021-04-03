import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Context } from "../../context/Context";
import { View, Text, Platform, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Icon } from 'react-native-elements'
import { Link, useRouting } from "expo-next-react-navigation";
import { db } from "../../firebaseApp";
import * as firebase from 'firebase/app';
import Loader from "../../components/Loader";

export default function EditProductButton() {
  const { theme } = useContext(ThemeContext);
  const { setError, product, selectedCategory, images, setSelectedCat, setLoading } = useContext(Context);
  const { navigate, getParam, goBack } = useRouting();

  const onEditProductSubmit = () => {

    setError({})

    product.category = selectedCategory

    let validate = new Promise((resolve, reject) => {
      if (!images) {
        alert("Please upload at least one image.")
        reject("Please upload at least one image")
      }
      if (!product.chineseName) {
        setError(prev => ({ ...prev, chineseName: "Required. Please enter a Chinese name" }))
        reject("No chinse name")
      }
      if (!product.englishName) {
        setError(prev => ({ ...prev, englishName: "Required. Please enter an English name" }))
        reject("No english name")
      }
      if (!product.qty) {
        setError(prev => ({ ...prev, qty: "Required. Please enter the quantity" }))
        reject("No qty")
      }
      if (!product.original_price) {
        setError(prev => ({ ...prev, original_price_err: "Required. Please enter the original price" }))
        reject("No original_price")
      }
      if (!product.unit) {
        setError(prev => ({ ...prev, unit: "Cannot be empty" }))
        reject("No unit")
      }
      if (selectedCategory.length === 0) {
        setError(prev => ({ ...prev, category_err: "Error: Please select at least one category or create a new one." }))
        reject("No category selected")
      }
      else resolve(true)
    })

    validate.then(() => {
      //Creat a new product on the server
      setLoading(true)

      const timestamp = new Date()
      db.collection("products").doc(product.uid)
        .update({
          ...product,
          createAt: timestamp,
          images: images && images
        })
        .then(() => {
          setLoading(false)
          setSelectedCat(product.category[0].uid) //select category when redirect
          navigate({ routeName: "admin/store-listings" })

          // let promises = []
          //Update productID in categories collection
          // selectedCategory && selectedCategory[0] &&
          //   selectedCategory.forEach((category) => {
          //     if (category.uid){
          //     let promise = db.collection("categories").doc(category.uid).update({
          //       productId: firebase.firestore.FieldValue.arrayUnion(product.uid)
          //     })
          //       .then(() => {
          //       })
          //       .catch((err) => console.log(category, " NOT added. Err: ", err))
          //     promises.push(promise)
          //   }})
          // Promise.all(promises).then(() => {
          //   setLoading(false)
          //   goBack()
          // }
          // )
        })
        .catch(error => {
          setLoading(false)
          console.log(error)
        })
    })
      .catch(error => {
        setLoading(false)
        console.log(error)
      })
  }

  return (
    <>
      {/* save button */}
      <IconWrapper>
        <TouchableOpacity style={{ flexDirection: "row", flexWrap: "nowrap", justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            onEditProductSubmit()
          }}>
          <Text style={{ fontSize: 20, color: "white" }}>Update </Text>
          <Icon
            name='save'
            type='font-awesome'
            color={theme.TopBarTitleColor}
          />
        </TouchableOpacity>
      </IconWrapper>
    </>
  )
};

const IconWrapper = styled.View`
  /* flex: 1; */
  justify-content: center;
  /* align-items: flex-end; */
`;