import React, { useContext } from "react";
import { View, Text, Platform, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Context } from "../../context/Context";
import { Divider } from "react-native-paper";
import { Link, useRouting } from "expo-next-react-navigation";

export default function CartItems() {
  const { newOrderProductList, setSelectedItem } = useContext(Context);
  const { navigate } = useRouting();

  return (
    <>
      {newOrderProductList.map((item, index) => {
        return (
          <TouchableOpacity key={index}
            onPress={() => {
              setSelectedItem(item.item)
              navigate({
                routeName: "product",
                params: { id: item.item.uid },
                web: { as: `/product?id=${item.item.uid}` },
              })
            }}>
            <ItemsContainer key={item.uid}>
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
          </TouchableOpacity>
        )
      })}
    </>
  )
};

const ItemsContainer = styled.View`
  width: ${Platform.OS === "web" ? `100vw` : `null`};
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 900px;
  padding: 15px 30px 15px 25px;
`;

const Qty = styled.View`
  flex: 2;
  justify-content: center;
  align-items: flex-start;
`;
const Content = styled.View`
  flex: 18;
  justify-content: center;
  align-items: flex-start;
`;
const Price = styled.View`
  flex: 6;
  justify-content: center;
  align-items: flex-end;
`;