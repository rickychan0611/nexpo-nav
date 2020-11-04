import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [data, setData] = useState();
  const [user, setUser] = useState("Hello Ricky");
  const [selectedItem, setSelectedItem] = useState();
  const [selectedCat, setSelectedCat] = useState("0");

  return (
    <Context.Provider
      value={
        {
          user, setUser,
          data, setData,
          selectedCat, setSelectedCat,
          selectedItem, setSelectedItem
        }
      }
    >
      {children}
    </Context.Provider>
  )
};
export default ContextProvider;

