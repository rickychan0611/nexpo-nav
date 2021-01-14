
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { Platform, ScrollView, View, Text } from "react-native";
import { ActivityIndicator, Colors, Portal, Dialog, Paragraph, Button } from 'react-native-paper';
import { Link, useRouting } from "expo-next-react-navigation";
import BottomBar from "../components/BottomBar";
import { firebase, db, functions } from "../firebaseApp";
import { ThemeContext } from "../context/ThemeContext";
// const QRCode = require('qrcode')
import QRCode from 'react-native-qrcode-svg';

export default function qrcode() {
  const { navigate } = useRouting();
  const { user, QRcodeUrl, setQRcodeUrl } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const hideModal = () => setShowModal(false)

  useEffect(() => {
    if (user.openRedeemDialog) {
      setShowModal(true)
    }
  }, [user])

  return (
    <>
      <Portal>
        <Dialog visible={showModal} onDismiss={hideModal}>
          <Dialog.Title>Congratulations</Dialog.Title>
          <Dialog.Content>
            <Paragraph>You have redemed {user.redeemedPoints} points! </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              contained
              color="white"
              style={{
                backgroundColor: theme.red,
                borderWidth: 1,
                borderRadius: 25,
                width: 80,
                marginBottom: 10
              }}
              onPress={() => {
                db.collection('users').doc(user.email).update({ openRedeemDialog: false })
                hideModal()
              }}>
              OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ScrollView style={{
        width: Platform.OS === "web" ? '100vw' : '100%',
        height: Platform.OS === "web" ? '100vh' : '100%',
        maxWidth: 900,
        backgroundColor: theme.red,
        paddingTop: 60,
        paddingBottom: 120,
      }}>
        <View style={{
          // flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: "center",
          // posotion: "relative",
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

              <QRCode
                value={user.email}
                size={150} />
              // <Image
              //   style={{
              //     width: 220,
              //     height: 220,
              //   }}
              //   source={QRcodeUrl} />
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
      </ScrollView>
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
