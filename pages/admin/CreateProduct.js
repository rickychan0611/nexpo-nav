
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
// import { Input } from 'react-native-elements';
import { View, Platform } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import validator from 'validator';
import { TextInputMask, MaskService } from 'react-native-masked-text'
import { Checkbox, Subheading, Button, TextInput, Divider } from 'react-native-paper';

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
    user,
    selectedItem, data, setData, total,
    setSelectedItem, selectedCat,
    newOrderProductList, setNewOrderProductList,
  } = useContext(Context);

  const outline = Platform.OS === 'web' ? { outline: "none" } : null;
  const [product, setProduct] = useState(init);
  const [categories, setCategories] = useState([]);

  const handleChange = (name, value) => {
    if (name === "price") {
      value = MaskService.toMask('money', value, {
        precision: 2,
        separator: '.',
        delimiter: ',',
        unit: '$',
        suffixUnit: ''
      })
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


  useEffect(() => {
    db.collection("categories").get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id)
          setCategories(prev => {
            return [...prev, doc.id]
          })
        })
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <View style={{width: "100%", marginBottom: 20}}>
      <Title h2>Add a product</Title>

      <Input
        label="Chinese Name"
        placeholder='Chinese Name'
        value={product.chineseName}
        onChangeText={value => { handleChange("chineseName", value) }}
      />
      <Input
        label="English Name"
        placeholder='English Name'
        value={product.englishName}
        onChangeText={value => { handleChange("englishName", value) }}
      />
      <Input
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
        label="Unit"
        placeholder='Unit'
        value={product.unit}
        keyboardType="number-pad"
        onChangeText={value => { handleChange("unit", value) }}
      />
      <Input
        label="Price"
        placeholder='Price'
        value={product.price}
        keyboardType="decimal-pad"
        onChangeText={value => { handleChange("price", value) }}
      />
      <Input
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
    </View>
  );
}


const Input = styled(TextInput)`
  margin-bottom: 10px;
`;
const ScrollView = styled.ScrollView`
  height: 100%;
  width: 100%;
`;
const Title = styled.Text`
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
`;