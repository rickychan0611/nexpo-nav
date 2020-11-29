
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../context/Context";
import { ThemeContext } from "../context/ThemeContext";
import { Divider, IconButton, Headline, Drawer, ActivityIndicator } from "react-native-paper";
import { db, auth } from "../firebase";
import { Image, Platform, ScrollView, Text, View } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import pointBG from "../public/pointBG.jpg"
import moment from "moment";

import BottomBar from "../components/BottomBar";
import Status from "../components/Status";
import Loader from "../components/Loader";

export default function account() {
  const { navigate } = useRouting();
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const {
    user, setUser, setSelectedOrder, selectedOrder,
    selected, setSelected,
    myOrderQueryTime, setMyOrderQueryTime,
    orders, setOrders
  } = useContext(Context);

  useEffect(() => {
    // const query = async () => {
    //   // setSelectedOrder({})
    //   console.log("RuNNNNNNNNNNNNNNNNNNNNNNNNN?????")
    //   if (user) {
    //     console.log("userNNNNNNNNNNNNNNN?????")
    //     const userRef = db.collection("users").doc(user.email)
    //     const snapshot = await userRef.get()
    //     console.log("userRef.getNNNNNNNNN?????")
    //     const lastOrderAt = snapshot.data().lastOrderAt

    //     if (myOrderQueryTime && moment(myOrderQueryTime.toDate())
    //       .isSame(lastOrderAt.toDate())
    //     ) {
    //       setLoading(false)
    //       console.log("Didn't run order query")
    //       return
    //     }

        if (user) {
          // setLoading(true)
          console.log("Run order query")
          db.collection("orders").where("userId", "==", user.email).onSnapshot((snapshot) => {
              // setMyOrderQueryTime(lastOrderAt)
              let tempArr = []
              snapshot.forEach((doc) => {
                tempArr.push(doc.data())
              })
              tempArr.sort((a, b) => {
                return b.createAt.toDate() - a.createAt.toDate()
              })
              setOrders(tempArr)
              // setLoading(false)
            })
            // .catch(err => {
            //   // setLoading(false)
            //   console.log(err)
            // })
        }
      // }
    // }
      // query()
  }, [user, selected])

  return (
    <>
      <ContextArea>
        <ScrollView>

          <Image
            style={{
              top: 0,
              position: "absolute",
              width: "100%",
              maxWidth: 500,
              height: 200,
              resizeMode: "stretch"
            }}
            source={pointBG}
          />
          <View style={{
            // flex: 1 ,
            top: 0,
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: 500,
            height: 200,
          }}>
            <Text
              style={{
                color: "white",
                fontSize: 26,
                fontWeight: "bold",
                marginBottom: 20
              }}>
              {user && user.firstName + " " + user.lastName}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "bold",
              }}>
              0 pts
            </Text>
          </View>

          <DrawerContainer style={{
            // borderBottomWidth: 1, 
            borderBottomColor: theme.lightGrey, marginTop: 200
          }}>
            <Drawer.Item
              style={{ backgroundColor: "white" }}
              icon="cogs"
              label="Settings"
            />
            <Divider />
            <Drawer.Item
              style={{ backgroundColor: "white" }}
              icon="logout"
              label="Logout"
              onPress={() => {
                auth.signOut().then(() => {
                  navigate({ routeName: "login" })
                  setUser("")
                })
              }}
            />
          </DrawerContainer>

          <Headline
            style={{
              padding: 25,
              fontWeight: "bold",
              color: theme.red,
              backgroundColor: theme.lightGrey
            }}
          >
            My orders</Headline>

          {loading ?
            <View style={{
              height: 200,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <ActivityIndicator color={theme.red} size="large" />
            </View> :
            <>
              {orders && orders[0] && orders.map((item) => {
                return (
                  <View key={item.orderId}>
                    <ItemsContainer key={item.orderId}
                      onPress={() => {
                        setSelected("order")
                        setSelectedOrder(item)
                        navigate({
                          routeName: "order"
                        })
                      }}>
                      <StatusContainer>
                        <Status status={item.status} theme={theme} />
                      </StatusContainer>
                      <Content>
                        <Text style={{ fontSize: 16 }}>{item.status}</Text>
                        <Text style={{ fontSize: 12, color: "grey" }}>{moment(item.createAt.toDate()).format("MMM. DD, YYYY, hh:mm A")}</Text>
                        <Text style={{ fontSize: 12, color: "grey" }}>Order # {item.orderId} </Text>
                      </Content>
                      <Next>
                        <Text style={{
                          textAlign: "right",
                          backgroundColor: theme.lightGrey,
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                          borderRadius: 25
                        }}>{"Details"}</Text>
                      </Next>
                    </ItemsContainer>
                    <Divider style={{ borderBottomWidth: 2, borderBottomColor: theme.lightGrey }} />
                  </View>
                )
              })}
            </>
          }

          <View style={{ height: 100 }}></View>

        </ScrollView>
      </ContextArea>

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


const ItemsContainer = styled.TouchableOpacity`
  width: ${Platform.OS === "web" ? `100vw` : `null`};
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 500px;
  padding: 15px;
`;

const DrawerContainer = styled.View`
  width: ${Platform.OS === "web" ? `100vw` : `null`};
  flex-direction: column;
  flex-wrap: nowrap;
  max-width: 500px;
  padding: 7px 0px 7px 0px;
`;

const Content = styled.View`
  flex: 9;
  justify-content: center;
  align-items: flex-start;
`;
const Next = styled.View`
  flex: 4;
  justify-content: center;
  align-items: flex-end;
`;
const ContextArea = styled.View`
  /* flex: 1; */
  width: ${Platform.OS === "web" ? `100vw` : `100%`};
  height: ${Platform.OS === "web" ? `calc(100vh - 54px) ` : `100%`};
  max-width: 500px;
  background-color: white;
  /* padding-bottom: ${Platform.OS === "web" ? `35px` : `95px`}; */
`;
const StatusContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0;
  margin-top: -7px;
  right: 5px
`;