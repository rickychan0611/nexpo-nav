
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../../context/Context";
import { ThemeContext } from "../../../context/ThemeContext";
import { ProductsContext } from "../../../context/ProductsContext";
import moment from "moment";
import { storage } from '../../../firebaseApp';
import * as ImageManipulator from 'expo-image-manipulator';
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import arrayMove from 'array-move';
import { View, Platform, Image, TouchableOpacity, Text } from "react-native";
import {
  Surface, IconButton, Button, TextInput, Portal,
  Dialog, Card, Headline, HelperText, ProgressBar, Colors, Switch, Caption
} from 'react-native-paper';
import { db } from "../../../firebaseApp";
export const firebase = require("firebase");

export default function Category() {

  const { theme } = useContext(ThemeContext);

  const [cat, setCat] = useState({});
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({})
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")
  const [isNew, setIsNew] = useState(false)

  const [showEditDialog, setShowEditDialog] = useState(false)
  const hideDialog = () => {
    setShowEditDialog(false)
    setIsNew(false)
  }

  const onCategoryChange = (name, value) => {
    setSelectedCategory(prev => ({ ...prev, [name]: value }))
  }

  const onSave = () => {

    let validate = new Promise((resolve, reject) => {
      if (!selectedCategory.chineseName) {
        setError(prev => ({ ...prev, chineseName: "必須填寫" }))
        reject()
      }
      if (!selectedCategory.englishName) {
        setError(prev => ({ ...prev, englishName: "Required. Please enter a name." }))
        reject()
      }
      if (!selectedCategory.position) {
        setError(prev => ({ ...prev, position: "Required." }))
        reject()
      }
      if (selectedCategory.position <= 0) {
        setError(prev => ({ ...prev, position: "Value has to be greater than zero" }))
        reject()
      }
      else resolve()
    })

    validate.then(async () => {
      let TempArr = categories
      setLoading(true)
      console.log(TempArr)

      if (isNew) {
        const res = db.collection("categories").doc()
        TempArr.unshift({ ...selectedCategory, uid: res.id, index: categories.length })
        console.log(TempArr)
        // await res.set({ ...selectedCategory, uid: res.id })
      }
      else if (!isNew) {
        TempArr[selectedCategory.index] = selectedCategory //update the updated element
      }
      console.log(TempArr)

      let reSortedTempArr = arrayMove(TempArr, selectedCategory.index, selectedCategory.position - 1) //arrayMove(array, from, to)
      console.log(reSortedTempArr)
      console.log("reSortedCatTempArr", reSortedTempArr)

      for (let i = 0; i < reSortedTempArr.length; i++) {
        reSortedTempArr[i].position = i + 1
      }

      await Promise.all( //update database
        reSortedTempArr.map(async (category, index) => {
          console.log(category)

          return await db.collection("categories").doc(category.uid).set(category)
        })
      )
      setLoading(false)
      setIsNew(false)
      hideDialog()
    })
  }

  const handleDelete = (categoryWillDelete) => {
    // move all product ids in categories db collection
    console.log(categoryWillDelete)

    const othersIndex = categories.findIndex(category => {
      return category.uid === "Others"
    })
    console.log(othersIndex)

    const deleteIndex = categories.findIndex(category => {
      return category.uid === categoryWillDelete.uid
    })
    console.log(deleteIndex)

    const combine = [...categories[othersIndex].productId, ...categories[deleteIndex].productId]
    const uniq = [...new Set(combine)];
    console.log(uniq)
    db.collection("categories").doc("mogZUvJlGmFETuTEscDU").update({ productId: uniq })

    // update category for all products. Put "Others" in their category array
    Promise.all(
      categoryWillDelete.productId[0] && categoryWillDelete.productId.map(async (uid) => {
        return await db.collection("products").doc(uid).update({ category: firebase.firestore.FieldValue.arrayUnion("Others") })
      })
    )

    // db.collection("categories").doc(category.uid).delete()
  }

  useEffect(() => {
    db.collection("categories").onSnapshot((snapshot) => {
      let tempArr = []
      snapshot.forEach((doc) => {
        tempArr.push(doc.data())
      })
      tempArr.sort((a, b) => {
        return a.position - b.position
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
            {selectedCategory.uid !== "Others" && <>
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
                <HelperText type="error" visible={error.chineseName}>
                  {error.chineseName}
                </HelperText>
              </InputView>

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
            </>}
            {!isNew &&
              <InputView>
                <View style={{ marginVertical: 10 }}></View>
                <TextInput
                  theme={{ colors: { primary: "grey" } }}
                  mode="outlined"
                  dense
                  label="Position*"
                  placeholder='Position'
                  value={selectedCategory.position}
                  onChangeText={value => { onCategoryChange("position", value) }}
                  error={error.position}
                />
                <HelperText type="error" visible={error.position}>
                  {error.position}
                </HelperText>
              </InputView>
            }
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
                setIsNew(true)
                setSelectedCategory({ position: 1 })
              }} />
          </View>
        </Row>
        <CardsWrapper>

          {categories[0] && categories.map((category, index) => {
            return (
              <Surface style={{
                paddingHorizontal: 4,
                height: 80,
                width: "100%",
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 4,
                marginBottom: 10,
                borderWidth: 1,
                borderColor: theme.lightGrey,
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
                    <Text style={{ fontSize: 18, textAlign: "left" }}>{category.position + ". " + category.chineseName} / {category.englishName}</Text>
                  </View>

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
                        setError("")
                        setSelectedCategory({ ...category, index })
                      }} />
                    {category.uid !== "Others" &&
                      <IconButton icon="close"
                        onPress={() => {
                          handleDelete(category)
                        }} />
                    }
                  </View>
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
  margin-bottom: 10px
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
