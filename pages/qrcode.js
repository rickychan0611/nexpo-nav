
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { Platform, Image, View, Dimensions, Text } from "react-native";
import { ActivityIndicator, Colors } from 'react-native-paper';
import { Link, useRouting } from "expo-next-react-navigation";
import BottomBar from "../components/BottomBar";
import { firebase, db, functions } from "../firebaseApp";
import { ThemeContext } from "../context/ThemeContext";

export default function qrcode() {
  const { navigate } = useRouting();
  const { user, QRcodeUrl, setQRcodeUrl } = useContext(Context);
  const { theme } = useContext(ThemeContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && QRcodeUrl === "") {
      setLoading(true)
      const getQRcode = functions.httpsCallable('createQRcode')
      getQRcode({
        user
      })
        .then((data) => {
          console.log(data)
          setQRcodeUrl(data.data)
          setLoading(false)
        })
    }
  }, [user])

  return (
    <>
      <View style={{
        // flex: 1,
        width: Platform.OS === "web" ? '100vw' : '100%',
        maxWidth: 500,
        height: "100%",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        paddingBottom: 60,
        posotion: "relative",
        backgroundColor: theme.red
      }}>
        <Text style={{
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20
        }}>
          {"掃碼優惠\nScan your code"}
        </Text>

        <Text style={{
          color: "white",
          fontSize: 15,
          // fontWeight: "bold",
          textAlign: "center",
          marginBottom: 40
        }}>
          {`每10,000分可在\n天天漁港海鮮酒家作$10使用\n\n`}
          {`Every 10,000 points is worth $10 value at\n`}
          {`Tin Tin Harbar Seafood Restaurant.`}
        </Text>

        <View style={{
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          width: 220,
          height: 220
        }}>
          {loading ?
            <ActivityIndicator animating={true} color={Colors.red800} />
            :
            <Image
              style={{
                width: 220,
                height: 220,
              }}
              source={QRcodeUrl} />
          }
        </View>

        <View style={{
          backgroundColor: "white",
          width: 220,
          height: 80,
          margin: 10,
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Text>your points:</Text>
          <Text style={{
            fontSize: 20,
            fontWeight: "bold"
          }}>{user.points}</Text>

        </View>

        <View style={{
          position: "absolute",
          bottom: 80,
        }}>
        </View>
      </View>

      <BottomBar style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 10,
      }} />
    </>
  );
}
