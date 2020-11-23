import React, { createContext, useState, useEffect } from "react";
import { db, auth } from "../firebase";

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
  const [productData, setProductData] = useState([]);
  const [user, setUser] = useState("");
  const [selectedItem, setSelectedItem] = useState();
  const [selectedCat, setSelectedCat] = useState("");
  const [total, setTotal] = useState(0);
  const [newOrderProductList, setNewOrderProductList] = useState([]);
  const [selected, setSelected] = useState("home");
  const [openAdminMenu, setOpenAdminMenu] = useState(false);
  const [openWebAdminMenu, setOpenWebAdminMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("Add a product");
  const [images, setImages] = useState(null);
  const [swiperControl, setSwiperControl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(["Others"]);
  const [product, setProduct] = useState(productInitValue);
  const [error, setError] = useState({});
  const [counter, setCounter] = useState(0);
  const [redeemPoint, setRedeemPoint] = useState("");
  const [shippingAddress, setShippingAddress] = useState(
    {
      address1 : "",
      address2 : "",
      city : "",
      province : "BC",
      country: "Canada",
      postalCode: "",
      phoneNumber: ""
    });


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("logged in", user);
        db.collection("users").doc(user.email).get()
        .then((doc)=>{
          setUser(doc.data());
        })
        .catch((err)=>console.log(err))
      }
      else console.log("Not logged in")
    })
  }, [])

  const fetchData = async () => {

    const snapshot = await db.collection("categories").get()
    
    snapshot.forEach((doc) => {
      setCategories(prev => {
        return [...prev, doc.data()]
      })
    })

    const productSnapshot = await db.collection("products").where("category", "array-contains", snapshot.docs[0].data().uid).get()

    productSnapshot.forEach((doc) => {
      setProductData(prev => {
        return [...prev, doc.data()]
      })
    })

  }

  useEffect(() => {
    fetchData()
    .catch((err) => console.log(err))
  }, [])

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
          error, setError,
          productData, setProductData,
          counter, setCounter,
          redeemPoint, setRedeemPoint,
          shippingAddress, setShippingAddress
        }
      }
    >
      {children}
    </Context.Provider>
  )
};
export default ContextProvider;

