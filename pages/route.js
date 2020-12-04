
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { TextInput, Headline, Divider, HelperText } from 'react-native-paper';
import { Platform, ScrollView, Image, View, Text } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import BottomBar from "../components/BottomBar";
import GenRouteBtn from "../components/GenRouteBtn";
import { firebase, db, auth } from "../firebase";
import * as WebBrowser from 'expo-web-browser';
// import * as Facebook from 'expo-auth-session/providers/facebook';
// import { ResponseType } from 'expo-auth-session';
import * as Facebook from 'expo-facebook';
import banner1 from "../public/banner1.jpg"
import { push } from "react-native-elevation";
import { isArrayBindingPattern } from "typescript";

// WebBrowser.maybeCompleteAuthSession();



export default function Home() {
  const { navigate } = useRouting();
  const { user, setUser, newOrderProductList } = useContext(Context);
  const [routes, setRoutes] = useState({})
  const [err, setErr] = useState('')
  const [arr, setArr] = useState([])
  const [orders, setOrders] = useState([])
  const [mapUrl, setMapUrl] = useState("")

  let INPUTQTY = 20;
  const URL = "https://www.google.com/maps/dir/"
  const origin = "8828 Healther Street, Vancouver, BC"
  let addresses = [];


  const onChange = (name, value) => {
    console.log(name, " : ", value)
    setRoutes(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = (name, value) => {
    const routesNames = Object.getOwnPropertyNames(routes)
    console.log(routesNames)
    let counter = 0;
    let tempArr = [];
    const query = new Promise((resolve, reject) => {
      for (let i = 0; i < routesNames.length; i++) {
        // console.log(routes[routesNames[i]])
        counter = counter + 1;
        if (routes[routesNames[i]]) {
          db.collection("orders").where("index", "==", routes[routesNames[i]]).get()
          .then((snapshot)=>{
            snapshot.forEach((doc)=>{
              console.log(doc.data())
              tempArr.push(doc.data())
            })
            console.log(counter)
            console.log(routesNames.length)

            if (counter === routesNames.length) {
              console.log(tempArr)
              setOrders(tempArr)
              resolve();
            }
            // else reject("Uable to get data. Please try again");
          })
          .catch(err=>{
            reject(err)
          })
        }
      }
    })
    query.then(async () => {
      let addressStr = ""
      await orders.map((item) => {
        addressStr = addressStr + item.shippingAddress.address1
      })
      console.log(
        URL + origin + addressStr
      )
    })
    query.catch(err => console.log(err))
  }

  useEffect(() => {
    setArr([]);
    for (let i = 1; i <= INPUTQTY; i++) {
      setArr(prev => [...prev, i])
    }
  }, [])

  return (
    <>
      <ContextArea>
        <ScrollView style={{
          padding: 25,
        }}>
          <Headline
            style={{
              // paddingHorizontal: 25,
              fontWeight: "bold",
            }}
          >
            Route Generator</Headline>
          <Text style={{
            paddingTop: 25,
            paddingBottom: 25,
          }}>Please enter the last digits after "A" of the order number. (Max. 20 locations)</Text>

          <Divider />

          <TextInput
            style={{ padding: 10, paddingTop: 20, paddingBottom: 20 }}

            label={"Starting Location"}
            placeholder='Address'
            theme={{ colors: { primary: "grey" } }}
            mode="outlined"
            dense
            value={"8828 Healther Street. Vancouver, BC"}
            onChangeText={value => { onChange("point" + index, value) }}
          // error={err.chineseName}
          />
          {/* <HelperText type="error" visible={error.chineseName}>
            {err.chineseName}
          </HelperText> */}

          <Divider />

          <RouteContent>
            {arr[0] && arr.map((item, index) => {
              return (
                <InputView>
                  <TextInput
                    label={"Way Point #" + (index + 1)}
                    placeholder={'#' + (index + 1)}
                    theme={{ colors: { primary: "grey" } }}
                    mode="outlined"
                    dense
                    value={routes["point" + index]}
                    onChangeText={value => { onChange("point" + index, value) }}
                  // error={err.chineseName}
                  />
                  {/* <HelperText type="error" visible={error.chineseName}>
                      {err.chineseName}
                    </HelperText> */}
                </InputView>
              )
            })}
          </RouteContent>
          <View style={{ height: 100 }}></View>

        </ScrollView>
      </ContextArea>
      <GenRouteBtn onSubmit={onSubmit} />
    </>
  );
}


const RouteContent = styled.View`
  margin-top: 20;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;

const Price = styled.View`
  flex: 2;
  justify-content: center;
  align-items: flex-end;
`;
const Title = styled.Text`
  font-size: 18px;
  width: 100%;
  padding: 15px;
  background-color: white;   
`;
const ContextArea = styled.View`
  /* flex: 1; */
  width: ${Platform.OS === "web" ? `100vw` : `100%`};
  height: ${Platform.OS === "web" ? `calc(100vh) ` : `100%`};
  max-width: 500px;
  background-color: white;
  /* padding-bottom: ${Platform.OS === "web" ? `35px` : `95px`}; */
`;

const InputView = styled.View`
  /* flex: 1; */
  margin-bottom: ${Platform.OS === "web" ? "15px" : 0};
  width: 100%;
  max-width: 140px;
  margin-left: auto;
  margin-right: auto;
`;

const Row = styled.View`
 flex-direction: row;
 flex-wrap: nowrap;
 justify-content: space-between;
`;
