
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { Platform, Text, View, Dimensions } from "react-native";
import { Modal, Portal, TextInput, HelperText, Title, Button, Divider, Caption, ActivityIndicator } from 'react-native-paper';
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
  const [visible, setVisible] = React.useState(false);

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
      setErrMsg(prev => ({ ...prev, email: "Reqruied. Please eneter an email." }))
    }
    if (!validator.isEmail(login.email)) {
      setErrMsg(prev => ({ ...prev, email: "Email address is not valid" }))
    }
    if (validator.isEmpty(login.password)) {
      setErrMsg(prev => ({ ...prev, password: "Reqruied. Please eneter a password." }))
    }
    // if (!schema.validate(login.password)) {
    //   setErrMsg(prev => ({ ...prev, password: "Must contain 6 characters with 1 uppercase letter and 2 digits" }))
    // }
    // auth.createUserWithEmailAndPassword(login.email, login.password)
    else {
      showModal()
      auth.signInWithEmailAndPassword(login.email, login.password)
        .then((doc) => {
          db.collection("users").doc(doc.user.email).set({
            uid: doc.user.uid,
            email: doc.user.email,
            password: login.password
          })
            .then(() => {
              hideModal()
              setSelected("cart")
              navigate({
                routeName: "cart"
              })
            })
            .catch(function (error) {
              hideModal()
              console.log(error)
              setErrMsg(prev => ({ ...prev, email: error }))
            });
        })
        .catch(function (error) {
          // Handle Errors here.
          hideModal()
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
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <ActivityIndicator size="large" color="white"/>
        </Modal>
      </Portal>

      <View style={{
        flex: 1,
        width: Platform.OS === "web" ? '100vw' : '100%',
        maxWidth: 500,
        flexDirection: 'column',
        // flexWrap: 'wrap',
        justifyContent: 'flex-start',
        // alignItems: 'stretch',
        paddingBottom: 60
      }}>
        {/* <View style={{ flex: 1 }}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover"
            }}
            source={poster} />
        </View> */}

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
              <InputView style={{ paddingLeft: 30, paddingRight: 30 }}>
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

              <InputView style={{ marginBottom: 30, paddingLeft: 30, paddingRight: 30 }}>
                <TextInput
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

              <Button contain color="white" style={{ backgroundColor: theme.black }}
                onPress={() => emailLogin()}>Submit</Button>
              <Divider />
              <InputView></InputView>
              <Caption>Forgot Password?</Caption>
              <Link routeName="signUp"><Caption>Don't have an account? Sign up</Caption></Link>
              <InputView>
              </InputView>
            </View>
          </ScrollView>
        </View>
      </View>

      {/* <ContextArea> */}
      {/* <View style={{
        flex: 1,
        width: Platform.OS === "web" ? '100vw' : '100%',
        // height: 500,
        justifyContent: "flex-start",
        alignItems: "center"
      }}>
        <Image
          style={{
            // width: Platform.OS === "web" ? '100vw' : '100%',
            width: "100%",
            // maxWidth: 100,
            height: 500,
            resizeMode: "contain"
            // height: "100%"
          }}
          source={poster} />
      </View> */}
      {/* <CartBarWrapper> */}
      {/* </CartBarWrapper> */}
      {/* <MyText>Welcome, 🥳 {user && user.displayName} </MyText>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeText("email", text)}
            value={login.email}
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeText("password", text)}
            value={login.password}
            name={"password"}
          />
          <Button1
            title="submit"
            onPress={() =>
              emaillogin()
            }
          />
          <Button1
            title="facebook Login"
            onPress={() =>
              loginWithFacebook()
            }
          />
          <Button1
            title="google Login"
            onPress={() =>
              googlelogin()
            }
          />
          <Button1
            title="facebook Login"
            onPress={() =>
              loginWithFacebook()
            }
          />
          <Button1
            title="Sign out"
            onPress={() =>
              auth.signOut().then(function () {
                console.log("Sign-out successful")
                setUser("")
              }).catch(function (error) {
                // An error happened.
              })
            }
          /> */}
      {/* </ContextArea> */}
      {/* {newOrderProductList.length > 0 ?
          <CartCheckoutBar />
          : null}
      </CartBarWrapper> */}
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