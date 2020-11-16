import {useContext} from "react";
import { Context } from "../../../context/Context";
import handleChange from "./handleChange";
import styled from "styled-components/native";
import { Checkbox, Subheading, Button, TextInput, Divider, Title, Card, Headline, HelperText, ProgressBar, Colors, Switch, Caption } from 'react-native-paper';
import { View, Platform, Image, TouchableOpacity, Text } from "react-native";
import { ThemeContext } from "../../../context/ThemeContext";
import validator from 'validator';

export default function InputFields() {

  const {error, setError, product, setProduct
  } = useContext(Context);

  const ctx = useContext(Context);

  const { theme } = useContext(ThemeContext);

  
  return (
    <>
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
          onChangeText={value => { handleChange("chineseName", value, ctx) }}
        />
        <HelperText type="error" visible={error.chineseNameErr}>
          {error.chineseNameErr}
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
          onChangeText={value => { handleChange("englishName", value, ctx) }}
        />
        <HelperText type="error" visible={error.englishNameErr}>
          {error.englishNameErr}
        </HelperText>
      </InputView>

      <InputView>
        <TextInput
          label="Quantity"
          placeholder='How many in stock?'
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
        <HelperText type="error" visible={error.qtyErr}>
          {error.qtyErr}
        </HelperText>
      </InputView>

      <InputView>
        <TextInput
          label="Unit"
          placeholder='Eg. each, lbs, 6pcs or 4/pack'
          style={{ backgroundColor: theme.InputBoxBackgroundColor }}
          theme={{ colors: { primary: "grey" } }}
          mode="outlined"
          dense
          value={product.unit}
          keyboardType="number-pad"
          onChangeText={value => { handleChange("unit", value, ctx) }}
        />
        <HelperText type="error" visible={error.unitErr}>
          {error.unitErr}
        </HelperText>
      </InputView>

      {/* Price Row */}
      <Row>
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
                handleChange("original_price", value, ctx)
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
                handleChange("final_price", value, ctx)
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
                handleChange("discount_amt", value, ctx)
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
                handleChange("discount_precent", value, ctx)
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
          theme={{ colors: { primary: "grey" } }}
          value={product.description}
          onChangeText={value => { handleChange("ch_description", value, ctx) }}
        />
        <HelperText type="error" visible={error.descriptionErr}>
          {error.descriptionErr}
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
          onChangeText={value => { handleChange("en_description", value, ctx) }}
        />
        <HelperText type="error" visible={error.descriptionErr}>
          {error.descriptionErr}
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
