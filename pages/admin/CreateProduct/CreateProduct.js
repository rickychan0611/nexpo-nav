
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../../context/Context";
import { ThemeContext } from "../../../context/ThemeContext";
import { ProductsContext } from "../../../context/ProductsContext";
import moment from "moment";
import { storage } from '../../../firebaseApp';
import * as ImageManipulator from 'expo-image-manipulator';
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import onCreateProductInputChange from "../../../hooks/onCreateProductInputChange";

import { View, Platform, Image, TouchableOpacity, Text } from "react-native";
import { IconButton, Checkbox, Subheading, Button, TextInput, Divider, Title, Card, Headline, HelperText, ProgressBar, Colors, Switch, Caption } from 'react-native-paper';

import InputFields from "./InputFields";

import { db } from "../../../firebaseApp";
import ImageSwiper from "../../../components/ImageSwiper";
import * as ImagePicker from 'expo-image-picker';
import Loader from "../../../components/Loader";

export default function CreateProduct() {

  const { navigate } = useRouting();
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [catErrMsg, setCatErrMsg] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const {
    images, setImages,
    swiperControl, setSwiperControl,
    selectedCategory, setSelectedCategory,
    product, setProduct, error,
    loading, setLoading
  } = useContext(Context);

  const { categories, setCategories, listenCategories } = useContext(ProductsContext)

  const ctx = useContext(Context);

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
      const catRef = db.collection("categories").doc()
      catRef.set({
        uid: catRef.id,
        chineseName: cat.chineseName.trim(),
        englishName: cat.englishName.trim(),
        position: 0
      })
        .then(() => {
          setCat({})
          setShowNewCategory(false)
          // setCategories(prev => {
          //   return [...prev, cat]
          // })
          setButtonDisabled(false)
        })
        .catch(err => {
          console.log(err)
          setButtonDisabled(false)
        })
    })
  }

  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const reSizeImage = async (image) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      image,
      [{ resize: { width: 800 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );
    return manipResult
  };

  const uploadImage = async imgData => {
    setProgress(0);
    let task;
    if (Platform.OS === 'web') {
      let base64 = imgData.base64
      task = storage.ref(imgData.ref).putString(imgData.uri, 'data_url')
    }
    else {
      const response = await fetch(imgData.uri)
      const blob = await response.blob()
      task = storage.ref(imgData.ref).put(blob, { contentType: 'image/jpeg' })
    }

    task.on('state_changed', snap => {
      setProgress(Math.round(snap.bytesTransferred / snap.totalBytes));
    });

    //get image URL
    await task
    let urlRef = storage.ref(imgData.ref)
    urlRef.getDownloadURL().then(function (downloadURL) {
      return downloadURL
    })
      .then((downloadURL) => {
        //store returned url in image array
        setImages(prev => {
          if (!prev) {
            return [{ url: downloadURL }]
          }
          else return (
            [...prev, { url: downloadURL }]
          )
        });

        setUploading(false);
        return;
      })
  };

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: .8,
    });

    if (!result.cancelled) {
      setUploading(true);

      const resizedImg = await reSizeImage(result.uri)

      let timestamp = moment().format('YYYYMMDDhhmmss');
      const imgData = { uri: resizedImg.uri, base64: resizedImg.base64, id: timestamp, ref: timestamp + '.jpg' };
      uploadImage(imgData);
    }
    else setUploading(false);
  };

  const deleteImage = async (url) => {
    setUploading(true)
    await setImages(prev => {
      return prev.filter(item => item.url !== url)
    })
    setUploading(false)
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);


  useEffect(() => {
    listenCategories()
    setImages()
    setSelectedCategory(["Others"])
  }, [])

  return (
    <>
      {loading && <Loader />}
      <Container>
        <Headline style={{ color: theme.titleColor }}>Add a product</Headline>
        <ImageSwiper images={images} uploading={uploading} />

        <AddImageContainer>
          {images && images[0] && images.map((image, index) => {
            return (
              <View key={image.url}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "red", width: 20, height: 20, top: 0, left: -10, zIndex: 1000,
                    justifyContent: "center", alignItems: "center", borderRadius: 50, posoition: "absolute"
                  }}
                  onPress={() => { deleteImage(image.url) }}>
                  <Text style={{ position: "absolute", color: "white" }}>X</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ posoition: "absolute", top: -10 }} onPress={() => { swiperControl.current.goTo(index) }}>
                  <AddedImage source={{ uri: image.url }} />
                </TouchableOpacity>
              </View>
            )
          })}

          <TouchableOpacity onPress={pickImage}>
            <AddedImage source={require("../../../public/plusButton.png")} />
          </TouchableOpacity>

        </AddImageContainer>
        {uploading && <ProgressBar progress={progress} color={Colors.red800} />}

        <Divider style={{ marginTop: 20, marginBottom: 20 }} />

        <Row>
          <Subheading>Activate</Subheading >
          <Switch value={product.activated} onValueChange={() => onCreateProductInputChange("activated", !product.activated, ctx)} />
        </Row>

        <Divider style={{ marginTop: 20, marginBottom: 20 }} />

        <Row>
          <Subheading>Feature Product</Subheading >
          <Switch value={product.featured} onValueChange={() => onCreateProductInputChange("featured", !product.featured, ctx)} />
        </Row>

        <Divider style={{ marginTop: 20, marginBottom: 20 }} />

        <InputFields />

        <Divider style={{ marginTop: 20, marginBottom: 20 }} />

        <View style={{
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Title styles={{ flex: 1, marginBottom: 130 }} >Category:</Title>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <IconButton icon={!showNewCategory ? "plus-circle" : "minus-circle"}
              onPress={() => setShowNewCategory(!showNewCategory)} />
          </View>
        </View>

        {/* <Subheading styles={{ marginBottom: 130 }} >Select at least one category or create one.</Subheading> */}
        <Text style={{ color: "red" }}>
          {error.category_err}
        </Text>

        {showNewCategory &&
          <>
            <Divider />
            <View style={{ height: 30 }}></View>
            <InputView>
              <TextInput
                label="請輸入中文類別名字*"
                placeholder='中文名字'
                style={{ backgroundColor: theme.InputBoxBackgroundColor }}
                theme={{ colors: { primary: "grey" } }}
                mode="outlined"
                dense
                value={cat.chineseName}
                onChangeText={value => { onAddCatChange("chineseName", value) }}
                error={catErrMsg.chineseName}
              />
              <HelperText type="error" visible={catErrMsg.chineseName}>
                {catErrMsg.chineseName}
              </HelperText>
            </InputView>
            <InputView>
              <TextInput
                label="English Name*"
                placeholder='English Name'
                style={{ backgroundColor: theme.InputBoxBackgroundColor }}
                theme={{ colors: { primary: "grey" } }}
                mode="outlined"
                dense
                value={cat.englishName}
                onChangeText={value => { onAddCatChange("englishName", value) }}
                error={catErrMsg.englishName}
              />
              <HelperText type="error" visible={catErrMsg.englishName}>
                {catErrMsg.englishName}
              </HelperText>
            </InputView>

            <Button icon="plus" mode="contained" color={theme.green}
              disabled={buttonDisabled}
              labelStyle={{ color: "white" }}
              onPress={() => onAddCategory()}>
              Add
            </Button>
            <View style={{ height: 30 }}></View>

          </>
        }
        <Divider />

        <View style={{ padding: 0, marginBottom: 20 }}>

          {categories && categories.map((category) => {
            // console.log(category)
            // const uid = category.chineseName + category.englishName
            const uid = category.uid
            return (
              <>
                {/* {category.uid !== "Others" && */}
                <View key={uid}>
                  <Checkbox.Item
                    label={category.chineseName + " / " + category.englishName}
                    labelStyle={{ color: theme.darkGrey }}
                    status={selectedCategory.indexOf(uid) === -1 ? "unchecked" : "checked"}

                    // check category and save the uid into an array
                    onPress={() => {
                      if (selectedCategory.indexOf(uid) === -1) {
                        setSelectedCategory(prev => [...prev, uid])
                      }
                      else {
                        let index = selectedCategory.indexOf(uid);
                        let arr = [...selectedCategory];
                        arr.splice(index, 1);
                        setSelectedCategory(arr)
                      }
                    }}
                  />
                </View>
                {/* } */}
              </>
            )
          })}
        </View>
        <View style={{ height: 150 }}></View>
      </Container>
    </>
  );
}

const Container = styled.ScrollView`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px 6px 10px 6px;
`;
const InputView = styled.View`
  margin-bottom: ${Platform.OS === "web" ? "15px" : 0};
`;
const MyCard = styled(Card)`
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.25);
`;
const AddImageContainer = styled.View`
  flex-direction: row;
  flex-flow: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const AddedImage = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  margin-bottom: 10px;
`;
const Row = styled.View`
 flex-direction: row;
 flex-wrap: nowrap;
 justify-content: space-between;
`;

