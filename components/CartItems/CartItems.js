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
          <ItemsContainer>
            <Qty>
              <Text style={{color:"green"}}>{item.quantity}X</Text>
            </Qty>
            <Content>
            <Text style={{fontSize: 18}}>
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
  flex: 1;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 20px;
  margin-top: 15px;
  align-items: flex-end;
  width: ${Platform.OS === "web" ? `100vw` : `null`};
  max-width: 500px;
`;

const Qty = styled.View`
  flex: 1;
  margin-bottom: 2px;
`;
const Content = styled.View`
  flex: 10;
`;
const Price = styled.View`
  flex: 2;
  justify-content: flex-end;
  margin-bottom: 2px;
`;