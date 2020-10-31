import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  return (
    <Context.Provider
      value={
        {
          user, setUser
        }
      }
    >
      {children}
    </Context.Provider>
  )

};
export default ContextProvider;
