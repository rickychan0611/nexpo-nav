
import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { Input, Button } from 'react-native-elements';
import { View, TouchableOpacity, Platform } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import validator from 'validator';
import { TextInputMask, MaskService } from 'react-native-masked-text'

import { db } from "../../firebase";

export default function CreateProduct() {
  const { navigate } = useRouting();

  const init = {
    uid: "",
    createAt: "",
    chineseName: "",
    englishName: "",
    price: "",
    qty: "",
    unit: "",
    description: "",
    category: ""
  }

  const {
    user,
    selectedItem, data, setData, total,
    setSelectedItem, selectedCat,
    newOrderProductList, setNewOrderProductList,
  } = useContext(Context);

  const outline = Platform.OS === 'web' ? { outline: "none" } : null;
  const [product, setProduct] = useState({init});
  
  const maskedPrice = (value) => {
    let price = MaskService.toMask('money', value, {
      precision: 2,
        separator: '.',
        delimiter: ',',
        unit: '$',
        suffixUnit: ''
    })
    return price
  }

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
    console.log(product)

    productRef.set({
      ...product,
      uid: productRef.id,
      createAt: timestamp
    })
    .then(()=>setProduct(init))
    .catch(error => console.log(error))
  }

  
  return (
    <>
      <Title h2>Add a product</Title>

      <Input
        placeholder='Chinese Name'
        value={product.chineseName}
        onChangeText={value => { handleChange("chineseName", value) }}
      />
      <Input
        placeholder='English Name'
        value={product.englishName}
        onChangeText={value => { handleChange("englishName", value) }}
      />
      <Input
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
        placeholder='Unit'
        value={product.unit}
        keyboardType="number-pad"
        onChangeText={value => { handleChange("unit", value) }}
      />
      <Input
        placeholder='Price'
        value={product.price}
        keyboardType="decimal-pad"
        onChangeText={value => {handleChange("price", value) }}
      />
      <Input
        placeholder='Description'
        value={product.description}
        onChangeText={value => { handleChange("description", value) }}
      />
      <Input
        placeholder='Category'
        value={product.category}
        onChangeText={value => { handleChange("category", value) }}
      />
      <Button title="Submit" onPress={onSubmit} />
    </>
  );
}


const Title = styled.Text`
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
`;