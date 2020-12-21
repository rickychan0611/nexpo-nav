import React, { createContext, useState, useEffect, useContext } from "react";
import { Context } from "./Context";
import { db } from "../firebaseApp";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState();
  const [orderDate, setOrderDate] = useState(new Date());

  const listenOrders = async () => {
    db.collection("orders")
    .where("createAt", ">", moment(orderDate).startOf('day').toDate())
    .where("createAt", "<", moment(orderDate).endOf('day').toDate())
      .onSnapshot((snapshot) => {
        let tempArr = []
        snapshot.forEach((doc) => {
          tempArr.push(doc.data())
        })
        tempArr.sort((a,b)=>{
          return b.orderId - a.orderId
        })
        if (tempArr[0]){
        setOrders(tempArr)
      }
      else setOrders([])
      })
  }

  useEffect(()=>{
    setOrderDate(prev=>prev)
    listenOrders()
  },[orderDate])

  return (
    <AdminContext.Provider
      value={
        {
          listenOrders,
          orders, setOrders,
          selectedOrder, setSelectedOrder,
          orderDate, setOrderDate
        }
      }
    >
      {children}
    </AdminContext.Provider>
  )
};
export default AdminProvider;

