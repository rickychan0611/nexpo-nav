import React, {useContext, useEffect, useState} from "react";
import { Modal, Portal, ActivityIndicator } from 'react-native-paper';
import { Context } from "../../context/Context";
import { useRouting } from "expo-next-react-navigation";

export default function InitLoader() {
  const { navigate } = useRouting();
  const [visible, setVisible] = useState(true)
  const { initLoaded, setInitLoading, user } = useContext(Context)

  const containerStyle = {
    padding: 20,
    width: "100%",
    height: "100%"
  };

  useEffect(() => {
    console.log(initLoaded)
    if (initLoaded ) {
      if (!user && !visible) {
        console.log("init jumb")
        navigate({ routeName: "home" })
      }
      else setVisible(false)
    }
  }, [initLoaded, user])

  return (
      <>
      <Portal>
        <Modal visible={visible}  contentContainerStyle={containerStyle}>
        <ActivityIndicator size="large" color="white"/>
        </Modal>
      </Portal>
      </>
    )
};