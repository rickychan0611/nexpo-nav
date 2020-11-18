import React, {useContext, useEffect} from "react";
import { View, Platform, Image, TouchableOpacity, Text } from "react-native";
import { Context } from "../../../context/Context";
import onCreateProductInputChange from "../../../hooks/onCreateProductInputChange";
import styled from "styled-components/native";
import { TextInput, HelperText  } from 'react-native-paper';
import { ThemeContext } from "../../../context/ThemeContext";
import validator from 'validator';

export default function InputFields() {

  const {error, setError, product, setProduct
  } = useContext(Context);

  const ctx = useContext(Context);

  const { theme } = useContext(ThemeContext);

  // const onCreateProductInputChange = useonCreateProductInputChange(name, value, ctx);
  useEffect(()=>{
    console.log(error)
  },[error])
  
  return (
    <>
      <InputView>
        <TextInput
          label="Chinese Name*"
          placeholder='Chinese Name'
          style={{
            backgroundColor: theme.InputBoxBackgroundColor,
            outline: "none"
          }}
          theme={{ colors: { primary: "grey" } }}
          mode="outlined"
          dense
          value={product.chineseName}
          onChangeText={value => { onCreateProductInputChange("chineseName", value, ctx) }}
          error={error.chineseName}
        />
        <HelperText type="error" visible={error.chineseName}>
          {error.chineseName}
        </HelperText>
      </InputView>

      <InputView>
        <TextInput
          style={{ backgroundColor: theme.InputBoxBackgroundColor }}
          theme={{ colors: { primary: "grey" } }}
          mode="outlined"
          dense
          label="English Name*"
          placeholder='English Name'
          value={product.englishName}
          onChangeText={value => { onCreateProductInputChange("englishName", value, ctx) }}
          error={error.englishName}
        />
        <HelperText type="error" visible={error.englishName}>
          {error.englishName}
        </HelperText>
      </InputView>

      <InputView>
        <TextInput
          label="Quantity*"
          placeholder='How many in stock?'
          style={{ backgroundColor: theme.InputBoxBackgroundColor }}
          theme={{ colors: { primary: "grey" } }}
          mode="outlined"
          dense
          value={product.qty}
          keyboardType="number-pad"
          onChangeText={value => {
            if (!value || validator.isInt(value)) {
              onCreateProductInputChange("qty", value, ctx)
            }
          }
          }
          error={error.qty}
        />
        <HelperText type="error" visible={error.qty}>
          {error.qty}
        </HelperText>
      </InputView>

      <InputView>
        <TextInput
          label="Unit*"
          placeholder='Eg. each, lbs, 6pcs or 4/pack'
          style={{ backgroundColor: theme.InputBoxBackgroundColor }}
          theme={{ colors: { primary: "grey" } }}
          mode="outlined"
          dense
          value={product.unit}
          keyboardType="number-pad"
          onChangeText={value => { onCreateProductInputChange("unit", value, ctx) }}
          error={error.unit}
        />
        <HelperText type="error" visible={error.unit}>
          {error.unit}
        </HelperText>
      </InputView>

      {/* Price Row */}
      <Row>
        <InputView style={{ flex: 1 }}>
          <TextInput
            label="Original Price*"
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
                onCreateProductInputChange("original_price", value, ctx)
              }
            }
            }
            error={error.original_price_err}
          />
          <HelperText type="error" visible={error.original_price_err}>
            {error.original_price_err}
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
                onCreateProductInputChange("final_price", value, ctx)
              }
            }
            }
          />
          <HelperText type="error" visible={error.priceErr}>
            {error.priceErr}
          </HelperText>
        </InputView>

      </Row>

      {/* Discount Row */}
      <Row>

        <InputView style={{ flex: 1 }}>
          <TextInput
            label="Discount (-$)"
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
                onCreateProductInputChange("discount_amt", value, ctx)
              }
            }
            }
            error={error.discount_amt_err}
          />
          <HelperText type="error" visible={error.discount_amt_err}>
            {error.discount_amt_err}
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
                onCreateProductInputChange("discount_precent", value, ctx)
              }
            }
            }
            error={error.discount_precent_err}
          />
          <HelperText type="error" visible={error.discount_precent_err}>
            {error.discount_precent_err}
          </HelperText>
        </InputView>

      </Row>

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
          value={product.ch_description}
          onChangeText={value => { onCreateProductInputChange("ch_description", value, ctx) }}
          error={error.ch_description}
        />
        <HelperText type="error" visible={error.ch_description}>
          {error.ch_description}
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
          value={product.en_description}
          onChangeText={value => { onCreateProductInputChange("en_description", value, ctx) }}
          error={error.en_description}
        />
        <HelperText type="error" visible={error.en_description}>
          {error.en_description}
        </HelperText>
      </InputView>
    </>)
}

const InputView = styled.View`
  margin-bottom: ${Platform.OS === "web" ? "15px" : 0};
`;

const Row = styled.View`
 flex-direction: row;
 flex-wrap: nowrap;
 justify-content: space-between;
`;
