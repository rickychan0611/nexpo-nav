import React, { createContext, useState, useEffect, useContext } from "react";
import { Context } from "./Context";
import { db } from "../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const { setSelectedItem, selectedCat, selected,
    newOrderProductList, setSelected } = useContext(Context)

  const [productData, setProductData] = useState([]);
  const [categories, setCategories] = useState();


  const listenCategories = () => {
    if (!categories) {
      console.log("run listenCategories")
      db.collection("categories")
        .onSnapshot((snapshot) => {
          let tempArr = []
          snapshot.forEach((doc) => {
            tempArr.push(doc.data())
          })
          setCategories(tempArr)
        })
    }
    else console.log("listenCategories not run")
  }

  const listenProducts = async () => {
    console.log("run listenProducts")

    db.collection("products").where("category", "array-contains", selectedCat)
      .onSnapshot((snapshot) => {
        let tempArr = []
        snapshot.forEach((doc) => {
          tempArr.push(doc.data())
        })
        setProductData(prev => ({ ...prev, [selectedCat]: tempArr }))
      })
  }

  useEffect(() => {
    if (!productData[selectedCat]) {
      listenProducts()
    }
    else console.log("listenProducts not run")
  }, [selectedCat])

  return (
    <ProductsContext.Provider
      value={
        {
          listenCategories,
          listenProducts,
          productData, setProductData,
          categories, setCategories,
        }
      }
    >
      {children}
    </ProductsContext.Provider>
  )
};
export default ProductsProvider;

