
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import moment from "moment";
import { View, Platform, Image, TouchableOpacity, Text } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import validator from 'validator';
import { TextInputMask, MaskService } from 'react-native-masked-text'
import { Checkbox, Subheading, Button, TextInput, Divider, Title, Card, Headline, Badge, ProgressBar, Colors } from 'react-native-paper';
import { storage } from '../../firebase';
import * as ImageManipulator from 'expo-image-manipulator';

import { db } from "../../firebase";
import ImageSwiper from "../../components/ImageSwiper";

import * as ImagePicker from 'expo-image-picker';

export default function CreateProduct() {

  const { navigate } = useRouting();
  const [selectedCategory, setSelectedCategory] = useState([]);

  const init = {
    uid: "",
    createAt: "",
    chineseName: "",
    englishName: "",
    price: "",
    qty: "",
    unit: "",
    description: "",
    category: [],
  }

  const {
    categories, setCategories,
    images, setImages,
    swiperControl, setSwiperControl
  } = useContext(Context);

  const { theme } = useContext(ThemeContext);

  const outline = Platform.OS === 'web' ? { outline: "none" } : null;
  const [product, setProduct] = useState(init);
  // const [categories, setCategories] = useState([]);

  const handleChange = (name, value) => {
    if (name === "price") {
      var t = value;
      value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;
    }

    setProduct(prev => {
      return { ...prev, [name]: value }
    })
  };

  const onSubmit = () => {
    const productRef = db.collection("products").doc()
    const timestamp = new Date()
    product.price = MaskService.toRawValue('money', product.price)
    product.category = selectedCategory
    console.log(product)

    productRef.set({
      ...product,
      uid: productRef.id,
      createAt: timestamp,
    })
      .then(() => {
        setProduct(init)
        setSelectedCategory([])
      })
      .catch(error => console.log(error))
  }

  const [cat, setCat] = useState("");
  const onAddCatChange = (value) => {
    setCat(value)
  }

  const onAddCategory = () => {
    setCategories(prev => {
      return [...prev, cat]
    })
    db.collection("categories").doc(cat).set({
      englishName: cat,
      createAt: new Date()
    })
  }

  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const reSizeImage = async (image) => {
    console.log("resize run!")
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
      console.log(base64)
      task = storage.ref(imgData.ref).putString(imgData.uri, 'data_url')
    }
    else {
      console.log("uri", imgData.uri)
      const response = await fetch(imgData.uri)
      const blob = await response.blob()
      task = storage.ref(imgData.ref).put(blob, {contentType: 'image/jpeg'})
    }

    task.on('state_changed', snap => {
      setProgress(Math.round(snap.bytesTransferred / snap.totalBytes));
      console.log("snap", progress)
    });

    //get image URL
    await task
    let urlRef = storage.ref(imgData.ref)
    urlRef.getDownloadURL().then(function (downloadURL) {
      return downloadURL
    })
      .then((downloadURL) => {
        console.log('PickFile PROFILE PIC load ' + downloadURL)

        //store returned url in image array
        setImages(prev => {
          console.log("run???")
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

    // console.log(result);

    if (!result.cancelled) {
      setUploading(true);

      const resizedImg = await reSizeImage(result.uri)

      let timestamp = moment().format('YYYYMMDDhhmmss');
      const imgData = { uri: resizedImg.uri, base64: resizedImg.base64, id: timestamp, ref: timestamp + '.jpg' };
      uploadImage(imgData);
    }
    else setUploading(false);
  };

  useEffect(() => {
    console.log(images)
  }, [images])

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

  return (
    <>
      <Container>
        <Headline style={{ color: theme.titleColor }}>Add a product</Headline>
        <ImageSwiper images={images} uploading={uploading} />

        <AddImageContainer>
          {images && images[0] && images.map((image, index) => {
            return (
              <View key={image.url}>
                <TouchableOpacity 
                style={{backgroundColor: "red", width: 20, height: 20, top: 0, left: -10, zIndex: 1000,
              justifyContent: "center", alignItems: "center", borderRadius: 50, posoition: "absolute" }} 
                onPress={() => { deleteImage(image.url) }}>
                  <Text style={{ position: "absolute", color: "white"}}>X</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{posoition: "absolute", top: -10}} onPress={() => { swiperControl.current.goTo(index) }}>
                  <AddedImage source={{ uri: image.url }} />
                </TouchableOpacity>
            </View>
            )
          })}

          <TouchableOpacity onPress={pickImage}>
            <AddedImage source={require("../../public/plusButton.png")} />
          </TouchableOpacity>

        </AddImageContainer>
        {uploading && <ProgressBar progress={progress} color={Colors.red800} />}

        <MyCard style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.4,
          shadowRadius: 5,
          elevation: 5,
        }}>
          <Card.Content>
            <Input
              style={{
                backgroundColor: theme.InputBoxBackgroundColor,
                outline: "none"
              }}
              theme={{ colors: { primary: "grey" } }}
              mode="outlined"
              dense
              label="Chinese Name"
              placeholder='Chinese Name'
              value={product.chineseName}
              onChangeText={value => { handleChange("chineseName", value) }}
            />
            <Input
              style={{ backgroundColor: theme.InputBoxBackgroundColor }}
              theme={{ colors: { primary: "grey" } }}
              mode="outlined"
              dense
              label="English Name"
              placeholder='English Name'
              value={product.englishName}
              onChangeText={value => { handleChange("englishName", value) }}
            />
            <Input
              style={{ backgroundColor: theme.InputBoxBackgroundColor }}
              theme={{ colors: { primary: "grey" } }}
              mode="outlined"
              dense
              label="Quantity"
              placeholder='Quantity'
              value={product.qty}
              keyboardType="number-pad"
              onChangeText={value => {
                if (!value || validator.isInt(value)) {
                  handleChange("qty", value)
                }
              }
              }
            />
            <Input
              style={{ backgroundColor: theme.InputBoxBackgroundColor }}
              theme={{ colors: { primary: "grey" } }}
              mode="outlined"
              label="Unit"
              dense
              placeholder='Unit'
              value={product.unit}
              keyboardType="number-pad"
              onChangeText={value => { handleChange("unit", value) }}
            />
            <Input
              style={{ flex: 20, backgroundColor: theme.InputBoxBackgroundColor }}
              theme={{ colors: { primary: "grey" } }}
              left={
                <TextInput.Icon
                  name="currency-usd" // where <Icon /> is any component from vector-icons or anything else
                />
              }
              mode="outlined"
              dense
              label="Price"
              placeholder='Price'
              value={product.price}
              keyboardType="decimal-pad"
              onChangeText={value => {
                if (!value || validator.isFloat(value)) {
                  handleChange("price", value)
                }
              }
              }
            />

            <Input
              style={{ backgroundColor: theme.InputBoxBackgroundColor }}
              theme={{ colors: { primary: "grey" } }}
              mode="outlined"
              dense
              multiline
              numberOfLines={3}
              theme={{ colors: { primary: "grey" } }}
              label="Description"
              placeholder='Description'
              value={product.description}
              onChangeText={value => { handleChange("description", value) }}
            />
            <Subheading>Categories:</Subheading>
            <View style={{ padding: 0, marginBottom: 20 }}>

              {categories && categories.map((item) => {
                return (
                  <>
                    <Checkbox.Item label={item} status={selectedCategory.indexOf(item) === -1 ? "unchecked" : "checked"}
                      onPress={() => {
                        if (selectedCategory.indexOf(item) === -1) {
                          setSelectedCategory(prev => [...prev, item])
                        }
                        else {
                          let index = selectedCategory.indexOf(item);
                          let arr = [...selectedCategory];
                          arr.splice(index, 1);
                          setSelectedCategory(arr)
                        }
                      }}
                    />
                  </>
                )
              })}
              <Input
                style={{ backgroundColor: theme.InputBoxBackgroundColor }}
                theme={{ colors: { primary: "grey" } }}
                mode="outlined"
                dense
                label="Add new Category"
                placeholder='Category Name'
                value={cat}
                onChangeText={value => { onAddCatChange(value) }}
              />
              <Button onPress={() => onAddCategory()}>+ Add a Category</Button>
            </View>
            <Divider />
            <Button icon="check" mode="contained" onPress={() => onSubmit()}>
              Submit
          </Button>
          </Card.Content>
        </MyCard>
      </Container>
    </>
  );
}

const Container = styled.View`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px 6px 10px 6px;
`;

const Input = styled(TextInput)`
  margin-bottom: 25px;
`;
const ScrollView = styled.ScrollView`
  height: 100%;
  width: 100%;
`;
const Header = styled(Title)`
   margin-top: 25px;
   margin-bottom: 20px;
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
const PlusButton = styled.Image`
flex: 1;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;
