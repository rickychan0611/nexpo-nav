import React, { createContext, useState, useEffect, useContext } from "react";
import { Context } from "./Context";
import { db } from "../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [timer, setTimer] = useState();

  const { setSelectedItem, selectedCat, selected,
    newOrderProductList, setSelected } = useContext(Context)

  // const [productData, setProductData] = useState([]);
  // const [categories, setCategories] = useState();

  const listenOrders = async () => {
    console.log("run listenOrders")

    db.collection("orders")
      .onSnapshot((snapshot) => {
        let tempArr = []
        snapshot.forEach((doc) => {
          tempArr.push(doc.data())
        })
        setOrders(tempArr)
      })
  }

  // const moreThan30min = (timer) => {
  //   return moment(timer).add(30, "minutes").isBefore(moment())
  // }

  // const queryProduct = () => {
  //   const setNow = moment()
  //   if (!productData[selectedCat] || moreThan30min(moment(timer)) || !timer) {
  //     listenProducts()
  //     setTimer(setNow)
  //   }
  //   else {
  //     setTimer(setNow)
  //     console.log("listenProducts not run")
  //   }
  // }

  // useEffect(() => {
  //   queryProduct()
  // }, [selectedCat])

  return (
    <AdminContext.Provider
      value={
        {
          listenOrders,
          orders, setOrders
        }
      }
    >
      {children}
    </AdminContext.Provider>
  )
};
export default AdminProvider;

