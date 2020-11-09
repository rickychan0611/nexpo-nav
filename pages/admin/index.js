
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { ThemeProvider, Button } from 'react-native-elements';
import { TextInput, Text } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import BottomBar from "../../components/BottomBar";
import CartCheckoutBar from "../../components/CartCheckoutBar";
import {db, auth} from "../../firebase";

export default function admin() {

  const { navigate } = useRouting();
  const { user, setUser, newOrderProductList } = useContext(Context);

  const [login, setLogin] = useState({});
  const onChangeText = (name, value) => {
    setLogin(prev => {
      return (
        { ...prev, [name]: value }
      )
    })
  }

  const onSubmit = () => {
    console.log(login)
    // auth.signInWithEmailAndPassword(login.email, login.password)
    auth.signInWithEmailAndPassword("admin@admin.com", "112233")
      .then((doc) => {
        console.log('logging in... wait' + JSON.stringify(doc.user))
        db.collection("users").doc(doc.user.uid).get()
        .then(doc => {
          if (doc.data().isAdmin) {
            console.log(doc.data())
            setUser(doc.data())
            navigate({web:{path: "/admin/panel"}})
          }
        })
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log("error")
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }

  return (
    <>
        <ContextArea>
          <MyText>Admin Login </MyText>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 5 }}
            onChangeText={text => onChangeText("email", text)}
            value={login.email}
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 5 }}
            onChangeText={text => onChangeText("password", text)}
            value={login.password}
            name={"password"}
          />
          <Button
            title="submit"
            onPress={() =>
              onSubmit()
            }
          />
          <Button
            title="Sign out"
            onPress={() =>
              auth.signOut().then(function () {
                console.log("Sign-out successful")
                setUser("")
              }).catch(function (error) {
                // An error happened.
              })
            }
          />
        </ContextArea>
    </>
  );
}

const Button1 = styled.Button`
  margin: 15px;
  `;

const CartBarWrapper = styled.View`
      flex: 1;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      max-width: 500px;
      padding-bottom: 62px;
`;
const ContextArea = styled.View`
      flex: 1;
      align-items: center;
      background-color: white;
      width: 100%;
      max-width: 500px;
`;
const MyText = styled.Text`
      font-size: 20px;
      margin: 20px;
`;