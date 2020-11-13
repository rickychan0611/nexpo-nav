
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";
import { View, Platform, Text } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import validator from 'validator';
import { TextInputMask, MaskService } from 'react-native-masked-text'
import { Checkbox, Subheading, Button, TextInput, Divider, Title, Card, Headline } from 'react-native-paper';

import { db } from "../../firebase";

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

  return (
    <Container>
      <Headline style={{color: theme.titleColor, fontWeight: 100, marginBottom: 20}}>Add a product</Headline>
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
          <View style={{ flex: 1, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ flex: 1, fontSize: 20, paddingBottom: 17 }}>$</Text>
            <Input
              style={{ flex: 20, backgroundColor: theme.InputBoxBackgroundColor }}
              theme={{ colors: { primary: "grey" } }}
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
          </View>

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
  );
}

const Container = styled.View`
  width: 100%;
  margin-bottom: 20px;
  padding: 20px 6px 10px 6px;
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