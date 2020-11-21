import React, { createContext, useState, useEffect } from "react";
// import {firebase, db, auth} from "../firebase";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {

  const red = "#ff5c5c"
  const lightGrey = "#f0f0f0"
  const darkGrey = "#636363"
  const lightYellow = "#fffff2"
  const green = "#689c49"
  const black = "#2b2b2b"

  const theme = {
    TopBarBackgroundColor: red,
    TopBarTitleColor: "white",

    backgroundColor: "white",
    
    InputBoxBackgroundColor: lightYellow,

    titleColor:darkGrey,

    red, lightGrey, darkGrey, lightYellow, green, black

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

