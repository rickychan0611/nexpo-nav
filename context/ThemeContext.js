import React, { createContext, useState, useEffect } from "react";
// import {firebase, db, auth} from "../firebase";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const theme = {
    TopBarBackgroundColor: "white",
    TopBarTitleColor: "#ff5c5c",

    backgroundColor: "#f0f0f0",
    
    InputBoxBackgroundColor: "#fffff2", //light yellow

    titleColor: "#636363",
    red: "#ff5c5c",
  }

  return (
    <ThemeContext.Provider
      value={
        {
          theme
        }
      }
    >
      {children}
    </ThemeContext.Provider>
  )
};
export default ThemeProvider;

