import React, { createContext, useState, useContext } from "react";
import { Context } from "./Context";
import { db } from "../firebaseApp";

export const AccountContext = createContext();

const AccountProvider = ({ children }) => {
  const { user } = useContext(Context)
  const [ orders, setOrders ] = useState([]);

  let ordersRef;
  const listenMyOrders = () => {
      if (user) {
        ordersRef = db.collection("orders").where("userId", "==", user.email).onSnapshot((snapshot) => {
          let tempArr = []
          snapshot.forEach((doc) => {
            tempArr.push(doc.data())
          })
          tempArr.sort((a, b) => {
            return b.createAt.toDate() - a.createAt.toDate()
          })
          setOrders(tempArr)
        })
      }
    }

  const unlistenMyOrders = () => ordersRef()

  return (
    <AccountContext.Provider
      value={
        {
          listenMyOrders, unlistenMyOrders,
          orders, setOrders
        }
      }
    >
      {children}
    </AccountContext.Provider>
  )
};
export default AccountProvider;

