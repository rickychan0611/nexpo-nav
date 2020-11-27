import React, { useContext, useState, useEffect } from "react";
import { Platform } from "react-native";
import { useRouting } from "expo-next-react-navigation";
import useQty from '../../hooks/useQty';
import { IconButton } from "react-native-paper";
import styled from 'styled-components/native';
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import { db } from "../../firebase";
import Loader from "../Loader";

export default function ComfirmOrderBar() {
  const { navigate } = useRouting();
  const [loading, setLoading] = useState(false);

  const { setSelected, total, user, shippingAddress, newOrderProductList, newOrderId, setNewOrderId } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const qty = useQty();

  const onOrderSubmit = () => {
    setLoading(true)

    const timestamp = new Date()

    const orderRef = db.collection("orders").doc()
    orderRef.set({
      orderId: orderRef.id,
      orderItems: newOrderProductList,
      shippingAddress,
      userId: user.email,
      createAt: timestamp,
    })
      .then(() => {
        setLoading(false)
        setNewOrderId(orderRef.id)
      })
      .catch(error => {
        setLoading(false)
        console.log(error)
      })

    if (shippingAddress.uid) {
      setLoading(true)
      const shippingAddressRef = db.collection("shippingAddresses").doc(shippingAddress.uid)
      shippingAddressRef.update({
        ...shippingAddress,
        createAt: timestamp,
        userId: user.email
      })
        .then(() => {
          setLoading(false)
          setSelected("confirmOrder")
          navigate({
            routeName: "confirmOrder",
          })
        })
        .catch(error => {
          setLoading(false)
          console.log(error)
        })
    }
    else if (!shippingAddresses.uid) {
      setLoading(true)
      const shippingAddressRef = db.collection("shippingAddresses").doc()
      shippingAddressRef.add({
        ...shippingAddress,
        uid: shippingAddressRef.id,
        createAt: timestamp,
        userId: user.email
      })
        .then(() => {
          setLoading(false)
          setSelected("confirmOrder")
          navigate({
            routeName: "confirmOrder",
          })
        })
        .catch(error => {
          setLoading(false)
          console.log(error)
        })
    }
  }

  useEffect(()=>{
    setLoading(false)
  },[])

  return (
    <>
      {loading && <Loader />}

      <Wrapper onPress={() => {
        if (user) {
          onOrderSubmit()
        }
        else {
          setSelected("login")
          navigate({
            routeName: "login",
          })
        }
      }}>
        <Bar theme={theme} >
          <IconButton icon="check" color="white" />
          <Total>
            Place Order
              </Total>
        </Bar>
      </Wrapper>
    </>
  )
};

const Total = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
const Qty = styled.Text`
  color: white;
  border-width: 1px;
  border-radius: 5px;
  border-color: white;
  padding: 4px;
  text-align: center;
  font-size: 13px;
  margin: 0 30px;
`;
const Bar = styled.View`
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
  background-color: ${props => props.cancel ? props.theme.black : props.theme.green}; 
  height: 40px;
  width: 90%;
  border-radius: 25px;
`;
const Wrapper = styled.TouchableOpacity`
  position: ${Platform.OS === "web" ? `fixed` : `absolute`};
  bottom: 68px;
  height: 55px;
  width: 100%;
  max-width: 500px;
  /* flex: 1; */
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;
