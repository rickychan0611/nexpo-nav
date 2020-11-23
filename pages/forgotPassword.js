
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { Platform, Text, View, Dimensions } from "react-native";
import { Modal, Portal, TextInput, HelperText, Title, Button, Divider, Caption, Dialog, Paragraph } from 'react-native-paper';
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

export default function forgotPassword() {
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

  const passwordReset = () => {

    setErrMsg({ email: "", password: "" })
    if (validator.isEmpty(login.email)) {
      setErrMsg(prev => ({ ...prev, email: "Required. Please eneter an email." }))
    }
    if (!validator.isEmail(login.email)) {
      setErrMsg(prev => ({ ...prev, email: "Email address is not valid" }))
    }
    // if (!schema.validate(login.password)) {
    //   setErrMsg(prev => ({ ...prev, password: "Must contain 6 characters with 1 uppercase letter and 2 digits" }))
    // }
    // auth.createUserWithEmailAndPassword(login.email, login.password)
    else {
      setLoading(true)
      auth.sendPasswordResetEmail(login.email)
        .then((doc) => {
          setLoading(false)
          showModal()
          console.log('Password reset email sent successfully')
        })
        .catch(function (error) {
          // Handle Errors here.
          hideModal()
          setLoading(false)
          setErrMsg(prev => ({ ...prev, email: error.message }))
          // ...
        });
    }
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
    backgroundColor: 'white',
    padding: 20,
  };

  return (
    <>
      {loading && <Loader />}

      <Portal>
        <Dialog visible={visible} onDismiss={hideModal}>
          <Dialog.Title>Password reset email sent</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Please check email and click on the URL provided to reset your password.</Paragraph>
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
                navigate({
                routeName: "login"
              })}}>
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
        paddingBottom: 60
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
              <Title>Reset password</Title>
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
                      passwordReset()
                    }
                  }}
                  keyboardType="email-address"
                  error={errMsg.email}
                />
                <HelperText type="error" visible={errMsg.email}>
                  {errMsg.email}
                </HelperText>
              </InputView>

              <Button contain color="white" style={{ backgroundColor: theme.black, marginBottom: 30 }}
                onPress={() => passwordReset()}>Submit</Button>
              <Divider />
              <InputView></InputView>
              <Link routeName="login"  style={{marginBottom: 20}}><Caption>Go back to login</Caption></Link>
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