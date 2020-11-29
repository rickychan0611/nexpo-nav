
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { Platform, Text, View, Dimensions } from "react-native";
import { Modal, Portal, TextInput, HelperText, Title, Button, Divider, Paragraph, Dialog } from 'react-native-paper';
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import BottomBar from "../components/BottomBar";
import CartCheckoutBar from "../components/CartCheckoutBar";
import { db, auth } from "../firebase";
import { ThemeContext } from "../context/ThemeContext";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import validator from 'validator';
import passwordValidator from 'password-validator';
import Loader from "../components/Loader";

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

export default function signUp() {
  const { navigate } = useRouting();
  const {  setSelected } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const vw = Dimensions.get('window').width;
  const vh = Dimensions.get('window').height;
  const [login, setLogin] = useState({ email: "", password: "", fristName: "", lastName: "" });
  const [errMsg, setErrMsg] = useState({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openEye, setOpenEye] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleChange = (name, value) => {
    setErrMsg({ email: "", password: "", fristName: "", lastName: "" })

    setLogin(prev => {
      return (
        { ...prev, [name]: value }
      )
    })
  }

  const emailLogin = () => {
    setErrMsg({ email: "", password: "", fristName: "", lastName: "" })

    let validate = new Promise((resolve, reject) => {
      if (validator.isEmpty(login.fristName)) {
        setErrMsg(prev => ({ ...prev, fristName: "Required. Please eneter an frist name." }))
        reject()
      }
      if (validator.isEmpty(login.lastName)) {
        setErrMsg(prev => ({ ...prev, lastName: "Required. Please eneter a last name." }))
        reject()
      }
      if (validator.isEmpty(login.email)) {
        setErrMsg(prev => ({ ...prev, email: "Required. Please eneter an email." }))
        reject()
      }
      if (validator.isEmpty(login.password)) {
        setErrMsg(prev => ({ ...prev, password: "Required. Please eneter a password." }))
        reject()
      }
      if (!validator.isEmail(login.email)) {
        setErrMsg(prev => ({ ...prev, email: "Email address is not valid" }))
        reject()
      }
      if (!schema.validate(login.password)) {
        setErrMsg(prev => ({ ...prev, password: "Must be at least 6 characters with 1 uppercase letter and 2 digits" }))
        reject()
      }
      else resolve()
    })

    validate.then(() => {
      setLoading(true)
      auth.createUserWithEmailAndPassword(login.email, login.password)
        .then((doc) => {
          auth.currentUser.sendEmailVerification({
            url: 'http://localhost:3000/cart'
            // url: 'http://localhost:3000/?email=' + auth.currentUser.email
          })
            .then(function () {
              db.collection("users").doc(doc.user.email).set({
                uid: doc.user.uid,
                email: doc.user.email,
                password: login.password
              })
                .then(() => {
                  setLoading(false)
                  showModal()
                })
                .catch(function (error) {
                  console.log(error)
                  setErrMsg(prev => ({ ...prev, password: error.message }))
                });
            })
            .catch(function (error) {
              setLoading(false)
              setErrMsg(prev => ({ ...prev, password: error.message }))
            });

        })
        .catch(function (error) {
          setLoading(false)
          // Handle Errors here.
          setLoading(false)
          setErrMsg(prev => ({ ...prev, password: error.message }))
          // ...
        });
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
          <Dialog.Title>Pease verify your email</Dialog.Title>
          <Dialog.Content>
            <Paragraph>You're almost there! We sent an email to {login.email}. </Paragraph>
            <Paragraph>Just click on the link in that email to complete your signup. </Paragraph>
          </Dialog.Content>
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
                setSelected("cart")
                navigate({
                  routeName: "cart"
                })
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
        <ScrollView>
          <View style={{
            flex: 1.2,
            flexDirection: "column",
            backgroundColor: 'white',
            justifyContent: "center",
            alignItems: "center",
          }}>
            <View style={{
              alignItems: "center",
              paddingTop: 20
            }}>

              <Title>Sign Up 註冊</Title>


              <InputView>
                <TextInput
                  label="Frist Name 名字*"
                  placeholder='Frist Name 名字'
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
                  value={login.fristName}
                  onChangeText={value => { handleChange("fristName", value) }}
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      console.log(e.key)
                      emailLogin()
                    }
                  }}
                  keyboardType="default"
                  error={errMsg.fristName}
                />
                <HelperText type="error" visible={errMsg.fristName}>
                  {errMsg.fristName}
                </HelperText>
              </InputView>

              <InputView>
                <TextInput
                  label="Last Name 姓氏*"
                  placeholder='Last Name 姓氏'
                  style={{
                    // backgroundColor: theme.InputBoxBackgroundColor,
                    // width: "100%",
                    width: Platform.OS === "web" ? "90vw" : vw - 60,
                    maxWidth: 400,
                    outline: "none",
                  }}
                  theme={{ colors: { primary: "grey" } }}
                  mode="outlined"
                  dense
                  value={login.lastName}
                  onChangeText={value => { handleChange("lastName", value) }}
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      console.log(e.key)
                      emailLogin()
                    }
                  }}
                  keyboardType="default"
                  error={errMsg.lastName}
                />
                <HelperText type="error" visible={errMsg.lastName}>
                  {errMsg.lastName}
                </HelperText>
              </InputView>

              <InputView>
                <TextInput
                  label="Email 電郵*"
                  placeholder='Email 電郵'
                  style={{
                    // backgroundColor: theme.InputBoxBackgroundColor,
                    // width: "100%",
                    width: Platform.OS === "web" ? "90vw" : vw - 60,
                    maxWidth: 400,
                    outline: "none",
                  }}
                  theme={{ colors: { primary: "grey" } }}
                  mode="outlined"
                  dense
                  value={login.email}
                  onChangeText={value => { handleChange("email", value) }}
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      console.log(e.key)
                      emailLogin()
                    }
                  }}
                  keyboardType="email-address"
                  error={errMsg.email}
                />
                <HelperText type="error" visible={errMsg.email}>
                  {errMsg.email}
                </HelperText>
              </InputView>

              <InputView>
                <TextInput
                  secureTextEntry={!openEye ? true : false}
                  label="Password 密碼*"
                  placeholder='Password 密碼'
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
                      console.log(e.key)
                      emailLogin()
                    }
                  }}
                  error={errMsg.password}
                />
                <HelperText type="error" visible={errMsg.password}>
                  {errMsg.password}
                </HelperText>
              </InputView>

              <Button contain color="white" style={{ backgroundColor: theme.black, marginBottom: 40 }}
                onPress={() => emailLogin()}>Submit 提交</Button>
              <Divider />
              <InputView>
              </InputView>
            </View>
            <View style={{ height: 100 }} />

          </View>
        </ScrollView>
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