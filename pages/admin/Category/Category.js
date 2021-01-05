
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../../context/Context";
import { ThemeContext } from "../../../context/ThemeContext";
import { ProductsContext } from "../../../context/ProductsContext";
import moment from "moment";
import { storage } from '../../../firebaseApp';
import * as ImageManipulator from 'expo-image-manipulator';
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";

import { View, Platform, Image, TouchableOpacity, Text } from "react-native";
import {
  Surface, IconButton, Button, TextInput, Portal,
  Dialog, Card, Headline, HelperText, ProgressBar, Colors, Switch, Caption
} from 'react-native-paper';


import { db } from "../../../firebaseApp";

export default function Category() {

  const { theme } = useContext(ThemeContext);

  const [cat, setCat] = useState({});

  const onAddCatChange = (name, value) => {
    setCatErrMsg(prev => ({ ...prev, [name]: "" }))
    setCat(prev => ({ ...prev, [name]: value }))
  }

  const onAddCategory = () => {

    let validate = new Promise((resolve, reject) => {
      if (!cat.chineseName) {
        setCatErrMsg(prev => ({ ...prev, chineseName: "必須填寫" }))
        reject()
      }
      if (!cat.englishName) {
        setCatErrMsg(prev => ({ ...prev, englishName: "Required. Please enter a name." }))
        reject()
      }
      if (categories.some(obj => obj.chineseName.toLowerCase() === (cat.chineseName + "").toLowerCase().trim())) {
        setCatErrMsg(prev => ({ ...prev, chineseName: "名字已被用，請重新輸入." }))
        reject()
      }
      if (categories.some(obj => obj.englishName.toLowerCase() === (cat.englishName + "").toLowerCase().trim())) {
        setCatErrMsg(prev => ({ ...prev, englishName: "This name is taken. Please use another name." }))
        reject()
      }
      else resolve()
    })

    validate.then(() => {
      setButtonDisabled(true)
      const uid = cat.chineseName.trim() + cat.englishName.trim()
      db.collection("categories").doc(uid).set({
        uid,
        chineseName: cat.chineseName.trim(),
        englishName: cat.englishName.trim(),
        createAt: new Date(),
        productId: []
      })
        .then(() => {
          setCat({})
          setShowNewCategory(false)
          setCategories(prev => {
            return [...prev, cat]
          })
          setButtonDisabled(false)
        })
        .catch(err => {
          console.log(err)
          setButtonDisabled(false)
        })
    })
  }

  const onSave = () => {
    setLoading(true)
    console.log(selectedCategory)
    db.collection("categories").doc(selectedCategory.uid).update({
      chineseName: selectedCategory.chineseName,
      englishName: selectedCategory.englishName
    })
      .then(() => {
        setLoading(false)
        hideDialog()
      })
  }

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({})
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")

  const [showEditDialog, setShowEditDialog] = useState(false)
  const hideDialog = () => {
    setShowEditDialog(false)
  }

  const onCategoryChange = (name, value) => {
    setSelectedCategory(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    db.collection("categories").onSnapshot((snapshot) => {
      let tempArr = []
      snapshot.forEach((doc) => {
        tempArr.push(doc.data())
      })
      setCategories(tempArr)
    })
  }, []);


  return (
    <>
      <Portal>
        <Dialog visible={showEditDialog} onDismiss={hideDialog}>
          <Dialog.Title>{selectedCategory === {} ? "Edit" : "Add a new category"}</Dialog.Title>
          <Dialog.Content>
            <InputView>
              <TextInput
                label="Chinese Name*"
                placeholder='Chinese Name'
                theme={{ colors: { primary: "grey" } }}
                mode="outlined"
                dense
                value={selectedCategory.chineseName}
                onChangeText={value => { onCategoryChange("chineseName", value) }}
                error={error.chineseName}
              />
              <InputView>
                <View style={{ marginVertical: 10 }}></View>
                <TextInput
                  theme={{ colors: { primary: "grey" } }}
                  mode="outlined"
                  dense
                  label="English Name*"
                  placeholder='English Name'
                  value={selectedCategory.englishName}
                  onChangeText={value => { onCategoryChange("englishName", value) }}
                  error={error.englishName}
                />
                <HelperText type="error" visible={error.englishName}>
                  {error.englishName}
                </HelperText>
              </InputView>

              <HelperText type="error" visible={error.chineseName}>
                {error.chineseName}
              </HelperText>
            </InputView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => hideDialog()}>Cancel</Button>
            <Button loading={loading} onPress={() => onSave()}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Container>
        <Row >
          <Headline style={{ color: theme.titleColor }}>Edit Category</Headline>
          <View style={{ alignItems: "flex-end" }}>
            <IconButton icon="plus-circle"
              onPress={() => {
                setShowEditDialog(true)
                setSelectedCategory({})
              }} />
          </View>
        </Row>
        <CardsWrapper>

          {categories[0] && categories.map(category => {
            return (
              <Surface style={{
                paddingHorizontal: 4,
                height: 80,
                width: "100%",
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 4,
                marginBottom: 10
              }}>
                <View style={{
                  height: 80,
                  width: "100%",
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: "row",
                  flexWrap: "nowrap"
                }} >

                  <View style={{
                    flex: 4,
                    justifyContent: "flex-start",
                    paddingLeft: 10
                  }}>
                    <Text style={{ fontSize: 18, textAlign: "left" }}>{category.chineseName} / {category.englishName}</Text>
                  </View>

                  {category.uid !== "Others" &&
                    <View style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      alignItems: 'center',
                      flexDirection: "row",
                      flexWrap: "nowrap"
                    }}>
                      <IconButton icon="pencil"
                        onPress={() => {
                          setShowEditDialog(true)
                          setSelectedCategory(category)
                        }} />
                      <IconButton icon="close" />
                    </View>
                  }
                </View>

              </Surface>
            )
          })}
        </CardsWrapper >
      </Container >
    </>
  );
}

const Container = styled.ScrollView`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  height: ${Platform.OS === "web" ? "calc(100vh - 76px)" : "100%"};
  background-color: white;
`;

const CardsWrapper = styled.View`
  /* width: 100%; */
  /* margin: 10px; */
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 0px 10px 0px 10px ;
`;

const InputView = styled.View`
  margin-bottom: 30px
`;

const Row = styled.View`
 flex-direction: row;
 flex-wrap: nowrap;
 justify-content: space-between;
 align-items: center;
 max-width: 460px;
 padding: 0px 10px 0px 10px;
 margin-bottom: 10;
`;
