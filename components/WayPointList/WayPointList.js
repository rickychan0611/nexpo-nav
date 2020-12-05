import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import styled from "styled-components/native";

export default function WayPointList({
  mapResponse,
  waypoints,
  ordersList,
  origin,
  destination,
  setShowList
}) {
  console.log("mapResponse", mapResponse)
  console.log("waypoints", waypoints)

  const convertChar = (index) => {
    if (index >= 0 && index <= 9) {
      return String.fromCharCode(("" + index).charCodeAt(0) + 18)
    }
    else if (index >= 10 && index <= 19) {
      return String.fromCharCode(("" + index).charCodeAt(1) + 27)
    }
    else if (index >= 20 && index <= 26) {
      return String.fromCharCode(("" + index).charCodeAt(1) + 44)
    }
  }

  const getOrderId = (address) => {
    let id;
    console.log(address)
    console.log(ordersList)
    id = ordersList.map((item) => {
      if (address === item.location) {
        console.log(item.orderId)
        return item.orderId
      }
    })
    return id
  }

  return (
    <View style={{
      position: "absolute",
      top: 300
      // justifyContent: "flex-start",
      // alignItems: "flex-start"
    }}>
      
      <ScrollView
            style={{
              padding: 25
            }}>
      <View style={{ marginVertical: 5 }}>
        <Text>{"A: Starting point"}</Text>
        <Text>{origin}</Text>
      </View>
      {mapResponse && mapResponse.request.waypoints.map((item, index) => {
        return (
          <View style={{ marginVertical: 5 }}>
            <Text>{convertChar(index) + ":  ID #" + getOrderId(item.location.query)}</Text>
            <Text>{item.location.query}</Text>
          </View>
        )
      })}
      <View style={{ marginVertical: 5 }}>
        <Text>{mapResponse && convertChar(mapResponse.request.waypoints.length) + ": Destination"}</Text>
        <Text>{destination}</Text>
      </View>
      </ScrollView>
    </View>

  )
};