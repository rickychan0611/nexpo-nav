
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { TextInput, Headline, Divider, HelperText } from 'react-native-paper';
import { Platform, ScrollView, Image, View, Text } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import WayPointList from "../components/WayPointList";
import GenRouteBtn from "../components/GenRouteBtn";
import OpenNavBtn from "../components/OpenNavBtn";
import Loader from "../components/Loader";
import { Marker } from '@react-google-maps/api';
import Map from "../components/Map";
import { db} from "../firebase";

function Route() {
  const { navigate } = useRouting();
  const [wayPointIds, setWayPointIds] = useState()
  const [err, setErr] = useState({})
  const [arr, setArr] = useState([])
  const [ordersList, setOrdersList] = useState([])
  const [waypoints, setWaypoints] = useState([])
  const [mapResponse, setMapResponse] = useState()
  const [runDirectionsService, setRunDirectionsService] = useState(false)
  const [showList, setShowList] = useState(false)
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [loading, setLoading] = useState(false)

  let INPUTQTY = 22;
  // const origin = "8828 Healther Street, Vancouver, BC"
  // const destination = "8771 Sierpina Drive, Richmond, BC"

  const onChange = (name, value) => {
    setMapResponse()
    setWaypoints()
    console.log(name, " : ", value)
    if (name === "destination") {
      setDestination(value)
    }
    else setWayPointIds(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = () => {
    setLoading(true)
    setErr({})
    //del all empty keys
    if (!destination) {
      setErr({ destination: "Required. Please enter your end point"})
      setLoading(false)
      return
    }

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
                setErr(prev => ({ ...prev, [keyName]: "ID not found"}))
                throw("ID not found")
              }
              snapshot.forEach(doc => {
                orders.push(doc.data());
              });
              return;
            })
            .catch(err => {
              console.log('Error getting documents', err);
              throw(err)
            });

          promises.push(promise)
        })

        Promise.all(promises)
        .then(() => {
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
      .catch((err)=>{
        setLoading(false)
        console.log(err)})
      }

      else {//no routesKeyNames
        console.log("routesKeyNames is empty")
        setLoading(false)
        return
      }
    }
    else { //no route
      console.log("route is empty")
      setErr({point0 : "Please enter an ID"})
      setLoading(false)
      return
    }
  }

  useEffect(() => {
    setArr([]);
    for (let i = 1; i <= INPUTQTY; i++) {
      setArr(prev => [...prev, i])
    }
  }, [])

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setOrigin({ lat: position.coords.latitude, lng: position.coords.longitude })
      })
    } else {
      console.log("Not Available");
    }
  }, [])

  return (
    <>
        {loading && <Loader/>}

      <ContextArea>
        <ScrollView>
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
              setLoading={setLoading}
            >
              <Marker
                // onLoad={onLoad}
                position={origin}
                title="Your position"
                visible={!mapResponse}
              />
            </Map>
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
              <View
                style={{
                  padding: 25
                }}>
                <Headline
                  style={{
                    // paddingHorizontal: 25,
                    fontWeight: "bold",
                  }}
                >
                  Delivery Route Generator</Headline>
                <Text style={{
                  paddingTop: 15,
                }}>- Route starts at your currect position. (Please allow access to device's location.)</Text>
                <Text style={{
                  paddingTop: 10,
                }}>- End point is where you want to go after delivery.</Text>
                <Text style={{
                  paddingTop: 10,
                  paddingBottom: 25,
                }}>- For each waypoint, please enter the last digits after "A" of the order number. (Max. 22 locations)</Text>

                <Divider />

                <TextInput
                  style={{ padding: 5, paddingTop: 20, paddingBottom: 20 }}

                  label={"End Point"}
                  placeholder="Name of the place, address or postal code"
                  theme={{ colors: { primary: "grey" } }}
                  mode="outlined"
                  dense
                  value={destination}
                  onChangeText={value => { onChange("destination", value) }}
                  error={err.destination}
                />
                <HelperText type="error" visible={err.destination}>
                  {err.destination}
                </HelperText>

                <Divider />

                <RouteContent>
                  {arr[0] && arr.map((item, index) => {
                    return (
                      <InputView>
                        <TextInput
                          label={"Way Point #" + (index + 1)}
                          placeholder={'Order ID'}
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
              </View>
            </>
          }
        </ScrollView>

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
