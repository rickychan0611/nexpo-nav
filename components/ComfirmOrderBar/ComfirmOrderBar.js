import React, { useContext, useState, useEffect } from "react";
import { Platform } from "react-native";
import { useRouting } from "expo-next-react-navigation";
import useQty from '../../hooks/useQty';
import { IconButton } from "react-native-paper";
import styled from 'styled-components/native';
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import { db, firebase } from "../../firebase";
import Loader from "../Loader";
import moment from "moment";

export default function ComfirmOrderBar() {
  const { navigate } = useRouting();
  const [loading, setLoading] = useState(false);

  const { setSelected, total, user,
    shippingAddress, newOrderProductList,
    setNewOrderId, newOrderId } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const qty = useQty();

  const onOrderSubmit = async () => {
    setLoading(true)

    const increment = firebase.firestore.FieldValue.increment(1);
    const orderIdRef = db.collection('orderId').doc('orderId')
    await orderIdRef.update({ orderId: increment })
    const snapshot = await orderIdRef.get()
    const orderId = snapshot.data().orderId
    setNewOrderId(moment().format("YYMMDD") + orderId)
    console.log("orderId: ", orderId)

    const timestamp = new Date()
    const orderRef = db.collection("orders").doc()
    await orderRef.set({
      orderId: newOrderId,
      orderItems: newOrderProductList,
      shippingAddress,
      userId: user.email,
      createAt: timestamp,
      total_amt: (+total * 1.15).toFixed(2),
      status: "Order in Proccess"
    })
      .catch(error => {
        setLoading(false)
        console.log(error)
      })

    //shipping address exist / update. 
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
          setSelected("orderSuccess")
          navigate({
            routeName: "orderSuccess",
          })
        })
        .catch(error => {
          setLoading(false)
          console.log(error)
        })
    }

    //create new shipping address. 
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
          setSelected("orderSuccess")
          navigate({
            routeName: "orderSuccess",
          })
        })
        .catch(error => {
          setLoading(false)
          console.log(error)
        })
    }

    //update user order time. 
    db.collection("users").doc(user.email).update({lastOrderAt: timestamp})

  }

  useEffect(() => {
    setLoading(false)
  }, [])

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
