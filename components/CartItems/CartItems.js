import React, {useContext} from "react";
import { View, Text, Platform } from "react-native";
import styled from "styled-components/native";
import { Context } from "../../context/Context";
import { Divider } from  "react-native-paper";

export default function CartItems() {
  const {newOrderProductList} = useContext(Context);
  return (
      <>
      {newOrderProductList.map(item=>{
        return(
          <>
          <ItemsContainer key={item.uid}>
            <Qty>
              <Text style={{color:"green"}}>{item.quantity}X</Text>
            </Qty>
            <Content>
            <Text style={{fontSize: 16}}>
              {item.item.chineseName + " " + item.item.englishName}
              </Text>
            </Content>
            <Price>
            <Text style={{textAlign:"right"}}>${(+item.item.final_price).toFixed(2)}</Text>
            </Price>
          </ItemsContainer>
          <Divider />
          </>
        )
      })}
      </>
    )
};

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
  flex: 10;
  justify-content: center;
  align-items: flex-start;
`;
const Price = styled.View`
  flex: 2;
  justify-content: center;
  align-items: flex-end;
`;