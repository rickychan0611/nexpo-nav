import React, { createContext, useState, useEffect, useContext } from "react";
import { Context } from "./Context";
import { db } from "../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";

export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const { setSelectedItem, selectedCat, selected,
    newOrderProductList, setSelected } = useContext(Context)

  const [productData, setProductData] = useState([]);
  const [categories, setCategories] = useState();
  const [timer, setTimer] = useState();

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

  const moreThan30min = (timer) => {
    return moment(timer).add(30, "minutes").isBefore(moment())
  }

  const queryProduct = () => {
    const setNow = moment()
    if (!productData[selectedCat] || moreThan30min(moment(timer)) || !timer) {
      listenProducts()
      setTimer(setNow)
    }
    else {
      setTimer(setNow)
      console.log("listenProducts not run")
    }
  }
  
  useEffect(() => {
    queryProduct()
  }, [selectedCat])

  return (
    <ProductsContext.Provider
      value={
        {
          listenCategories,
          queryProduct,
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
