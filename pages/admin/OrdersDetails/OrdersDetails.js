import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Context } from "../../../context/Context";
import { ThemeContext } from "../../../context/ThemeContext";
import { Divider, IconButton, Headline, Button, Paragraph, Dialog, Portal, ActivityIndicator } from "react-native-paper";
import { Image, Platform, ScrollView, View, Text } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import moment from "moment";
import { db } from "../../../firebaseApp";

import TotalDetails from "../../../components/TotalDetails";
import Status from "../../../components/Status";

import Loader from "../../../components/Loader";
import { AdminContext } from "../../../context/AdminContext";
export default function order() {
  const { navigate, goBack } = useRouting();
  const [loading, setLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const { setSelectedOrder, setSelected } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const { selectedOrder } = useContext(AdminContext);

  const [cancelDialog, setCancelDialog] = useState(false);
  const showCancelDialog = () => setCancelDialog(true);
  const hideCancelDialog = () => setCancelDialog(false);

  const [cancelledDialog, setCancelledDialog] = useState(false);
  const showCancelledDialog = () => setCancelledDialog(true);
  const hideCancelledDialog = () => setCancelledDialog(false);

  const onCancel = async () => {
    setCancelLoading(true)
    const orderRef = db.collection("orders").doc(selectedOrder.orderId)
    orderRef.update({ status: "Order Cancelled" })
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
                }}>

                  <View style={{
                    paddingLeft: 15,
                    flex: 2,
                    flexDirection: "row",
                    flexWrap: "nowrap",
                  }}>
                    <StatusContainer>
                      <Status status={selectedOrder.status} theme={theme}
                        style={{ margin: 0 }} />
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


                <View style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                  paddingRight: 20,
                  marginBottom: 25
                }}>

                  <View style={{
                    paddingLeft: 25,
                    flex: 2,
                    flexDirection: "row",
                    flexWrap: "nowrap",
                  }}>
                    {/* LOGO */}
                    {/* <StatusContainer>
                      <Status status={selectedOrder.status} theme={theme}
                        style={{ margin: 0 }} />
                    </StatusContainer> */}
                    <Text style={{
                      fontSize: 16,
                      paddingTop: 7
                    }}>
                     Payment: {selectedOrder.paymentStatus === "Approved" ? "Credit Card - PAID" : "Pay upon delivery"}
                    </Text>
                  </View>
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

                <Title>Delivery Info:</Title>

                <TableRow style={{ paddingTop: 10, paddingRight: 25 }}>
                  <Left><Text style={{ color: "grey" }}>Receiver:</Text></Left>
                  <Right><Text style={{ color: "grey" }}>{selectedOrder.shippingAddress.firstName + " " + selectedOrder.shippingAddress.lastName}</Text></Right>
                </TableRow>
                <TableRow style={{ paddingRight: 25 }}>
                  <Left><Text style={{ color: "grey" }}>Address:</Text></Left>
                  <Right><Text style={{ color: "grey", textAlign: "right" }}>
                    {selectedOrder.shippingAddress.address1 + "\n"}
                    {selectedOrder.shippingAddress.address2 && shippingAddress.address2 + "\n"}
                    {selectedOrder.shippingAddress.city + "\n"}
                    {selectedOrder.shippingAddress.province + ", "}
                    {selectedOrder.shippingAddress.country + "\n"}
                    {selectedOrder.shippingAddress.postalCode}
                  </Text></Right>
                </TableRow>

                <TableRow style={{ paddingTop: 10, paddingRight: 25 }}>
                  <Left><Text style={{ color: "grey" }}>Phone#:</Text></Left>
                  <Right><Text style={{ color: "grey" }}>{selectedOrder.shippingAddress.phoneNumber}</Text></Right>
                </TableRow>

                {selectedOrder.shippingAddress.message ?
                  <TableRow style={{ paddingTop: 10, paddingRight: 25 }}>
                    <Left><Text style={{ color: "grey" }}>Note:</Text></Left>
                    <Right><Text style={{ color: "grey" }}>{selectedOrder.shippingAddress.message}</Text></Right>
                  </TableRow>
                  : null}

                <View style={{ height: 200 }}></View>

                <View style={{ height: 100 }}></View>

              </ScrollView>

            </ContextArea>
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
const TableRow = styled.View`
  width: ${Platform.OS === "web" ? `100vw` : `null`};
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 500px;
  padding: 5px 25px 5px 25px;
`;
const Left = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Right = styled.View`
  flex: 3;
  justify-content: flex-end;
  align-items: flex-end;
  `;
