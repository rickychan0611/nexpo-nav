
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import { Divider, Button, Headline, IconButton, Surface } from "react-native-paper";
import { firebase, db, functions } from "../../firebaseApp";
import { TouchableOpacity, Platform, ScrollView, Text, View } from "react-native";
import { useRouting } from "expo-next-react-navigation";
import moment from "moment";
import BottomBar from "../../components/BottomBar";
import AddressForm from "../../components/AddressForm";
import InitLoader from "../../components/InitLoader";
import Loader from "../../components/Loader";
import ShippingNextBtn from "../../components/ShippingNextBtn";

export default function chooseCard() {
  const { navigate, getParam, goBack } = useRouting();

  const userId = getParam('userId')
  const addressType = getParam('type')

  const { theme } = useContext(ThemeContext);

  const {
    user, addressBook,
    onEdit, setOnEdit,
    onAddNew, setOnAddNew,
    initLoaded,
    cards, setCards,
    isAddNewCard, setIsAddNewCard,
    setProfileId,
    selectedCard, setSelectedCard,
    checkCards,
    loadingCards, setLoadingCards
  } = useContext(Context);

  //update addressType so that it is selected
  const setDefaultCard = (profile) => {
    db.collection("users").doc(user.email).update({
      defaultProfileId: profile.customer_code
    })
      .then(() => {
        setSelectedCard(profile)
      })
      .catch(err => console.log(err))
  }

  const deleteCard = (customer_code, index, lastOne) => {
    setLoadingCards(true)
    const deleteQuery = functions.httpsCallable('deleteProfile')
    deleteQuery({
      profileId: customer_code,
      email: user.email,
      index
    })
      .then(() => {
        user.profiles.splice(index, 1)
        db.collection("users").doc(user.email).update({
          profiles: user.profiles
        })
        // cards.splice(index, 1)
        if (lastOne) {
          db.collection("users").doc(user.email).update({
            defaultProfileId: ""
          })
            .then(() => setLoadingCards(false))
        }
        else setLoadingCards(false)
      })
  }

  const onSubmit = () => {
    navigate({ routeName: "confirmOrder" })
  }

  const sortedCards = (cards) => {
    let sort = cards.sort((a, b) => {
      return moment(b.modified_date).diff(moment(a.modified_date))
    })
    return sort
  }

  useEffect(() => {
    // checkCards()

    user.profiles && user.profiles[0] && user.profiles.map(profile => {
      if (profile.customer_code === user.defaultProfileId) {
        setSelectedCard(profile)
      }
    })
    // setSelectedCard(profile)
  }, [user])

  return (
    <>
      {loadingCards && <Loader />}
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
                () => navigate({ routeName: "checkout/payment-method" })
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
                        setIsAddNewCard(true)
                        navigate({ routeName: "checkout/new-card" })
                      }}>{"+ Add a New Card"}</Edit>
                  </View>
                </>}

              {cards && cards[0] ? sortedCards(cards).map((profile, index) => {
                return (
                  <Surface
                    key={index}
                    style={{
                      elevation: 4,
                      marginHorizontal: 20,
                      marginBottom: 20,
                      borderWidth: 1,
                      borderRadius: 25,
                      borderColor: user.defaultProfileId === profile.card.customer_code ? theme.primary : theme.lightGrey
                    }}>

                    <View style={{ paddingHorizontal: 35, paddingVertical: 15 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 15 }}>{profile.card.name.split(',')[0]}</Text>
                      <Text>{profile.card.number}</Text>
                      <Text>Expiry Date: {profile.card.expiry_month + "/" + profile.card.expiry_year}</Text>
                      <Text> </Text>

                      {user.defaultProfileId === profile.customer_code ?
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
                            setDefaultCard(profile)
                          }}>choose this card</Button>
                      }

                      <View style={{
                        flexDirection: "row",
                        flexWrap: "nowrap",
                        justifyContent: "center",
                      }}>

                        {user.defaultProfileId === profile.customer_code ?
                          <TouchableOpacity onPress={() => {
                            cards.length === 1 && deleteCard(profile.customer_code, index, true)
                          }}>
                            <Edit theme={theme} style={{
                              color: cards.length !== 1 ? theme.lightGrey : theme.red
                            }}>
                              Delete</Edit>
                          </TouchableOpacity>

                          :
                          <TouchableOpacity onPress={() => {
                            deleteCard(profile.customer_code, index)
                          }}>
                            <Edit theme={theme} disabled
                            >
                              Delete</Edit>
                          </TouchableOpacity>
                        }

                      </View>
                    </View>
                  </Surface>
                )
              })
                :
                <Surface style={{
                  elevation: 4,
                  marginHorizontal: 20,
                  marginBottom: 20,
                  borderWidth: 1,
                  borderColor: theme.primary,
                  padding: 20
                }}>
                  <Text>No Card Found</Text>
                </Surface>
              }

              <View style={{ height: 150 }}></View>
            </ScrollView>
          </ContextArea>

          {cards && cards[0] && <ShippingNextBtn onSubmit={onSubmit} />}

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
  max-width: 900px;
  background-color: white;
  /* padding-bottom: ${Platform.OS === "web" ? `35px` : `95px`}; */
`;
