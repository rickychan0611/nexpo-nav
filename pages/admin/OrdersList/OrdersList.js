
import React, { useContext, useState, useEffect } from "react";
import { Dimensions, View, Text, TouchableOpacity, Platform, Picker } from "react-native";
import { Headline, Surface, Divider, Button, Menu, IconButton, Dialog, Portal, Paragraph } from 'react-native-paper';

import { Context } from "../../../context/Context";
import { ThemeContext } from "../../../context/ThemeContext";
import { AdminContext } from "../../../context/AdminContext";
import styled from "styled-components/native";
import moment from "moment";
import { useRouting } from "expo-next-react-navigation";

import { db, functions } from "../../../firebaseApp";
import Loader from "../../../components/Loader";
import PrinterWeb from "../../../components/Printer/PrinterWeb";
import PrinterMobile from "../../../components/Printer/PrinterMobile";
import DatePickerMobile from "../../../components/DatePickerMobile";
import DatePickerWeb from "../../../components/DatePickerWeb";

export default function OrdersList() {

  const { navigate } = useRouting();

  let ScreenHeight = Dimensions.get("window").height;
  const { theme } = useContext(ThemeContext);
  const {
    listenOrders, unsubscribe,
    orders, setOrders,
    selectedOrder, setSelectedOrder,
    orderDate, setOrderDate
  } = useContext(AdminContext);

  const [status, setStatus] = useState("In Progress")
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const openMenu = (orderId) => setVisible(orderId);
  const closeMenu = () => setVisible(false);

  //dailog
  const [refundOrder, setRefundOrder] = useState();

  const [showConfirmRefundDialog, setShowConfirmRefundDialog] = useState(false);
  const hideConfirmRefundDialog = () => setShowConfirmRefundDialog(false)

  const [showRefundSuccessDialog, setShowRefundSuccessDialog] = useState(false);
  const hideRefundSuccessDialog = () => setShowRefundSuccessDialog(false)

  const showRefundDialog = (order) => {
    //1.show box, 2.close menu, 3.set order state 4.refund function if OK
    setShowConfirmRefundDialog(true)
    closeMenu()
    setRefundOrder(order)
  }

  const refundPayment = () => {
    console.log("refund order:!!!!")
    console.log(refundOrder)
    //model are you sure to refun? or enter refund amount
    const refundPayment = functions.httpsCallable('refundPayment')
    refundPayment({
      order: refundOrder
    })
      .then(async (data) => {
        console.log("retrun data")
        console.log(data)
        // await updateStatus(refundOrder.orderId, "Cancelled")
        // showRefundSuccessDialog(true)
      })

  }

  const updateStatus = async (orderId, status) => {
    setLoading(true)
    console.log("update sent")
    await db.collection("orders").doc(orderId).update({ status: status, "statusUpdatedAt": moment().format() })
      .then(() => {
        return
      })
  }

  const DatePicker = () => {
    if (Platform.OS === "web") {
      return <DatePickerWeb />
    }
    else {
      return <DatePickerMobile />
    }
  }

  useEffect(() => {
    listenOrders()
  }, [])

  return (
    <>
      {loading && <Loader />}

      {/* Confirm Refund */}
      <Portal>
        <Dialog visible={showConfirmRefundDialog} onDismiss={hideConfirmRefundDialog}>
          <Dialog.Title>Refund</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure to cancel the order and refund ${refundOrder && refundOrder.totalAmt}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => hideConfirmRefundDialog()}>Cancel</Button>
            <Button onPress={() => refundPayment()}>Yes</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Refund Success */}
      <Portal>
        <Dialog visible={showRefundSuccessDialog} onDismiss={hideRefundSuccessDialog}>
          <Dialog.Title>Refund</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Refund Successful
              </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => hideRefundSuccessDialog()}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Container ScreenHeight={ScreenHeight} theme={theme}>


        <Row>
          <Headline style={{ color: theme.titleColor, marginTop: 20, marginBottom: 20 }}>Orders</Headline>
          <DatePicker />

        </Row>


        {orders[0] ? orders.map((order, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedOrder(order)
                navigate({ routeName: "admin/order-details" })
                key = { index }
              }}>
              <Surface style={{
                padding: 20,
                paddingTop: 40,
                paddingBottom: 30,
                width: "100%",
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                elevation: 4,
                marginBottom: 20

              }}
              >
                <View key={order.orderId} style={{ width: "100%" }}>

                  {Platform.OS === "web" ? <PrinterWeb order={order} /> : <PrinterMobile order={order} />}

                  <View style={{
                    width: "100%",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>

                    <Date style={{ flex: 1, position: 'absolute', top: -20 }}>
                      {moment(order.createAt.toDate()).format("MMM. DD, YYYY")} {"\n\nOrder ID#: " + order.orderId}
                    </Date>

                    <View style={{
                      flex: 1,
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      margin: 0
                    }}>

                      <Menu
                        visible={visible === order.orderId && true}
                        onDismiss={closeMenu}
                        anchor={
                          <View style={{
                            // flex: 1,
                            flexDirection: "row",
                            flexWrap: "nowrap",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            margin: 0,
                            // width: "100%"
                          }}
                          >
                            <IconButton icon="chevron-down" onPress={() => openMenu(order.orderId)} />
                            <Text onPress={() => openMenu(order.orderId)} >{order.status}</Text>
                          </View>
                        }>
                        <Menu.Item onPress={() => updateStatus(order.orderId, "In Progress")} title="In Progress" />
                        <Divider />
                        <Menu.Item onPress={() => updateStatus(order.orderId, "Out for Delivery")} title="Out for Delivery" />
                        <Divider />
                        <Menu.Item onPress={() => updateStatus(order.orderId, "Completed")} title="Completed" />
                        <Divider />
                        <Menu.Item onPress={() => {
                          showRefundDialog(order)
                        }
                        } title="Cancel & Refund" />

                      </Menu>
                    </View>
                  </View>


                  <View style={{
                    // flex: 1,
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginBottom: 10
                  }}>
                    <Text>
                      Payment: {order.paymentStatus === "Approved" ? "Credit Card - PAID" : "Pay upon delivery"}
                    </Text>
                  </View>

                  {order.orderItems.map((item, index) => {
                    // console.log(item)
                    return (
                      // <Text>{item.quantity}</Text>
                      <>
                        <Divider />

                        <ItemsContainer key={item.productId}>
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

                      </>
                    )
                  })}
                </View>
              </Surface>
            </TouchableOpacity>
          )
        }) :
          <Surface style={{
            padding: 8,
            height: 80,
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 4
          }}>
            <Text style={{fontSize: 18}}>No Order 😓</Text>
          </Surface>
        }
        <View style={{ marginBottom: 150 }}></View>
      </Container>
    </>
  );
}

const Container = styled.ScrollView`
  /* flex: 1; */
  width: 100%;
  height: ${props => Platform.OS === "web" ? `100%` : props.ScreenHeight};
  /* margin-bottom: 20px; */
  padding: 10px;
  background-color: ${props => props.theme.lightGrey};
`;
const Date = styled.Text`
font-size: 14px;
  
`;
const ItemsContainer = styled.View`
  /* width: ${Platform.OS === "web" ? `100%` : `null`}; */
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 440px;
  padding: 10px 0px 10px 0px;
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
const Row = styled.View`
 flex-direction: row;
 flex-wrap: nowrap;
 justify-content: space-between;
 align-items: center;
 z-index: 1000;
`;