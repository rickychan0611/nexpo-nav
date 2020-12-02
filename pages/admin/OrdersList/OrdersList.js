
import React, { useContext, useState, useEffect } from "react";
import { Dimensions, View, Text, TouchableOpacity, Platform, Picker } from "react-native";
import { Headline, Surface, Divider, Button, Menu, Provider, IconButton } from 'react-native-paper';

import { Context } from "../../../context/Context";
import { ThemeContext } from "../../../context/ThemeContext";
import { AdminContext } from "../../../context/AdminContext";
import styled from "styled-components/native";
import moment from "moment";
import { useRouting } from "expo-next-react-navigation";

import { db } from "../../../firebase";
import Loader from "../../../components/Loader";
import PrinterWeb from "../../../components/Printer/PrinterWeb";
import PrinterMobile from "../../../components/Printer/PrinterMobile";

export default function OrdersList() {
  const { navigate } = useRouting();

  let ScreenHeight = Dimensions.get("window").height;
  const { theme } = useContext(ThemeContext);
  const {
    listenOrders, unsubscribe,
    orders, setOrders,
    selectedOrder, setSelectedOrder
  } = useContext(AdminContext);

  const [status, setStatus] = useState("In Progress")
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const openMenu = (orderId) => setVisible(orderId);
  const closeMenu = () => setVisible(false);

  const updateStatus = (orderId, status) => {
    setLoading(true)
    console.log("update sent")
    db.collection("orders").doc(orderId).update({ status: status, "statusUpdatedAt": moment().format() })
      .then(() => {
        console.log("updated")
        setLoading(false)
        closeMenu()
      })
      .catch((err) => {
        setLoading(false)
        closeMenu()
        console.log(err)
      })
  }

  useEffect(() => {
    listenOrders()
  }, [])

  return (
    <>
      {loading && <Loader />}

      <Container ScreenHeight={ScreenHeight} theme={theme}>

        <Headline style={{ color: theme.titleColor, marginTop: 20, marginBottom: 20 }}>Orders</Headline>

        {orders.map((order) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedOrder(order)
                navigate({routeName: "admin/order-details"})
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

                {Platform.OS === "web" ? <PrinterWeb order={order}/> : <PrinterMobile order={order}/>}
                
                  <View style={{
                    width: "100%",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10
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
                        <Menu.Item onPress={() => updateStatus(order.orderId, "Cancelled")} title="Cancelled" />

                      </Menu>
                    </View>

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
                      </>
                    )
                  })}
                </View>
              </Surface>
            </TouchableOpacity>
          )
        })}
        <View style={{ marginBottom: 150}}></View>
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
  flex: 2;
  justify-content: center;
  align-items: flex-end;
`;
