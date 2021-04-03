import React, { useContext } from "react";
import { View, Text, Platform } from "react-native";
import styled from "styled-components/native";

export default function TotalDetails({ order }) {

  return (
    <>
      <TotalContainer style={{ paddingTop: 20, paddingRight: 25 }}>
        <Content ><Text style={{ color: "grey" }}>Subtotal:</Text></Content>
        <Price ><Text style={{ color: "grey" }}>${(+order.subTotal).toFixed(2)}</Text></Price>
      </TotalContainer>
      <TotalContainer style={{ paddingRight: 25 }}>
        <Content ><Text style={{ color: "grey" }}>Discount:</Text></Content>
        <Price ><Text style={{ color: "grey" }}>-${(+order.discount).toFixed(2)}</Text></Price>
      </TotalContainer>
      <TotalContainer style={{ paddingRight: 25 }}>
        <Content ><Text style={{ color: "grey" }}>Shipping fee:</Text></Content>
        <Price ><Text style={{ color: "grey" }}>${(+order.shippingFee).toFixed(2)}</Text></Price>
      </TotalContainer>
      <TotalContainer style={{ paddingRight: 25 }}>
        <Content ><Text style={{ color: "grey" }}>Taxes:</Text></Content>
        <Price ><Text style={{ color: "grey" }}>${(+order.gst).toFixed(2)}</Text></Price>
      </TotalContainer>
      <TotalContainer style={{ paddingBottom: 20, paddingRight: 25 }}>
        <Content ><Text style={{ color: "black" }}>Total:</Text></Content>
        <Price ><Text style={{ color: "black" }}>${(+order.totalAmt).toFixed(2)}</Text></Price>
      </TotalContainer>
    </>
  )
};

const TotalContainer = styled.View`
  width: ${Platform.OS === "web" ? `100vw` : `null`};
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 900px;
  padding: 5px 25px 5px 25px;

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