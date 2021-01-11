import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, View, StyleSheet, Button, Animated, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import scanner from "../../../assets/scanner.png";
import { IconButton } from "react-native-paper";
import { useRouting } from "expo-next-react-navigation";
import Loader from "../../../components/Loader"
import { db } from "../../../firebaseApp"
import { Context } from '../../../context/Context';

const { width } = Dimensions.get('window')

const styles = {
  container: {
    flex: 1,
    alignItems: 'center'
  },
  description: {
    fontSize: width * 0.05,
    textAlign: 'center',
    width: '100%',
    color: 'white',
    marginTop: 10
  }
}

export default function QrScanning() {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [loading, setLoading] = useState(false)
  const { navigate } = useRouting()

  const { redeemPoints } = useContext(Context)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setTimeout(() => {
        setHasPermission(status === 'granted');
      }, 1)
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      setScanned(true);
      setLoading(true)
      const customer = await db.collection('users').doc(data).get()
        .then((snapshot) => {
          if (snapshot.exists) {
            console.log(snapshot.data())
            return snapshot.data()
          }
          else {
            setLoading(false)
            throw ("User cannot be found")
          }
        })
        .catch((err) => {
          setLoading(false)
          throw (err)
        })

      console.log(customer)
      let newPoints

      if (redeemPoints > customer.points) {
        navigate({ routeName: "redeem-points" })
        throw (`Not enough points. Customer only have ${customer.points} points.`)
      }
      else {
        newPoints = customer.points - redeemPoints
        await db.collection('users').doc(data).update({
          points: newPoints,
          redeemedPoints: redeemPoints,
          openRedeemDialog: true
        }).then(() => {
          alert(`Success! Customer (${customer.firstName}), has redeemed ${redeemPoints} points`)
          navigate({ routeName: "redeem-points" })
        })
      }
    }
    catch (e) {
      setLoading(false)
      console.log(e)
      alert(e)
    }
    // alert(customer)
    // navigate()
  };

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const imageAnimatedValue = useRef(new Animated.Value(0)).current;
  const { height } = Dimensions.get('window')

  const moveImage = () => {
    Animated.loop(Animated.timing(imageAnimatedValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    })).start();
  };

  const yVal = imageAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [20, height - 180],
  });

  const fade = imageAnimatedValue.interpolate({
    inputRange: [0, 0.2, 0.8, 1],
    outputRange: [0, 1, 1, 0]
  });

  const animStyle = {
    opacity: fade,
    transform: [
      {
        translateY: yVal,
      },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      moveImage();
    }, 1000)
  }, []);


  return (
    <>
      {/* {loading && <Loader />} */}
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          backgroundColor: "black",
          height: "100%"
        }}>
        <Text>Getting user's data</Text>
        {!scanned && <BarCodeScanner
          // scanned = undefined is used to stop from running handleBarCodeScanned
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[StyleSheet.absoluteFill, { flex: 1, alignItems: 'center' }]}>
          <View style={[StyleSheet.absoluteFill]}>
            <IconButton icon="chevron-left" color="white"
              style={{ position: "absolute" }}
              onPress={() => {
                navigate({ routeName: "redeem-points" })
              }}
            />
            <View style={{
              flexDirection: 'row',
              flexWwrap: 'nowrap',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Text style={styles.description}>
                Scan QR Code </Text>
            </View>
          </View>
          <Animated.Image
            source={scanner}
            style={animStyle}
          />
        </BarCodeScanner>
        }
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View></>
  );
}
