import React, { useContext } from "react";
import styled from "styled-components/native";
import { Context } from "../../context/Context";

export default function CategoryNames() {

  const { setSelectedCat, categories } = useContext(Context);

  return (
    <>
      {categories && categories.map((category) => {
        return (
          <NamesContainer key={category.uid} onPress={() => { setSelectedCat(category.uid) }}>
            <Name>
              {category.chineseName}
            </Name>
            <Name>
              {category.englishName}
            </Name>
          </NamesContainer>
        )
      })}
    </>
  )
};

const NamesContainer = styled.TouchableOpacity`
      /* flex: 1; */
      margin: 10px 0px 10px 0px;
      align-items: center;
      justify-content: center;
`;
const Name = styled.Text`
      text-transform: capitalize;
`;