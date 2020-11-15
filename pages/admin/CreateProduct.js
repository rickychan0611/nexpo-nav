
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import moment from "moment";
import { storage } from '../../firebase';
import * as ImageManipulator from 'expo-image-manipulator';
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import validator from 'validator';

import { View, Platform, Image, TouchableOpacity, Text } from "react-native";
import { Checkbox, Subheading, Button, TextInput, Divider, Title, Card, Headline, HelperText, ProgressBar, Colors } from 'react-native-paper';

import { db } from "../../firebase";
import ImageSwiper from "../../components/ImageSwiper";
import * as ImagePicker from 'expo-image-picker';


export default function CreateProduct() {

  const { navigate } = useRouting();
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [catErrMsg, setCatErrMsg] = useState("");
  const [englishNameErr, setEnglishNameErr] = useState("eorr");
  const [chineseNameErr, setChineseNameErr] = useState("");
  const [qtyErr, setQtyErr] = useState("");
  const [unitErr, setUnitErr] = useState("");
  const [priceErr, setPriceErr] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");
  const [discount_amt_err, setDiscount_amt_err] = useState("");
  const [discount_precent_err, setDiscount_precent_err] = useState("");
  const [original_price_err, setOriginal_price_err] = useState("");

  const {
    categories, setCategories,
    images, setImages,
    swiperControl, setSwiperControl,
    selectedCategory, setSelectedCategory,
    product, setProduct
  } = useContext(Context);

  const { theme } = useContext(ThemeContext);
  let final_price = 0;

  const handleChange = (name, value) => {

    if (name === "original_price") {
      setOriginal_price_err("")
      setDiscount_amt_err("")
      setDiscount_precent_err("")
      setProduct(prev => {
        return { ...prev, discount_precent: "0", discount_amt: "0" }
      })

      var t = value;
      value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;

      setProduct(prev => {
        return { ...prev, [name]: value, final_price: value }
      })
    }

    else if (name === "discount_amt") {
      if (+value <= +product.original_price && +value >= 0) {
        setDiscount_amt_err("")

        var t = value;
        value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;
        final_price = +product.original_price - +value
        let discount_precent = ((+value / +product.original_price) * 100).toFixed(0)

        setProduct(prev => {
          return { ...prev, [name]: value, final_price, discount_precent }
        })
      }

      if (+value > +product.original_price) {
        setDiscount_amt_err("Cannot be greater than original price")
      }
      if (+value < 0) {
        setDiscount_amt_err("Cannot be smaller than zero")
      }
      if (!product.original_price) {
        setDiscount_amt_err("Please enter the original price 1st.")
        setOriginal_price_err("Price cannot be empty.")
      }
    }

    else if (name === "discount_precent") {
      if (+value <= 100 && +value >= 0) {
        setDiscount_precent_err("")

        var t = value;
        value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 0)) : t;
        final_price = +product.original_price - (+product.original_price * +value / 100)
        let discount_amt = ((+product.original_price * +value) / 100).toFixed(2)

        setProduct(prev => {
          return { ...prev, [name]: value, final_price, discount_amt }
        })
      }

      if (+value > 100) {
        setDiscount_precent_err("Cannot be greater than 100%")
      }
      if (+value < 0) {
        setDiscount_precent_err("Cannot be smaller than zero")
      }
      if (!product.original_price) {
        setDiscount_precent_err("Please enter the original price 1st.")
        setOriginal_price_err("Price cannot be empty.")
      }
    }


    else setProduct(prev => {
      return { ...prev, [name]: value }
    })
  };

  useEffect(() => {
    // setTimeout(()=>{
    setProduct(prev => prev)
    console.log(product)
    // },[500])
  }, [product])
  // const onCreateProductSubmit = () => {
  //   console.log("Clicked")
  //   const productRef = db.collection("products").doc()
  //   const timestamp = new Date()
  //   product.price = MaskService.toRawValue('money', product.price)
  //   product.category = selectedCategory
  //   console.log(product)

  //   productRef.set({
  //     ...product,
  //     uid: productRef.id,
  //     createAt: timestamp,
  //   })
  //     .then(() => {
  //       setProduct(init)
  //       setSelectedCategory([])
  //     })
  //     .catch(error => console.log(error))
  // }

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
      task = storage.ref(imgData.ref).put(blob, { contentType: 'image/jpeg' })
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
            <InputView>
              <TextInput
                label="Chinese Name"
                placeholder='Chinese Name'
                style={{
                  backgroundColor: theme.InputBoxBackgroundColor,
                  outline: "none"
                }}
                theme={{ colors: { primary: "grey" } }}
                mode="outlined"
                dense
                value={product.chineseName}
                onChangeText={value => { handleChange("chineseName", value) }}
              />
              <HelperText type="error" visible={!!chineseNameErr}>
                {chineseNameErr}
              </HelperText>
            </InputView>

            <InputView>
              <TextInput
                style={{ backgroundColor: theme.InputBoxBackgroundColor }}
                theme={{ colors: { primary: "grey" } }}
                mode="outlined"
                dense
                label="English Name"
                placeholder='English Name'
                value={product.englishName}
                onChangeText={value => { handleChange("englishName", value) }}
              />
              <HelperText type="error" visible={!!englishNameErr}>
                {englishNameErr}
              </HelperText>
            </InputView>

            <InputView>
              <TextInput
                label="Quantity"
                placeholder='Quantity'
                style={{ backgroundColor: theme.InputBoxBackgroundColor }}
                theme={{ colors: { primary: "grey" } }}
                mode="outlined"
                dense
                value={product.qty}
                keyboardType="number-pad"
                onChangeText={value => {
                  if (!value || validator.isInt(value)) {
                    handleChange("qty", value)
                  }
                }
                }
              />
              <HelperText type="error" visible={!!qtyErr}>
                {qtyErr}
              </HelperText>
            </InputView>

            <InputView>
              <TextInput
                label="Unit"
                placeholder='Unit'
                style={{ backgroundColor: theme.InputBoxBackgroundColor }}
                theme={{ colors: { primary: "grey" } }}
                mode="outlined"
                dense
                value={product.unit}
                keyboardType="number-pad"
                onChangeText={value => { handleChange("unit", value) }}
              />
              <HelperText type="error" visible={!!unitErr}>
                {unitErr}
              </HelperText>
            </InputView>

            {/* Price Row */}
            <View
              style={{
                // flex: 1,
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-between",
              }}>


              <InputView style={{ flex: 1 }}>
                <TextInput
                  label="Original Price"
                  placeholder='Enter a price'
                  style={{ backgroundColor: theme.InputBoxBackgroundColor, width: "98%" }}
                  theme={{ colors: { primary: "grey" } }}
                  left={
                    <TextInput.Icon
                      name="currency-usd"
                    />
                  }
                  mode="outlined"
                  dense
                  value={product.original_price}
                  keyboardType="decimal-pad"
                  onChangeText={value => {
                    if (!value || validator.isFloat(value)) {
                      handleChange("original_price", value)
                    }
                  }
                  }
                  error={original_price_err}
                />
                <HelperText type="error" visible={original_price_err}>
                  {original_price_err}
                </HelperText>
              </InputView>

              <InputView style={{ flex: 1 }}>
                <TextInput
                  editable={false}
                  label="Final Price"
                  value={(+product.final_price).toFixed(2)}
                  style={{ backgroundColor: theme.lightGrey, width: "98%", alignSelf: "flex-end" }}
                  theme={{ colors: { primary: "grey" } }}
                  left={
                    <TextInput.Icon
                      name="currency-usd"
                    />
                  }
                  mode="outlined"
                  dense
                  value={(+product.final_price).toFixed(2)}
                  keyboardType="decimal-pad"
                  onChangeText={value => {
                    if (!value || validator.isFloat(value)) {
                      handleChange("final_price", value)
                    }
                  }
                  }
                />
                <HelperText type="error" visible={!!priceErr}>
                  {priceErr}
                </HelperText>
              </InputView>

            </View>

            {/* Discount Row */}
            <View
              style={{
                // flex: 1,
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-between",
              }}>


              <InputView style={{ flex: 1 }}>
                <TextInput
                  label="Disount (-$)"
                  placeholder={product.discount_amt}
                  style={{ backgroundColor: theme.InputBoxBackgroundColor, width: "98%" }}
                  theme={{ colors: { primary: "grey" } }}
                  left={
                    <TextInput.Icon
                      name="currency-usd"
                    />
                  }
                  mode="outlined"
                  dense
                  value={product.discount_amt}
                  keyboardType="decimal-pad"
                  onChangeText={value => {
                    if (!value || validator.isFloat(value)) {
                      handleChange("discount_amt", value)
                    }
                  }
                  }
                  error={discount_amt_err}
                />
                <HelperText type="error" visible={discount_amt_err}>
                  {discount_amt_err}
                </HelperText>
              </InputView>

              <InputView style={{ flex: 1 }}>
                <TextInput
                  label="Discount %"
                  placeholder='Discount %'
                  style={{ backgroundColor: theme.InputBoxBackgroundColor, width: "98%", alignSelf: "flex-end" }}
                  theme={{ colors: { primary: "grey" } }}
                  right={
                    <TextInput.Icon
                      name="percent"
                    />
                  }
                  mode="outlined"
                  dense
                  value={(+product.discount_precent).toFixed(0)}
                  keyboardType="decimal-pad"
                  onChangeText={value => {
                    if (!value || validator.isFloat(value)) {
                      handleChange("discount_precent", value)
                    }
                  }
                  }
                  error={discount_precent_err}
                />
                <HelperText type="error" visible={discount_precent_err}>
                  {discount_precent_err}
                </HelperText>
              </InputView>

            </View>

            <InputView>
              <TextInput
                label="Chinese Description"
                placeholder='Chinese Description'
                style={{ backgroundColor: theme.InputBoxBackgroundColor }}
                theme={{ colors: { primary: "grey" } }}
                mode="outlined"
                dense
                multiline
                numberOfLines={3}
                theme={{ colors: { primary: "grey" } }}
                value={product.description}
                onChangeText={value => { handleChange("ch_description", value) }}
              />
              <HelperText type="error" visible={!!descriptionErr}>
                {descriptionErr}
              </HelperText>
            </InputView>

            <InputView>
              <TextInput
                label="English Description"
                placeholder='English Description'
                style={{ backgroundColor: theme.InputBoxBackgroundColor }}
                theme={{ colors: { primary: "grey" } }}
                mode="outlined"
                dense
                multiline
                numberOfLines={3}
                theme={{ colors: { primary: "grey" } }}
                value={product.description}
                onChangeText={value => { handleChange("en_description", value) }}
              />
              <HelperText type="error" visible={!!descriptionErr}>
                {descriptionErr}
              </HelperText>
            </InputView>

            <MyCard>
              <Card.Content>
                <Subheading styles={{ marginBottom: 130 }} >Select/Create Categories</Subheading>
                {/* <Divider /> */}

                <View style={{ padding: 0, marginBottom: 20 }}>

                  {categories && categories.map((item) => {
                    return (
                      <View key={item}>
                        <Checkbox.Item
                          label={item}
                          labelStyle={{ color: theme.darkGrey }}
                          status={selectedCategory.indexOf(item) === -1 ? "unchecked" : "checked"}
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
                      </View>
                    )
                  })}
                  <Divider style={{ margin: 20 }} />
                  {!showNewCategory &&
                    <Button onPress={() => setShowNewCategory(true)}>
                      + Add a new category
                    </Button>}
                  {showNewCategory &&
                    <>
                      <InputView>
                        <TextInput
                          label="Enter a new categrory"
                          placeholder='Category Name'
                          style={{ backgroundColor: theme.InputBoxBackgroundColor }}
                          theme={{ colors: { primary: "grey" } }}
                          mode="outlined"
                          dense
                          value={cat}
                          onChangeText={value => { onAddCatChange(value) }}
                        />
                        <HelperText type="error" visible={!!catErrMsg}>
                          {catErrMsg}
                        </HelperText>
                      </InputView>

                      <Button icon="plus" mode="contained" color={theme.green}
                        labelStyle={{ color: "white" }}
                        onPress={() => {
                          if (cat) {
                            onAddCategory()
                            setShowNewCategory(false)
                            setCat("")
                          }
                          else {
                            setCatErrMsg("Please enter something.")
                          }
                        }}>
                        Add
                    </Button>
                    </>
                  }
                </View>

              </Card.Content>
            </MyCard>

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

const InputView = styled.View`
  margin-bottom: ${Platform.OS === "web" ? "15px" : 0};
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
const CategoriesCard = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
`;

