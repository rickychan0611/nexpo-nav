
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { ThemeProvider, Button } from 'react-native-elements';
import { TextInput, Platform } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import BottomBar from "../components/BottomBar";
import CartCheckoutBar from "../components/CartCheckoutBar";
import { firebase, db, auth } from "../firebase";
import * as WebBrowser from 'expo-web-browser';
// import * as Facebook from 'expo-auth-session/providers/facebook';
// import { ResponseType } from 'expo-auth-session';
import * as Facebook from 'expo-facebook';


// WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { navigate } = useRouting();
  const { user, setUser, newOrderProductList } = useContext(Context);



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
  const onChangeText = (name, value) => {
    setLogin(prev => {
      return (
        { ...prev, [name]: value }
      )
    })
  }

  const emaillogin = () => {
    console.log(login)
    auth.createUserWithEmailAndPassword(login.email, login.password)
      .then((doc) => {
        const fff = { ...doc, admin: true }
        console.log('logging in... wait' + JSON.stringify(fff))
        db.collection("users").doc(doc.user.uid).set({
          uid: doc.user.uid,
          email: doc.user.email,
          isAdmin: true
        })
        .catch(function (error) {
          // Handle Errors here.
          console.log(error)
          // ...
        });
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log("error")
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

  const storeDB = () => {
    var citiesRef = db.collection("cities");

    citiesRef.doc("SF").set({
      name: "San Francisco", state: "CA", country: "USA",
      capital: false, population: 860000,
      regions: ["west_coast", "norcal"]
    });
    citiesRef.doc("LA").set({
      name: "Los Angeles", state: "CA", country: "USA",
      capital: false, population: 3900000,
      regions: ["west_coast", "socal"]
    });
    citiesRef.doc("DC").set({
      name: "Washington, D.C.", state: null, country: "USA",
      capital: true, population: 680000,
      regions: ["east_coast"]
    });
    citiesRef.doc("TOK").set({
      name: "Tokyo", state: null, country: "Japan",
      capital: true, population: 9000000,
      regions: ["kanto", "honshu"]
    });
    citiesRef.doc("BJ").set({
      name: "Beijing", state: null, country: "China",
      capital: true, population: 21500000,
      regions: ["jingjinji", "hebei"]
    });
  }

  const getDB = () => {
    console.log("pressed");
    var docRef = db.collection("cities").doc("SF");

    docRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
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
      <CartBarWrapper>

        <ContextArea>
          <MyText>Welcome, 🥳 {user && user.displayName} </MyText>
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
          />
        </ContextArea>
        {newOrderProductList.length > 0 ?
          <CartCheckoutBar />
          : null}
      </CartBarWrapper>
      <BottomBar />
    </>
  );
}

const Button1 = styled(Button)`
  margin-bottom: 5px;
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