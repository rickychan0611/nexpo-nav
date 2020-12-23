import React, { useContext, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Context } from "../../context/Context";
import { useRouting } from "expo-next-react-navigation";

export default function AdminSideBar({ data }) {
  const { navigate } = useRouting();

  const { productInitValue, setOpenWebAdminMenu, setProduct, setSelected } = useContext(Context);
  
  useEffect(()=>{
    setSelected("create-product")
  },[])

  return (
    <Container>
      <TouchableOpacity>
        <Name onPress={() => {
          setOpenWebAdminMenu(false)
        }}>
          Dashboard
          </Name>
      </TouchableOpacity>

      <TouchableOpacity>
        <Name onPress={() => {
          navigate({ routeName: "admin/orders" })
          setOpenWebAdminMenu(false)
        }}>
          Orders
          </Name>
      </TouchableOpacity>

      <TouchableOpacity>
        <Name onPress={() => {
          navigate({ routeName: "admin/store-listings" })
          setOpenWebAdminMenu(false)
        }}>
          Listings
          </Name>
      </TouchableOpacity>

      <TouchableOpacity>
        <Name onPress={() => {
          navigate({ routeName: "admin/create-product", params: {path: "create-product"} })
          setProduct(productInitValue)
          setOpenWebAdminMenu(false)
        }}>
          Add a product
          </Name>
      </TouchableOpacity>

      <TouchableOpacity>
        <Name onPress={() => {
          navigate({ routeName: "home" })
          setOpenWebAdminMenu(false)
        }}>
          Quit
          </Name>
      </TouchableOpacity>

      {/* <TouchableOpacity>
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
      </TouchableOpacity> */}
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
      /* background-color: white; */
      width: 100%;
      margin: 12px 0;
      font-size: 16px;
`;