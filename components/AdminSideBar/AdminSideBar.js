import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Context } from "../../context/Context";

export default function AdminSideBar({ data }) {

  const { setSelectedCat } = useContext(Context);

  return (
    <Container>
      <TouchableOpacity>
        <Name onPress={() => {
        }}>
          Dashboard
          </Name>
      </TouchableOpacity>

      <TouchableOpacity>

        <Name onPress={() => {
        }}>
          Add a product
          </Name>
      </TouchableOpacity>

      <TouchableOpacity>
        <Name onPress={() => {
        }}>
          Orders
          </Name>
      </TouchableOpacity>

      <TouchableOpacity>
        <Name onPress={() => {
        }}>
          Stats
          </Name>
      </TouchableOpacity>

      <TouchableOpacity>
        <Name onPress={() => {
        }}>
          Marketing
          </Name>
      </TouchableOpacity>

      <TouchableOpacity>
        <Name onPress={() => {
        }}>
          Settings
          </Name>
      </TouchableOpacity>
    </Container>
  )
};

const Container = styled.View`
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: flex-start;
`;
const Name = styled.Text`
      background-color: white;
      width: 100%;
      margin: 10px 0 10px 20px;

`;