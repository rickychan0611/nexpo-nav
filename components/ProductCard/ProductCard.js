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


            <View>
              {selected !== "store" &&
                // {/* admin control */}
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%"
                }}>

                  <TouchableOpacity onPress={() => {
                    // {/* activate switch  */}
                    db.collection("products").doc(item.uid).update({ activated: !item.activated })
                  }}>
                    <View style={{
                      flexDirection: "row", 
                      flexWrap: "nowrap",
                      alignItems: "center",
                      paddingLeft: 5,
                      }}>
                      <Switch
                        value={item.activated}
                        onValueChange={onToggleSwitch}
                      />
                      <Text>{item.activated ? "Active" : "Hidden"}</Text>
                    </View>
                  </TouchableOpacity>
                  <IconButton icon="delete" color={theme.red}
                    onPress={() => {
                      {/* delete button */ }
                      setShowDialog(true)
                      setDelItem(item.uid)
                    }} />
                </View>
              }
            </View>


            <ContentContainer 
            style={{
              opacity: item.activated ? 1 : 0.4,
              borderTopWidth : 1,
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
      flex: 2;
      padding: 5px 0 5px 0 ;
      width: 100px;
      height: 100px;
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