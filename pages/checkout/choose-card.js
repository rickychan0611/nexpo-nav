
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import { Divider, Button, Headline, IconButton, Surface } from "react-native-paper";
import { firebase, db, functions } from "../../firebaseApp";
import { TouchableOpacity, Platform, ScrollView, Text, View } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";

import BottomBar from "../../components/BottomBar";
import AddressForm from "../../components/AddressForm";
import InitLoader from "../../components/InitLoader";
import Loader from "../../components/Loader";

export default function chooseCard() {
  const { navigate, getParam, goBack } = useRouting();

  const userId = getParam('userId')
  const addressType = getParam('type')

  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  const {
    user, addressBook,
    onEdit, setOnEdit,
    onAddNew, setOnAddNew,
    editAddress, setEditAddress,
    initLoaded,
    task, setTask,
    setNewBillingBoxchecked,
    cards, setCards,
    selectedCard, setSelectedCard
  } = useContext(Context);

  //update addressType so that it is selected
  const updateShippingAddress = (addressId) => {
    const key = `addressType.shipping`
    console.log("key:" + key)
    db.collection("users").doc(user.email).update({
      [key]: addressId
    })
  }

  const deleteAddress = (addressID, index) => {
    const key = `addressBook.${addressID}`
    db.collection("users").doc(user.email).update({
      [key]: firebase.firestore.FieldValue.delete()
    })
  }

  useEffect(() => {
    setLoading(true)
    user && functions.useFunctionsEmulator('http://localhost:5001')
    console.log(user)
    const getCards = functions.httpsCallable('getCards')
    getCards({
      profileId: user.profileId
    })
      .then((result) => {
        if (result.data.code !== 1) {
          setLoading(false)
          throw result.data.message
        }
        else {
          console.log(result.data)
          setCards(result.data.card)
          setLoading(false)
          // setProfileId(result.data.customer_code)
          // navigate({routeName: "confirmOrder"})
          // setLoading(false)
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log("Error: " + err)
      })

    return () => { setTask("newBillingAddress") }
  }, [user])

  return (
    <>
      {loading && <Loader />}
      {!initLoaded ? <InitLoader /> :
        <>
          <ContextArea>
            <IconButton icon="arrow-left" onPress={
              onEdit || onAddNew ?
                () => {
                  setOnEdit(false)
                  setOnAddNew(false)
                }
                :
                () => goBack()
            } />
            <ScrollView>
              {onEdit || onAddNew ? null :
                <>
                  <Title style={{ color: "black", fontWeight: "bold", fontSize: 16, marginHorizontal: 10 }}>
                    Choose a payment card:
                    </Title>
                  <View style={{ marginBottom: 20, marginHorizontal: 20 }} >
                    <Edit theme={theme}
                      onPress={() => {
                        if (task === "changeBillingAddress") {
                          goBack()
                          setTask("newBillingAddress")
                          setNewBillingBoxchecked(false)
                        }
                        else setOnAddNew(true)
                      }}>{"+ Add a New Card"}</Edit>
                  </View>
                </>}

              {cards[0] && cards.map((card, index) => {
                return (

                  <Surface style={{
                    elevation: onEdit || onAddNew ? 0 : 4,
                    marginHorizontal: onEdit || onAddNew ? 0 : 20,
                    marginBottom: onEdit || onAddNew ? 0 : 20,
                    borderWidth: onEdit || onAddNew ? 0 : 1,
                    borderRadius: 25,
                    borderColor: user.defaultCard === card.id ? theme.primary : theme.lightGrey
                  }}>

                    {onEdit || onAddNew ?
                      <>
                        {onEdit && address === editAddress &&
                          <AddressForm
                            index={index}
                            onEdit
                            setOnEdit={setOnEdit}
                            onAddNew={onAddNew}
                            setOnAddNew={setOnAddNew} />}

                        {onAddNew && index === 0 &&
                          <AddressForm
                            index={index}
                            onEdit
                            setOnEdit={setOnEdit}
                            onAddNew={onAddNew}
                            setOnAddNew={setOnAddNew} />}

                      </>
                      :

                      <View style={{ paddingHorizontal: 35, paddingVertical: 15 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>{card.name}</Text>
                        <Text>{card.number}</Text>
                        <Text>Expiry Date: {card.expiry_month + "/" + card.expiry_year}</Text>
                        <Text> </Text>

                        {user.defaultCard === card.id ?
                          <Button mode="outlined"
                            color={theme.primary}
                            dark uppercase={false}
                            labelStyle={{ fontSize: 14, fontWeight: "bold" }}
                            style={{ marginBottom: 10 }}
                          >SELECTED</Button>
                          :
                          <Button mode="contained"
                            color={theme.primary}
                            dark uppercase={false}
                            labelStyle={{ fontSize: 14, fontWeight: "bold" }}
                            style={{ marginBottom: 10 }}
                            onPress={() => {
                              updateShippingAddress(address.id)
                            }}>Change to this address</Button>
                        }

                        <View style={{
                          flexDirection: "row",
                          flexWrap: "nowrap",
                          justifyContent: "center",
                        }}>

                          <TouchableOpacity onPress={() => {
                            setOnEdit(true)
                            setEditAddress(address)
                          }}>
                            <Edit theme={theme}
                            >Edit</Edit>
                          </TouchableOpacity>

                          <Text>{"     |     "}</Text>

                          {user.defaultCard === card.id ?

                            <Edit theme={theme} style={{ color: theme.lightGrey }}>
                              Delete</Edit>
                            :
                            <TouchableOpacity onPress={() => {
                              deleteAddress(card.id, index)
                            }}>
                              <Edit theme={theme} disabled
                              >
                                Delete</Edit>
                            </TouchableOpacity>
                          }

                        </View>
                      </View>
                    }
                  </Surface>
                )
              })}

              <View style={{ height: 150 }}></View>
            </ScrollView>
          </ContextArea>

          {/* <ShippingNextBtn onSubmit={onSubmit} /> */}

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
      }
    </>
  );
}

const Edit = styled.Text`
 font-size: 14px;
 font-weight: 600;
 color: ${props => props.disabled ? props.theme.darkGrey : props.theme.primary}
`;
const Title = styled.Text`
  font-size: 18px;
  width: 100%;
  padding: 15px;
  background-color: white;   
`;
const ContextArea = styled.View`
  /* flex: 1; */
  width: ${Platform.OS === "web" ? `100vw` : `100%`};
  height: ${Platform.OS === "web" ? `calc(100vh - 54px) ` : `100%`};
  max-width: 500px;
  background-color: white;
  /* padding-bottom: ${Platform.OS === "web" ? `35px` : `95px`}; */
`;
