import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [data, setData] = useState();
  const [user, setUser] = useState("Hello Ricky");
  const [selectedItem, setSelectedItem] = useState();
  const [selectedCat, setSelectedCat] = useState("0");
  const [total, setTotal] = useState("0");
  const [newOrderProductList, setNewOrderProductList] = useState([]);

  return (
    <Context.Provider
      value={
        {
          user, setUser,
          data, setData,
          total, setTotal,
          selectedCat, setSelectedCat,
          selectedItem, setSelectedItem,
          newOrderProductList, setNewOrderProductList
        }
      }
    >
      {children}
    </Context.Provider>
  )
};
export default ContextProvider;

