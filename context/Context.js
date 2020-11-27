import React, { createContext, useState, useEffect } from "react";
import { db, auth } from "../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [deliveryMsg, setDeliveryMsg] = useState("");
  const [shippingAddress, setShippingAddress] = useState(
    {
      address1: "",
      address2: "",
      city: "",
      province: "BC",
      country: "Canada",
      postalCode: "",
      phoneNumber: ""
    });


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("logged in", user);
        db.collection("users").doc(user.email).get()
          .then((doc) => {
            setUser(doc.data());
            setShippingAddress(
              {
                address1: doc.data().address1 || "",
                address2: doc.data().address2 || "",
                city: doc.data().city || "",
                province: doc.data().province || "BC",
                country: doc.data().country || "Canada",
                postalCode: doc.data().postalCode || "",
                phoneNumber: doc.data().phoneNumnber || ""
              }
            )
          })
          .catch((err) => console.log(err))
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
    const productSnapshot = await db.collection("products")
      .where("category", "array-contains", snapshot.docs[0].data().uid).get()
    productSnapshot.forEach((doc) => {
      setProductData(prev => {
        return [...prev, doc.data()]
      })
    })
  }
  useEffect(() => {
    fetchData().catch((err) => console.log(err))
  }, [])


  const storeData = async () => {
    try {
      await AsyncStorage.setItem('newOrderProductList', JSON.stringify(newOrderProductList))
      await AsyncStorage.setItem('selectedItem', JSON.stringify(selectedItem))
      await AsyncStorage.setItem('total', (+total).toFixed(2))
    } catch (e) {
      console.log("AsyncStorage Save Error:", e)
    }
  }
  useEffect(() => {
    if (newOrderProductList[0]) {
      storeData()
    }
  }, [newOrderProductList, total])

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('newOrderProductList')
      const orders = JSON.parse(jsonValue)
      setNewOrderProductList(orders != null ? orders : [])
      let totalCounter = 0
      if (orders[0]){
        await orders.map((item)=>{
          totalCounter = totalCounter + item.price * item.quantity
        })
        setTotal(totalCounter)
      }
    } catch (e) {
      console.log("AsyncStorage Read Error:", e)
    }
  }
  useEffect(() => {
    getData()
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
          shippingAddress, setShippingAddress,
          deliveryMsg, setDeliveryMsg
        }
      }
    >
      {children}
    </Context.Provider>
  )
};
export default ContextProvider;

