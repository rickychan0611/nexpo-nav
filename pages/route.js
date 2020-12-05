
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { TextInput, Headline, Divider, HelperText } from 'react-native-paper';
import { Platform, ScrollView, Image, View, Text } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import WayPointList from "../components/WayPointList";
import GenRouteBtn from "../components/GenRouteBtn";
import OpenNavBtn from "../components/OpenNavBtn";
import Map from "../components/Map";
import { firebase, db, auth } from "../firebase";


function Route() {
  const { navigate } = useRouting();
  const { user, setUser, newOrderProductList } = useContext(Context)
  const [wayPointIds, setWayPointIds] = useState()
  const [err, setErr] = useState({})
  const [arr, setArr] = useState([])
  const [ordersList, setOrdersList] = useState([])
  const [waypoints, setWaypoints] = useState([])
  const [mapResponse, setMapResponse] = useState()
  const [runDirectionsService, setRunDirectionsService] = useState(false)
  const [showList, setShowList] = useState(false)

  let INPUTQTY = 20;
  const origin = "8828 Healther Street, Vancouver, BC"
  const destination = "8771 Sierpina Drive, Richmond, BC"

  const onChange = (name, value) => {

    setMapResponse()
    setWaypoints()
    console.log(name, " : ", value)
    setWayPointIds(prev => ({ ...prev, [name]: value }))

  }

  const onSubmit = () => {
    setErr({})
    //del all empty keys
    if (wayPointIds) {
      let cleanedRoutes = wayPointIds
      let k
      for (k in cleanedRoutes) {
        if (cleanedRoutes[k] === '') {
          delete cleanedRoutes[k]
          setWayPointIds(cleanedRoutes)
        }
      }
      const routesKeyNames = Object.getOwnPropertyNames(cleanedRoutes)
      if (routesKeyNames && routesKeyNames[0]) {
        console.log("getAddressByOrderIdPromise: ", routesKeyNames)

        let promises = []
        let orders = [];

        routesKeyNames.map((keyName) => {
          console.log("get keyName: ", keyName)
          let name = wayPointIds[keyName]
          let promise = db.collection("orders").where("index", "==", name).get()
            .then(snapshot => {
              if (snapshot.empty) {
                console.log('No matching documents.', keyName);
                setErr(prev => ({ ...prev, [keyName]: "ID not found. Ignored" }))
                console.log('ERrrrrrr', err);
                return;
              }
              snapshot.forEach(doc => {
                orders.push(doc.data());
              });
              return;
            })
            .catch(err => {
              console.log('Error getting documents', err);
            });

          promises.push(promise)
        })

        Promise.all(promises).then(() => {
          let addresses = []
          let idAndAddress = []
          console.log("Done: ")
          console.log(orders)

          orders.map((item) => {
            const address1 = item.shippingAddress.address1 + ", "
            const address2 = item.shippingAddress.address2 ? item.shippingAddress.address2 + ", " : ""
            const city = item.shippingAddress.city + ", "
            const province = item.shippingAddress.province + ", "
            const country = item.shippingAddress.country
            const addressStr = address1 + address2 + city + province + country
            addresses.push({ location: addressStr })
            idAndAddress.push({ location: addressStr, orderId: item.orderId })
          })

          console.log("addresses: ")
          console.log(addresses)
          setWaypoints(addresses)
          setRunDirectionsService(true)
          setOrdersList(idAndAddress)
        })
      }

      else {//no routesKeyNames
        console.log("routesKeyNames is empty")
        return
      }
    }
    else { //no route
      console.log("route is empty")
      return
    }
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

        <View style={{
          flex: 1,
          marginBottom: 300
        }}>
          <Map
            mapResponse={mapResponse}
            setMapResponse={setMapResponse}
            waypoints={waypoints}
            destination={destination}
            origin={origin}
            runDirectionsService={runDirectionsService}
            setRunDirectionsService={setRunDirectionsService}
            setShowList={setShowList}
          />
        </View>


        {showList ?

          <WayPointList
            waypoints={waypoints}
            mapResponse={mapResponse}
            ordersList={ordersList}
            origin={origin}
            destination={destination}
            setShowList={setShowList}
          />
          :
          <>
            <ScrollView
              style={{
                padding: 25
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
                style={{ padding: 10, paddingTop: 20 }}

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

              <TextInput
                style={{ padding: 10, paddingTop: 20, paddingBottom: 20 }}

                label={"Destination"}
                placeholder='Your Address / Home'
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
                        value={wayPointIds && wayPointIds["point" + index]}
                        onChangeText={value => { onChange("point" + index, value) }}
                        error={err["point" + index]}
                      />
                      <HelperText type="error" visible={err["point" + index]}>
                        {err["point" + index]}
                      </HelperText>
                    </InputView>
                  )
                })}
              </RouteContent>
              <View style={{ height: 100 }}></View>
            </ScrollView>
          </>
        }

      </ContextArea>
      {showList ?
        <OpenNavBtn
          mapResponse={mapResponse}
          origin={origin}
          destination={destination}
        /> :
        <GenRouteBtn onSubmit={onSubmit} />
      }
    </>
  );
}

export default Route


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
