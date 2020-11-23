
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { Platform, Text, View, Dimensions } from "react-native";
import { Modal, Portal, TextInput, HelperText, Title, Button, Divider, Caption, Dialog } from 'react-native-paper';
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import BottomBar from "../components/BottomBar";
import CartCheckoutBar from "../components/CartCheckoutBar";
import { firebase, db, auth } from "../firebase";
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
  const { user, setUser, selected, setSelected } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const vw = Dimensions.get('window').width;
  const vh = Dimensions.get('window').height;
  const [login, setLogin] = useState({ email: "", password: "" });
  const [errMsg, setErrMsg] = useState({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
    if (validator.isEmpty(login.email)) {
      setErrMsg(prev => ({ ...prev, email: "Required. Please eneter an email." }))
    }
    if (!validator.isEmail(login.email)) {
      setErrMsg(prev => ({ ...prev, email: "Email address is not valid" }))
    }
    if (validator.isEmpty(login.password)) {
      setErrMsg(prev => ({ ...prev, password: "Required. Please eneter a password." }))
    }
    // if (!schema.validate(login.password)) {
    //   setErrMsg(prev => ({ ...prev, password: "Must contain 6 characters with 1 uppercase letter and 2 digits" }))
    // }
    // auth.createUserWithEmailAndPassword(login.email, login.password)
    else {
      setLoading(true)
      auth.signInWithEmailAndPassword(login.email, login.password)
        .then((doc) => {
          db.collection("users").doc(doc.user.email).set({
            uid: doc.user.uid,
            email: doc.user.email,
            password: login.password
          })
            .then(() => {
              setLoading(false)
              showModal()
              setSelected("cart")
              navigate({
                routeName: "cart"
              })
            })
            .catch(function (error) {
              console.log(error)
              setErrMsg(prev => ({ ...prev, email: error }))
            });
        })
        .catch(function (error) {
          setLoading(false)
          // Handle Errors here.
          setLoading(false)
          setErrMsg(prev => ({ ...prev, email: error.message }))
          // ...
        });
    }
  }

  // const googlelogin = () => {
  //   var provider = new firebase.auth.GoogleAuthProvider();

  //   auth.signInWithPopup(provider).then(function (result) {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     var token = result.credential.accessToken;
  //     // The signed-in user info.
  //     var user = result.user;
  //     setUser(result.user)
  //     // ...
  //   }).catch(function (error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // The email of the user's account used.
  //     var email = error.email;
  //     // The firebase.auth.AuthCredential type that was used.
  //     var credential = error.credential;
  //     // ...
  //   });
  // }

  // async function loginWithFacebook() {

  //   //Facebook login with AAPP
  //   if (Platform.OS !== "web") {
  //     //I guess this have to change to APP
  //     await Facebook.initializeAsync({ appId: '271243993866963', appName: "tintin-store" });

  //     const { type, token } = await Facebook.logInWithReadPermissionsAsync({
  //       permissions: ['public_profile'],
  //     });

  //     if (type === 'success') {
  //       // Build Firebase credential with the Facebook access token.
  //       const credential = firebase.auth.FacebookAuthProvider.credential(token);

  //       // Sign in with credential from the Facebook user.
  //       auth.signInWithCredential(credential)
  //         .then(function (result) {
  //           console.log(result)
  //           setUser(result.user)
  //         })
  //         .catch(error => {
  //           // Handle Errors here.
  //         });
  //     }
  //   }

  //   //Facebook login with WEB
  //   else {
  //     var provider = new firebase.auth.FacebookAuthProvider();

  //     auth.signInWithPopup(provider)
  //       .then(function (result) {
  //         var token = result.credential.accessToken;
  //         var user = result.user;
  //         setUser(result.user)
  //         // ...
  //       }).catch(function (error) {
  //         // Handle Errors here.
  //         var errorCode = error.code;
  //         var errorMessage = error.message;
  //         // The email of the user's account used.
  //         var email = error.email;
  //         // The firebase.auth.AuthCredential type that was used.
  //         var credential = error.credential;
  //         // ...
  //       });
  //   }
  // }

  // const facebookloginWEB = () => {
  //   var provider = new firebase.auth.FacebookAuthProvider();

  //   auth.signInWithPopup(provider)
  //     .then(function (result) {
  //       var token = result.credential.accessToken;
  //       var user = result.user;
  //       setUser(result.user)

  //       // ...
  //     }).catch(function (error) {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       // The email of the user's account used.
  //       var email = error.email;
  //       // The firebase.auth.AuthCredential type that was used.
  //       var credential = error.credential;
  //       // ...
  //     });
  // }



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
    {loading && <Loader/>}
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
                hideModal()}}>
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
                icon="camera"
                  secureTextEntry={true}
                  label="Password*"
                  placeholder='Enter your password'
                  style={{
                    // backgroundColor: theme.InputBoxBackgroundColor,
                    // width: "100%",
                    width: Platform.OS === "web" ? "90vw" : vw - 60,
                    maxWidth: 400,
                    outline: "none"
                  }}
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
                onPress={() => emailLogin()}>Submit</Button>
              <Divider />
              <Link routeName="forgotPassword" style={{marginBottom: 20}}><Caption>Forgot Password?</Caption></Link>
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