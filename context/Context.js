import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState("Hello Ricky");
  const [selectedItem, setSelectedItem] = useState({});

  return (
    <Context.Provider
      value={
        {
          user, setUser,
          selectedItem, setSelectedItem
        }
      }
    >
      {children}
    </Context.Provider>
  )
};
export default ContextProvider;

