import React, { createContext, useState, useEffect } from "react";
import { db, auth } from "../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [selectedCat, setSelectedCat] = useState("555544");
  const [total, setTotal] = useState(0);
  const [newOrderProductList, setNewOrderProductList] = useState([]);
  const [selected, setSelected] = useState("home");
  const [openAdminMenu, setOpenAdminMenu] = useState(false);
  const [openWebAdminMenu, setOpenWebAdminMenu] = useState(false);
  const [title, setTitle] = useState("Add a product");
  const [images, setImages] = useState(null);
  const [swiperControl, setSwiperControl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(["Others"]);
  const [product, setProduct] = useState(productInitValue);
  const [error, setError] = useState({});
  const [counter, setCounter] = useState(0);
  const [redeemPoint, setRedeemPoint] = useState("");
  const [deliveryMsg, setDeliveryMsg] = useState("");
  const [newOrderId, setNewOrderId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState();
  const [orders, setOrders] = useState([]);
  const [addressBook, setAddressBook] = useState();
  const [onEdit, setOnEdit] = useState(false);
  const [onAddNew, setOnAddNew] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [initLoaded, setInitLoaded] = useState(false);
  const [checked, setChecked] = useState('credit');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(initLoaded)
      
      if (user) {
        console.log("logged in", user.email);
        db.collection("users").doc(user.email).onSnapshot((doc) => {
          setUser(doc.data());

          //convert addressBook to array
          if (doc.data().addressBook) {
            let addressBook = doc.data().addressBook
            let tempArr = []
            console.log(Object.keys(addressBook).length)

            let sortedKey = Object.keys(addressBook) && Object.keys(addressBook)[0] &&
              Object.keys(addressBook).sort((a , b) => b -a)

              sortedKey && sortedKey.map((key) => {
                tempArr.push(addressBook[key])
              })
            setAddressBook(tempArr)
          }
        })
        setInitLoaded(true)
        console.log(initLoaded)
      }

      else {
        setInitLoaded(true)
        console.log("Not logged in")
      }
    })
  }, [])

  //save newOrderProductList to AsyncStorage when it is updated
  const storeData = async () => {
    if (newOrderProductList && selectedItem && total) {
      try {
        await AsyncStorage.setItem('newOrderProductList', JSON.stringify(newOrderProductList))
        await AsyncStorage.setItem('selectedItem', JSON.stringify(selectedItem))
        await AsyncStorage.setItem('total', (+total).toFixed(2))
      } catch (e) {
        console.log("AsyncStorage Save Error:", e)
      }
    }
  }
  useEffect(() => {
    if (newOrderProductList[0]) {
      storeData()
    }
  }, [newOrderProductList, total])

  //init get newOrderProductList from AsyncStorage on reload
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('newOrderProductList')
      const orders = JSON.parse(jsonValue)
      setNewOrderProductList(orders != null ? orders : [])
      let totalCounter = 0
      if (orders[0]) {
        await orders.map((item) => {
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
          title, setTitle,
          images, setImages,
          swiperControl, setSwiperControl,
          selectedCategory, setSelectedCategory,
          product, setProduct,
          productInitValue,
          error, setError,
          counter, setCounter,
          redeemPoint, setRedeemPoint,
          deliveryMsg, setDeliveryMsg,
          newOrderId, setNewOrderId,
          selectedOrder, setSelectedOrder,
          orders, setOrders,
          addressBook, setAddressBook,
          onEdit, setOnEdit,
          onAddNew, setOnAddNew,
          editAddress, setEditAddress,
          initLoaded, setInitLoaded,
          checked, setChecked
       }
      }
    >
      {children}
    </Context.Provider>
  )
};
export default ContextProvider;

