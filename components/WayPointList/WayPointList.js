import React, {useContext} from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";

export default function WayPointList({mapResponse, waypoints, orders}) {
  console.log("mapResponse", mapResponse)
  // console.log("waypoints", waypoints[0])
  return (
      <>
      <Text>points</Text>
      {/* {mapResponse && mapResponse.map((item)=>{
        console.log(item) 
      })} */}
      </>
    )
};