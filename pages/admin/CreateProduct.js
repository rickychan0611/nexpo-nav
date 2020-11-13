
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import moment from "moment";
import { View, Platform, Image } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import validator from 'validator';
import { TextInputMask, MaskService } from 'react-native-masked-text'
import { Checkbox, Subheading, Button, TextInput, Divider, Title, Card, Headline, Badge } from 'react-native-paper';
import {storage} from '../../firebase';

import { db } from "../../firebase";
import ImageSwiper from "../../components/ImageSwiper";

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

export default function CreateProduct() {

  const [images, setImages] = useState(null);

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
    categories, setCategories
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

  // const images = [
  //   { url: 'https://www.adorama.com/alc/wp-content/uploads/2018/05/PRANA7.jpg' },
  //   { url: 'https://blog.depositphotos.com/wp-content/uploads/2017/01/Exquisite-Dishes-Interview-With-Food-Photographer-Natalia-Lisovskaya-5.jpg.webp' },
  //   { url: 'https://www.adorama.com/alc/wp-content/uploads/2018/05/PRANA7.jpg' }
  // ]

  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);


  const uploadImage = async image => {
    setUploading(true);
    setProgress(0);
    console.log('image', image.uri);
    const task = storage.ref(image.ref).putString(image.uri, 'data_url');

    task.on('state_changed', snap => {
      setProgress(Math.round(snap.bytesTransferred / snap.totalBytes) * 10000);
      console.log(progress)
    });

    try {
      const final = await task;
      console.log('final image', final);
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
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
      setImages(prev => {
        if (!prev) {
          return [{ url: result.uri }]
        }
        else return (
          [...prev, { url: result.uri }]
        )
      });

      let timestamp = moment().format('YYYYMMDDhhmmss');
      const final = {uri: result.uri, id: timestamp, ref: timestamp + '.jpeg'};
      // setFiles([...files, final]);
      uploadImage(final);

    }
  };

  
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

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button onPress={pickImage} mode="contained">Pick an image from camera roll</Button>
          {images && <Image source={{ uri: images[0] }} style={{ width: 200, height: 200 }} />}
        </View>


        {images && <ImageSwiper images={images} />}

        <AddImageContainer>

          <View>
            <AddedImage source={{ uri: images && images[0].url }} />
            <Badge style={{ position: "absolute", left: 40, top: -10 }}>X</Badge>
          </View>

          <View>
            <AddedImage source={require("../../public/plusButton.png")} />
            {/* <Badge style={{ position: "absolute", left: 40, top: -10 }}>X</Badge> */}
          </View>

        </AddImageContainer>
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
