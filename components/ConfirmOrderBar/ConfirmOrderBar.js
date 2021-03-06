import React, { useContext, useState, useEffect } from "react";
import { Platform } from "react-native";
import { useRouting } from "expo-next-react-navigation";
import useQty from '../../hooks/useQty';
import { IconButton, Portal, Dialog, Paragraph, Button } from "react-native-paper";
import styled from 'styled-components/native';
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import { db, database, functions } from "../../firebaseApp";
import Loader from "../Loader";
import moment, { now } from "moment";
import firebase from "firebase"

export default function ConfirmOrderBar() {
  const { navigate, goBack } = useRouting();
  const [loading, setLoading] = useState(false);


  const { setSelected, total, user,
    shippingAddress, newOrderProductList, setNewOrderProductList,
    paymentMethod, setNewOrderId } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const qty = useQty();

  //dailog
  const [showDialog, setShowDialog] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const hideDialog = () => setShowDialog(false)

  const onOrderSubmit = async () => {
    try {
      const shippingFee = total >= 60 ? 0 : 8
      const gst = +(((total + (total >= 60 ? 0 : 8)) * 0.05).toFixed(2))
      const totalAmt = +(((total + (total >= 60 ? 0 : 8)) * 1.05).toFixed(2))

      setLoading(true)
      const timestamp = new Date()
      let now = moment().format("YYMMDD")

      const increment = firebase.firestore.FieldValue.increment(1);
      const orderIdRef = db.collection('orderId').doc('orderId')
      await orderIdRef.update({ orderId: increment })
      const snapshot = await orderIdRef.get()
      const orderId = await snapshot.data().orderId
      setNewOrderId(now + "A" + orderId)
      if (paymentMethod === "credit") {

        // functions.useFunctionsEmulator('http://localhost:5001')
        const cardPayment = functions.httpsCallable('cardPayment')
        const paymentData = await cardPayment({
          amount: (+total * 1.15).toFixed(2),
          customer_code: user.defaultProfileId,
          email: user.email,
          orderId: now + "A" + orderId
        })
          .then((result) => {
            return result.data
          })
          .catch((err) => {
            throw err
          })

        if (paymentData && paymentData.approved === "1") {
         
          const orderRef = db.collection("orders").doc(now + "A" + orderId)
          await orderRef.set({
            paymentData,
            orderId: now + "A" + orderId,
            orderItems: newOrderProductList,
            shippingAddress,
            userId: user.email,
            createAt: timestamp,
            subTotal: total,
            gst,
            totalAmt,
            shippingFee,
            discount: 0, //discount
            status: "In Progress",
            paymentStatus: paymentData.message,
            index: orderId
          })
            .then(() => {
              // database.ref('stats/1111').update({ helkl })
              //   .catch((err) => {
              //     alert(err)
              //   })
              db.collection("users").doc(user.email).update({
                points: user.points + (total * 100)
              })
                .then(() => {
                  updateStats()
                  setLoading(false)
                  setNewOrderProductList([])
                  setSelected("orderSuccess")
                  navigate({
                    routeName: "orderSuccess",
                  })
                })
            })
            .catch(error => {
              setLoading(false)
              console.log(error)
              throw "Oops, something went wrong. Please try again."
            })
        }

        else {
          setLoading(false)
          throw paymentData.message
        }

      }

      else if (paymentMethod === "cash") {
        const orderRef = db.collection("orders").doc(now + "A" + orderId)
        await orderRef.set({
          "paymentData": {
            payment_method: "COD",
            message: 'Not Paid. Pay upon delivery',
            amount: (+total * 1.15).toFixed(2),
            order_number: now + "A" + orderId,
            approved: false
          },
          orderId: now + "A" + orderId,
          orderItems: newOrderProductList,
          shippingAddress,
          userId: user.email,
          createAt: timestamp,
          subTotal: total,
          gst,
          totalAmt,
          shippingFee,
          discount: 0,
          status: "In Progress",
          paymentStatus: 'Not Paid. Pay upon delivery',
          index: orderId
        })
          .then(() => {
            db.collection("users").doc(user.email).update({
              points: user.points + (total * 100)
            })
              .then(() => {
                updateStats() //update stats in database
                setNewOrderProductList([])
                setLoading(false)
                setSelected("orderSuccess")
                navigate({
                  routeName: "orderSuccess",
                })
              })
          })
          .catch(error => {
            setLoading(false)
            console.log(error)
            throw "Oops, something went wrong. Please try again."
          })

      }
    }
    catch (err) {
      console.log(err)
      setErrMsg(err + ". Please check your card and try again.")
      setLoading(false)
      setShowDialog(true)
    }
  }

  const updateStats = () => {
    const onUpdate = functions.httpsCallable('addTotalCounter')
    onUpdate({
      total: total,
      MM_YYYY: moment().format("MM_YYYY"),
      DD: moment().format("DD")
    })
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <>
      {loading && <Loader />}

      <Portal>
        <Dialog visible={showDialog} onDismiss={hideDialog}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{errMsg}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => goBack()}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

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
  max-width: 900px;
  /* flex: 1; */
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;
