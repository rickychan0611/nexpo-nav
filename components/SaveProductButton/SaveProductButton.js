import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Context } from "../../context/Context";
import { View, Text, Platform, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Icon } from 'react-native-elements'
import { Link, useRouting } from "expo-next-react-navigation";
import { db } from "../../firebase";
import * as firebase from 'firebase/app';

export default function SaveProductButton() {
  const { theme } = useContext(ThemeContext);
  const { setError, product, selectedCategory, images } = useContext(Context);
  const { navigate } = useRouting();

  const onCreateProductSubmit = () => {

    const productRef = db.collection("products").doc()
    const timestamp = new Date()

    console.log("Clicked")
    setError({})

    product.category = selectedCategory
    console.log(product)

    let validate = new Promise((resolve, reject) => {

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
        console.log("here?")
        console.log(selectedCategory)
        setError(prev => ({ ...prev, category_err: "Error: Please select at least one category or create a new one." }))
        reject("No category selected")
      }
      else resolve(true)
    })

    validate.then(() => {
      //Creat a new product on the server
      productRef.set({
        ...product,
        uid: productRef.id,
        createAt: timestamp,
        images: images && images
      })
        .then(() => {
          //Update productID in categories collection
          selectedCategory && selectedCategory[0] &&
            selectedCategory.forEach((category) => {
              db.collection("categories").doc(category).update({
                productId: firebase.firestore.FieldValue.arrayUnion(productRef.id)
              })
                .then(() => {
                  console.log(category, " added")
                  //////reset everything after sumbitting to server
                  // setProduct(productInitValue)
                  // setSelectedCategory([])
                  // navigate({
                  //   routeName: "home"
                  // })
                })
                .catch((err) => console.log(category, " NOT added. Err: ", err))
            })
        })
        .catch(error => console.log(error))
    })
      .catch(err => console.log("error:", err))
  }

  return (
    <>
      {/* save button */}
      <IconWrapper>
        <TouchableOpacity style={{ flexDirection: "row", flexWrap: "nowrap", justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            onCreateProductSubmit()
          }}>
          <Text style={{ fontSize: 20, color: "white" }}>Save </Text>
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