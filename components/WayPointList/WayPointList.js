import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { Headline, Button } from 'react-native-paper';

import styled from "styled-components/native";

export default function WayPointList({
  mapResponse,
  waypoints,
  ordersList,
  origin,
  destination,
  setShowList
}) {

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

  const ID = ({ address, index }) => {
    let order = ordersList.filter((item) => {
      return address === item.location
    })
    return <Text>{convertChar(index) + ": ID #" + order[0].orderId}</Text>
  }

  return (
    <View style={{
      position: "absolute",
      top: 300,
    }}>

      <ScrollView
        style={{
          padding: 25,
          width: "100vw",
          maxWidth: 900,
        }}>
        <Headline
          style={{
            // paddingHorizontal: 25,
            fontWeight: "bold",
          }}
        >
          Your Optimized Route</Headline>
        <Button
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            // marginBottom: 20
          }}
          icon="arrow-left"
          onPress={() => { setShowList(false) }}>
          Go Back
          </Button>
        <View style={{ marginVertical: 8 }}>
          <Text>{"A: Starting point"}</Text>
          <Text style={{ paddingLeft: 16 }}>My current position</Text>
        </View>
        {mapResponse && mapResponse.request.waypoints.map((item, index) => {
          return (
            <View key={index} style={{ marginVertical: 8 }}>
              <ID address={item.location.query} index={index} />
              <Text style={{ paddingLeft: 16 }}>{item.location.query}</Text>
            </View>
          )
        })}
        <View style={{ marginVertical: 8 }}>
          <Text>{mapResponse && convertChar(mapResponse.request.waypoints.length) + ": Destination"}</Text>
          <Text style={{ paddingLeft: 16 }}>{destination}</Text>
        </View>
      </ScrollView>
    </View>

  )
};