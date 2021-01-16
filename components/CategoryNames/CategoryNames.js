import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Context } from "../../context/Context";
import { ProductsContext } from "../../context/ProductsContext";
import { ThemeContext } from "../../context/ThemeContext";
import { View, Text, TouchableOpacity } from "react-native";

export default function CategoryNames() {

  const { setSelectedCat, selectedCat } = useContext(Context);
  const { categories, listenCategories } = useContext(ProductsContext);
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    listenCategories()
    if (!selectedCat && categories) {
      console.log("!!!!!!!!!!" + categories[0].uid)
      setSelectedCat(categories[0].uid)
    }
  }, [selectedCat, categories])

  return (
    <>
      <TopSpace />
      {categories && categories.map((category) => {
        // console.log(category.uid)
        // console.log(selectedCat)
        return (
          <NamesContainer
            key={category.uid}
            theme={theme}
            onPress={() => { setSelectedCat(category.uid) }}
            selected={category.uid === selectedCat}
            style={{
              borderTopLeftRadius: 4,
              borderTopRightRadius: 26,
              borderBottomLeftRadius: 26,
              borderBottomRightRadius: 4,
            }}>
            <Name
              theme={theme}
              selected={category.uid === selectedCat}>
              {category.chineseName}
            </Name>
            <Name
              theme={theme}
              selected={category.uid === selectedCat}>
              {category.englishName}
            </Name>
          </NamesContainer>
        )
      })}
      <Space />
    </>
  )
};

const NamesContainer = styled.TouchableOpacity`
      align-items: center;
      justify-content: center;
      background-color: 
      ${props => props.selected ? props.theme.red : props.theme.lightGrey};
      padding: 7px 0px 7px 0px;
      margin: 5px 4px 10px 7px;
`;
const Name = styled.Text`
      text-transform: capitalize;
      color: ${props => props.selected ? "white" : props.theme.darkGrey};
`;
const TopSpace = styled.View`
      height: 15px;
`;
const Space = styled.View`
      height: 250px;
`;