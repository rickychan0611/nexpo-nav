import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../context/Context";
import { ThemeContext } from "../context/ThemeContext";
import { Divider, IconButton, Headline, Drawer, ActivityIndicator } from "react-native-paper";
import { db, auth } from "../firebaseApp";
import { Image, Platform, ScrollView, Text, View } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import pointBG from "../public/pointBG.jpg"
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomBar from "../components/BottomBar";
import Status from "../components/Status";
import { AccountContext } from "../context/AccountContext";

export default function account() {
  const { navigate } = useRouting();
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const {
    user, setUser, setSelectedOrder, setSelected,
    setNewOrderProductList,
    setTotal
  } = useContext(Context);

  const {
    orders, setOrders,
    listenMyOrders, unlistenMyOrders
  } = useContext(AccountContext)

  useEffect(() => {
    if (!user) {
      navigate({ routeName: "login" })
    }
    else listenMyOrders()
  }, [user])

  return (
    <>
      <ContextArea>
        <ScrollView>

          <Image
            style={{
              top: 0,
              position: "absolute",
              width: "100%",
              maxWidth: 900,
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
            maxWidth: 900,
            height: 200,
          }}>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 20
              }}>
              Hi, {user && user.firstName + " " + user.lastName}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                // fontWeight: "bold",
              }}>You have
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 50,
                fontWeight: "bold",
              }}>{user.points}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                margin: 0
              }}> points
            </Text>
          </View>

          <DrawerContainer style={{
            // borderBottomWidth: 1, 
            borderBottomColor: theme.lightGrey, marginTop: 200
          }}>
            {user.role === "admin" &&
              <>
                <Drawer.Item
                  style={{ backgroundColor: "white" }}
                  icon="shield-account"
                  label="Admin Panel"
                  onPress={() => navigate({ routeName: "admin/store-listings" })
                  }
                />
                <Divider />
              </>
            }
            {/* <Drawer.Item
              style={{ backgroundColor: "white" }}
              icon="cogs"
              label="Settings"
            />
            <Divider /> */}
            <Drawer.Item
              style={{ backgroundColor: "white" }}
              icon="logout"
              label="Logout"
              onPress={() => {
                setLoading(true)
                auth.signOut()
                  .then(() => {
                    AsyncStorage.removeItem(["newOrderProductList", "total"])
                    navigate({ routeName: "login" })
                    setUser("")
                    setNewOrderProductList([])
                    setTotal(0)
                    setLoading(false)
                  })
                  .catch((err) => {
                    console.log("logout err: ", err)
                    setLoading(false)
                  })
              }}
            />
          </DrawerContainer>



          <Headline
            style={{
              padding: 25,
              fontWeight: "bold",
              color: theme.primary,
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
              <ActivityIndicator color={theme.primary} size="large" />
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
                          paddingHorizontal: 25,
                          borderRadius: 25,
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
  max-width: 900px;
  padding: 25px;
`;

const DrawerContainer = styled.View`
  width: ${Platform.OS === "web" ? `100vw` : `null`};
  flex-direction: column;
  flex-wrap: nowrap;
  max-width: 900px;
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
  max-width: 900px;
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