import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import Loader from "../../components/Loader";

export default function Map({
  mapResponse, setMapResponse,
  runDirectionsService, setRunDirectionsService,
  waypoints, destination, origin, setShowList }) {

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB4_luRYtuvAHZazQhruQc3nJpuoffUG3s" // ,
    // ...otherOptions
  })

  function directionsCallback(response) {
    if (response !== null) {
      if (response.status === 'OK') {
        console.log(response)
        setMapResponse(response)
        setShowList(true)
      } else {
        console.log('directionsCallback err: ', response)
      }
    }
  }

  const renderMap = () => {
    // wrapping to a function is useful in case you want to access `window.google`
    // to eg. setup options or create latLng object, it won't be available otherwise
    // feel free to render directly if you don't need that
    // const onLoad = React.useCallback(
    //   function onLoad(mapInstance) {
    //     // do something with map Instance
    //   }
    // )
    return (
      <>
        <GoogleMap
          mapContainerStyle={{
            position: "absolute",
            width: '100%',
            height: '300px'
          }}
          center={{ lat: 49.205960, lng: -123.122550 }}
          zoom={11}
        // onLoad={onLoad}
        >
          { /* Child components, such as markers, info windows, etc. */}
          <>
            {runDirectionsService && waypoints && waypoints[0] &&
              <DirectionsService
                // required
                options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                  destination,
                  origin,
                  waypoints,
                  travelMode: "DRIVING",
                  optimizeWaypoints: true,
                  provideRouteAlternatives: true,
                }}
                // required
                callback={directionsCallback}
                // optional
                onLoad={directionsService => {
                  setRunDirectionsService(false)
                  // console.log('DirectionsService onLoad directionsService: ', directionsService)
                }}
              // // optional
              // onUnmount={directionsService => {
              //   console.log('DirectionsService onUnmount directionsService: ', directionsService)
              // }}
              />
            }

            {!runDirectionsService && mapResponse && mapResponse.routes[0] &&
              <DirectionsRenderer
                // required
                options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                  directions: mapResponse
                }}
              // optional
              // onLoad={directionsRenderer => {
              //   console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
              // }}
              // // optional
              // onUnmount={directionsRenderer => {
              //   console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
              // }}
              />}

          </>
        </GoogleMap>
      </>
    )
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : <Loader />
};