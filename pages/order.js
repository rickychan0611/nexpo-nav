
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../context/Context";
import { ThemeContext } from "../context/ThemeContext";
import { Divider, IconButton, Headline, Button, Paragraph, Dialog, Portal, ActivityIndicator } from "react-native-paper";
import { Image, Platform, ScrollView, View, Text } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import moment from "moment";
import { db } from "../firebaseApp";

import BottomBar from "../components/BottomBar";
import TotalDetails from "../components/TotalDetails";
import Status from "../components/Status";

import Loader from "../components/Loader";
export default function order() {
  const { navigate, goBack } = useRouting();
  const [loading, setLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const { selectedOrder, setSelectedOrder, setSelected, user } = useContext(Context);
  const { theme } = useContext(ThemeContext);

  const [cancelDialog, setCancelDialog] = useState(false);
  const showCancelDialog = () => setCancelDialog(true);
  const hideCancelDialog = () => setCancelDialog(false);

  const [cancelledDialog, setCancelledDialog] = useState(false);
  const showCancelledDialog = () => setCancelledDialog(true);
  const hideCancelledDialog = () => setCancelledDialog(false);

  const onCancel = async () => {
    setCancelLoading(true)
    const orderRef = db.collection("orders").doc(selectedOrder.orderId)
    await orderRef.update({ status: "Order Cancelled" })
    db.collection("users").doc(user.email).update({points: user.points - (selectedOrder.totalAmt * 100)})
    setSelectedOrder(prev => ({ ...prev, status: "Order Cancelled" }))
    showCancelledDialog()
    hideCancelDialog()
    setCancelLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    if (!selectedOrder) {
      setLoading(false)
      navigate({
        routeName: "account"
      })
    }
    else setLoading(false)
  }, [])

  return (
    <>
      <Portal>
        <Dialog visible={cancelDialog} onDismiss={hideCancelDialog}>
          <Dialog.Title>Cancel Order</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure to cancel order?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            {!cancelLoading ?
              <>
                <Button onPress={() => { hideCancelDialog() }}>No</Button>
                <Button onPress={() => { onCancel() }}>Yes</Button>
              </> :
              <>
                <Button loading></Button>
              </>
            }
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog visible={cancelledDialog} onDismiss={hideCancelledDialog}>
          <Dialog.Title>Order has been cancelled</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => {
              setSelected("account")
              hideCancelledDialog()
              navigate({routeName: "account"})
            }}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {
        loading || !selectedOrder ?
          <Loader />
          :
          <>
            <ContextArea>
              <IconButton icon="arrow-left" onPress={() => {
                goBack()
              }} />
              <ScrollView>
                <Headline
                  style={{
                    paddingLeft: 25
                  }}
                >
                  Order #{selectedOrder && selectedOrder.orderId}</Headline>
                <Title style={{
                  paddingLeft: 25,
                  paddingVertical: 0,
                  color: "grey",
                  fontSize: 16
                }}>{moment(selectedOrder.createAt.toDate()).format("MMM. DD, YYYY, hh:mm A")}</Title>

                <View style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                  paddingRight: 20,
                  marginBottom: 25
                }}>

                  <View style={{
                    paddingLeft: 15,
                    flex: 2,
                    flexDirection: "row",
                    flexWrap: "nowrap",
                  }}>
                    <StatusContainer>
                      <Status status={selectedOrder.status} theme={theme} 
                      style={{margin: 0}}/>
                    </StatusContainer>
                    <Text style={{
                      fontSize: 16,
                      paddingTop: 7
                    }}>
                      {selectedOrder.status}
                    </Text>
                  </View>

                  {selectedOrder.status === "In Progress" ?
                    <CancelButton onPress={showCancelDialog}>
                      <Text style={{
                        textAlign: "right",
                        backgroundColor: theme.lightGrey,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        borderRadius: 25,
                        fontSize: 10
                      }}>
                        {"Cancel Order"}
                      </Text>
                    </CancelButton>
                    : null
                  }

                </View>
                <Divider />
                <Divider />

                {selectedOrder && selectedOrder.orderItems[0] && selectedOrder.orderItems.map((item, index) => {
                  return (
                    <View key={item.index} >
                      <ItemsContainer>
                        <Qty>
                          <Text style={{ color: "green" }}>{item.quantity}X</Text>
                        </Qty>
                        <Content>
                          <Text style={{ fontSize: 16 }}>
                            {item.item.chineseName + " " + item.item.englishName}
                          </Text>
                        </Content>
                        <Price>
                          <Text style={{ textAlign: "right" }}>${(+item.item.final_price).toFixed(2)}</Text>
                        </Price>
                      </ItemsContainer>
                      <Divider />
                    </View>
                  )
                })}

                <Divider />

                <TotalDetails total={selectedOrder ? selectedOrder.totalAmt : 0} />

                <Divider />

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
      }
    </>
  );
}

const ItemsContainer = styled.View`
  width: ${Platform.OS === "web" ? `100vw` : `null`};
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 500px;
  padding: 15px 25px 15px 25px;
`;

const Qty = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;
const Content = styled.View`
  flex: 8;
  justify-content: center;
  align-items: flex-start;
`;
const Price = styled.View`
  flex: 6;
  justify-content: center;
  align-items: flex-end;
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

const Total = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const Bar = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
  background-color: ${props => props.theme.black}; 
  height: 40px;
  width: 40%;
  max-width: 220px;
  border-radius: 25px;
`;
const Wrapper = styled.TouchableOpacity`
  position: ${Platform.OS === "web" ? `fixed` : `absolute`};
  bottom: 68px;
  height: 55px;
  width: 100%;
  max-width: 500px;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`;
const CancelButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

const StatusContainer = styled.View`
  /* flex: 1; */
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0;
  /* margin-top: -7px; */
  /* right: 5px */
`;