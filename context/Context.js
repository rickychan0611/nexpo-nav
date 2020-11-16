import React, { createContext, useState, useEffect } from "react";
// import {firebase, db, auth} from "../firebase";

export const Context = createContext();

const productInitValue = {
  uid: "",
  createAt: "",
  chineseName: "",
  englishName: "",
  original_price: "",
  final_price: "0",
  discount_amt: "0",
  discount_precent: "0",
  qty: "",
  unit: "",
  ch_description: "",
  en_description: "",
  category: [],
  featured: false,
  activated: true
}

const ContextProvider = ({ children }) => {
  const [data, setData] = useState();
  const [user, setUser] = useState("");
  const [selectedItem, setSelectedItem] = useState();
  const [selectedCat, setSelectedCat] = useState("0");
  const [total, setTotal] = useState(0);
  const [newOrderProductList, setNewOrderProductList] = useState([]);
  const [selected, setSelected] = useState("home");
  const [openAdminMenu, setOpenAdminMenu] = useState(false);
  const [openWebAdminMenu, setOpenWebAdminMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("Add a product");
  const [images, setImages] = useState(null);
  const [swiperControl, setSwiperControl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(["other"]);
  const [product, setProduct] = useState(productInitValue);
  const [error, setError] = useState({});

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       console.log("logged in", user);
  //       setUser(user);
  //     }
  //     else console.log("Not logged in")
  //   })
  // }, [])

  return (
    <Context.Provider
      value={
        {
          user, setUser,
          data, setData,
          total, setTotal,
          selectedCat, setSelectedCat,
          selectedItem, setSelectedItem,
          newOrderProductList, setNewOrderProductList,
          selected, setSelected,
          openAdminMenu, setOpenAdminMenu,
          openWebAdminMenu, setOpenWebAdminMenu,
          categories, setCategories,
          title, setTitle,
          images, setImages,
          swiperControl, setSwiperControl,
          selectedCategory, setSelectedCategory,
          product, setProduct,
          productInitValue,
          error, setError        }
      }
    >
      {children}
    </Context.Provider>
  )
};
export default ContextProvider;

