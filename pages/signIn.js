
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { Platform, Text, View, Dimensions } from "react-native";
import { Modal, Portal, TextInput, HelperText, Title, Button, Divider, Caption, Dialog } from 'react-native-paper';
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import BottomBar from "../components/BottomBar";
import CartCheckoutBar from "../components/CartCheckoutBar";
import { firebase, db, auth } from "../firebaseApp";
import * as WebBrowser from 'expo-web-browser';
// import * as Facebook from 'expo-auth-session/providers/facebook';
// import { ResponseType } from 'expo-auth-session';
import * as Facebook from 'expo-facebook';
import poster from "../public/poster.jpeg"
import siginBanner from "../public/siginBanner.png"
import { ThemeContext } from "../context/ThemeContext";
import { ScrollView } from "react-native-gesture-handler";
import validator from 'validator';
import passwordValidator from 'password-validator';
import Loader from "../components/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';

var schema = new passwordValidator();
schema
  .is().min(6)                                    // Minimum length 8
  .is().max(100)                                  // Maximum length 100
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits(2)                                // Must have at least 2 digits
  .has().not().spaces()                           // Should not have spaces
// .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
// WebBrowser.maybeCompleteAuthSession();

export default function signIn() {
  const { navigate } = useRouting();
  const { authState, setSelected } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const vw = Dimensions.get('window').width;
  const vh = Dimensions.get('window').height;
  const [login, setLogin] = useState({ email: "", password: "" });
  const [errMsg, setErrMsg] = useState({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openEye, setOpenEye] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleChange = (name, value) => {
    setErrMsg({ email: "", password: "" })

    setLogin(prev => {
      return (
        { ...prev, [name]: value }
      )
    })
  }

  const emailLogin = () => {
    setErrMsg({ email: "", password: "" })
    let validate = new Promise((resolve, reject) => {

      if (validator.isEmpty(login.email)) {
        setErrMsg(prev => ({ ...prev, email: "Required. Please eneter an email." }))
        reject()
      }
      if (!validator.isEmail(login.email)) {
        setErrMsg(prev => ({ ...prev, email: "Email address is not valid" }))
        reject()
      }
      if (validator.isEmpty(login.password)) {
        setErrMsg(prev => ({ ...prev, password: "Required. Please eneter a password." }))
        reject()
      }
      else {
        resolve()
      }
    })
    validate.then(() => {
      setLoading(true)
      auth.signInWithEmailAndPassword(login.email, login.password)
        .then(() => {
          setLoading(false)
          showModal()
          setSelected("home")
          navigate({
            routeName: "home"
          })
        })
        .catch(function (error) {
          setLoading(false)
          // Handle Errors here.
          setLoading(false)
          setErrMsg(prev => ({ ...prev, email: error.message }))
        })
    })
  }

  useEffect(() => {
    if (Platform.OS !== 'web') {
      import("react-native").then((item) => {
        item.LogBox.ignoreAllLogs();
        // item.LogBox.ignoreLogs(['Setting a timer']);
        // item.LogBox.ignoreLogs(['StatusBarIOS']);
      });
    }
  }, []);

  useEffect(() => {
    if (Platform.OS !== "web") {
      WebBrowser.warmUpAsync()
    }

    return () => {
      if (Platform.OS !== "web") {
        WebBrowser.coolDownAsync();
      }

    };
  }, []);

  const containerStyle = {
    // backgroundColor: 'white', 
    padding: 20,
    width: "100%",
    height: "100%"
  };

  return (
    <>
      {loading && <Loader />}
      <Portal>
        <Dialog visible={visible} onDismiss={hideModal}>
          <Dialog.Title>Login Successful</Dialog.Title>
          <Dialog.Actions>
            <Button
              contained
              color="white"
              style={{
                backgroundColor: theme.black,
                borderWidth: 1,
                borderRadius: 25,
                width: 80,
                marginBottom: 10
              }}
              onPress={() => {
                hideModal()
              }}>
              OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View style={{
        flex: 1,
        width: Platform.OS === "web" ? '100vw' : '100%',
        maxWidth: 500,
        flexDirection: 'column',
        // flexWrap: 'wrap',
        justifyContent: 'flex-start',
        // alignItems: 'stretch',
        // paddingBottom: 60
      }}>
        <View style={{
          flex: 1.2,
          flexDirection: "column",
          backgroundColor: 'white',
          justifyContent: "center",
          alignItems: "center",
        }}>
          <ScrollView>
            <View style={{
              alignItems: "center",
              paddingTop: 20
            }}>
              <Title>Sign In </Title>
              <InputView>
                <TextInput
                  label="Email*"
                  placeholder='Enter your email'
                  style={{
                    // backgroundColor: theme.InputBoxBackgroundColor,
                    // width: "100%",
                    width: Platform.OS === "web" ? "90vw" : vw - 60,
                    maxWidth: 400,
                    outline: "none",
                    marginTop: 20
                  }}
                  theme={{ colors: { primary: "grey" } }}
                  mode="outlined"
                  dense
                  value={login.email}
                  onChangeText={value => { handleChange("email", value) }}
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      emailLogin()
                    }
                  }}
                  keyboardType="email-address"
                  type="email"
                  autocorrect="off"
                  autocapitalize="none"
                  error={errMsg.email}
                />
                <HelperText type="error" visible={errMsg.email} style={{ width: 320 }}>
                  {errMsg.email}
                </HelperText>
              </InputView>

              <InputView>
                <TextInput
                  secureTextEntry={!openEye ? true : false}
                  label="Password*"
                  placeholder='Enter your password'
                  style={{
                    // backgroundColor: theme.InputBoxBackgroundColor,
                    // width: "100%",
                    width: Platform.OS === "web" ? "90vw" : vw - 60,
                    maxWidth: 400,
                    outline: "none"
                  }}
                  right={
                    <TextInput.Icon
                      onPress={() => {
                        setOpenEye(!openEye)
                      }}
                      name={openEye ? "eye" : "eye-off"}
                    />
                  }
                  theme={{ colors: { primary: "grey" } }}
                  mode="outlined"
                  dense
                  value={login.password}
                  onChangeText={value => { handleChange("password", value) }}
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      emailLogin()
                    }
                  }}
                  error={errMsg.password}
                />
                <HelperText type="error" visible={errMsg.password} style={{ width: 320 }}>
                  {errMsg.password}
                </HelperText>
              </InputView>

              <Button contain color="white" style={{ backgroundColor: theme.black, marginBottom: 40 }}
                onPress={() => emailLogin()}>Submit</Button>
              <Divider />
              <Link routeName="forgotPassword" style={{ marginBottom: 20 }}><Caption>Forgot Password?</Caption></Link>
              <Link routeName="signUp"><Caption>Don't have an account? Sign up</Caption></Link>
              <InputView>
              </InputView>
            </View>
          </ScrollView>
        </View>
      </View>
      <BottomBar style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 10,
      }} />
    </>
  );
}

const Button1 = styled(Button)`
  margin-bottom: 5px;
  `;

const InputView = styled.View`
  margin-bottom: 15px;
`;