
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { Platform, Image, View, Dimensions } from "react-native";
import { TextInput, HelperText, Title, Button, Divider, Caption } from 'react-native-paper';
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


// WebBrowser.maybeCompleteAuthSession();

export default function login() {
  const { navigate } = useRouting();
  const { user, setUser, selected, setSelected } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const vw = Dimensions.get('window').width;
  const vh = Dimensions.get('window').height;


  // const [request, response, promptAsync] = useAuthRequest({
  //   responseType: ResponseType.Token,
  //   clientId: '271243993866963',
  // });

  // React.useEffect(() => {
  //   if (response?.type === 'success') {
  //     const { access_token } = response.params;

  //     const credential = firebase.auth.FacebookAuthProvider.credential(access_token);
  //     // Sign in with the credential from the Facebook user.
  //     Firebase.auth().signInWithCredential(credential);
  //   }
  // }, [response]);



  const [login, setLogin] = useState({});

  const handleChange = (name, value) => {
    setLogin(prev => {
      return (
        { ...prev, [name]: value }
      )
    })
  }

  const emailLogin = () => {
    console.log(login)
    // auth.createUserWithEmailAndPassword(login.email, login.password)
    auth.signInWithEmailAndPassword(login.email, login.password)
      .then((doc) => {
        db.collection("users").doc(doc.user.email).set({
          uid: doc.user.uid,
          email: doc.user.email,
          password: login.password
        })
          .catch(function (error) {
            // Handle Errors here.
            console.log(error)
            // ...
          });
        setSelected("cart")
        navigate({
          routeName: "cart"
        })
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log("error", error)
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }

  const googlelogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      setUser(result.user)
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  async function loginWithFacebook() {

    //Facebook login with AAPP
    if (Platform.OS !== "web") {
      //I guess this have to change to APP
      await Facebook.initializeAsync({ appId: '271243993866963', appName: "tintin-store" });

      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });

      if (type === 'success') {
        // Build Firebase credential with the Facebook access token.
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        // Sign in with credential from the Facebook user.
        auth.signInWithCredential(credential)
          .then(function (result) {
            console.log(result)
            setUser(result.user)
          })
          .catch(error => {
            // Handle Errors here.
          });
      }
    }

    //Facebook login with WEB
    else {
      var provider = new firebase.auth.FacebookAuthProvider();

      auth.signInWithPopup(provider)
        .then(function (result) {
          var token = result.credential.accessToken;
          var user = result.user;
          setUser(result.user)
          // ...
        }).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    }
  }

  const facebookloginWEB = () => {
    var provider = new firebase.auth.FacebookAuthProvider();

    auth.signInWithPopup(provider)
      .then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        setUser(result.user)

        // ...
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
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

  return (
    <>
      <View style={{
        flex: 1,
        width: Platform.OS === "web" ? '100vw' : '100%',
        maxWidth: 500,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingBottom: 60
      }}>
        <View style={{ flex: 1.2 }}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover"
            }}
            source={poster} />
        </View>

        <View style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: 'white',
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Title>Sign In</Title>
          <InputView>
            <TextInput
              label="Email*"
              placeholder='Enter your email'
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
              value={login.email}
              onChangeText={value => { handleChange("email", value) }}
            // error={error.email}
            />
            {/* <HelperText type="error" visible={error.chineseName}>
          {error.email}
        </HelperText> */}
          </InputView>

          <InputView style={{ marginBottom: 30 }}>
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
            // error={error.password}
            />
            {/* <HelperText type="error" visible={error.password}>
          {error.password}
        </HelperText> */}
          </InputView>
          <Button contain color="white" style={{ backgroundColor: theme.black }}
            onPress={() => emailLogin()}>Submit</Button>
          <Divider />
          <InputView></InputView>
          <Caption>Forgot Password? | Don't have an account? Sign up</Caption>
          <InputView>
          </InputView>
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