import React, { useContext, useState } from "react";
import { View, TouchableOpacity, Platform, Text } from "react-native";
import imagePlaceholder from "../../public/imagePlaceholder.jpg";
import { Switch, IconButton, Button, Portal, Dialog, Paragraph } from 'react-native-paper';
import { db } from "../../firebaseApp";

import styled from "styled-components/native";
import ProductContent from "../ProductContent";
import { ThemeContext } from "../../context/ThemeContext";
import { Context } from "../../context/Context";

export default function ProductCard({ key, item }) {
  const { theme } = useContext(ThemeContext);
  const { selected } = useContext(Context);

  //dailog
  const [showDialog, setShowDialog] = useState(false);
  const [delItem, setDelItem] = useState("");
  const [loading, setLoading] = useState(true);
  const hideDialog = () => setShowDialog(false)

  const onDelete = () => {
    setLoading(true)
    db.collection("products").doc(delItem).delete()
      .then(() => { setLoading(false) })
  }

  const onToggleSwitch = () => {
    console.log("swtich")
    if (Platform.OS !== "web") {
      db.collection("products").doc(item.uid).update({ activated: !item.activated })
    }
  }
  return (
    <>
      <Portal>
        <Dialog visible={showDialog} onDismiss={hideDialog}>
          <Dialog.Title>Are you sure?</Dialog.Title>
          <Dialog.Content>
            <Paragraph>This item will be deleted permanently. </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => hideDialog()}>Cancel</Button>
            <Button loading={loading} onPress={() => onDelete()}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {
        item && <>
          <Container key={key}
            style={{
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.15,
              shadowRadius: 10,
              elevation: item.activated ? 10 : 0,
              zIndex: 1000
            }}>

            {selected !== "store" && <ContentContainer
              style={{
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >

              <TouchableOpacity

                style={{ flex: 1}}
                onPress={() => {
                  db.collection("products").doc(item.uid).update({ activated: !item.activated })
                }}>
                <View style={{justifyContent: "flex-start", alignItems: "flex-start" }}>
                  <Switch
                    value={item.activated}
                    onValueChange={onToggleSwitch}
                  />
                </View>
              </TouchableOpacity>

              <View style={{ flex: 1, alignItems: "center" }}>
                <Text>Stock: {item.qty}</Text>
              </View>

              <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                <IconButton icon="delete" color={theme.red}
                  onPress={() => {
                    {/* delete button */ }
                    setShowDialog(true)
                    setDelItem(item.uid)
                  }} />
              </View>


            </ContentContainer>}

            <ContentContainer
              style={{
                opacity: item.activated ? 1 : 0.4,
                borderTopWidth: 1,
                borderTopColor: "#e3e3e3"
              }}>
              <ImageWrapper>
                {item.images && item.images[0] ?
                  <Image source={{
                    uri: item.images[0].url
                  }} />
                  :
                  <Image source={imagePlaceholder} />
                }
              </ImageWrapper>

              <RightSideContentWrapper>
                <ProductContent item={item} />
              </RightSideContentWrapper>
            </ContentContainer>
          </Container>
        </>
      }
    </>
  )
};

const Container = styled.View`
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: flex-start;
      width: 93%;
      max-width: 500px;
      padding: 0px 5px 10px 5px;
      margin: 10px;
      border-radius:10px;
      border:1px solid #d4d4d4;
`;
const ContentContainer = styled.View`
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: flex-start;
      width: 100%;
      max-width: 500px;
`;

const ImageWrapper = styled.View`
      flex: 3;
      padding: 5px 0 5px 0 ;
      /* width: 100px; */
      height: 150px;
`;
const Image = styled.Image`
      flex: 1;
      /* width: 100px;
      height: 100px; */
      /* background-color: white; */
      resize-mode: contain;
`;

const RightSideContentWrapper = styled.View`
      flex: 4;
      flex-direction: column;
      /* flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: space-between; */
      /* background-color: white; */
      width: 100%;
      min-height: 100px;
      padding: 10px 10px 5px 10px;
`;