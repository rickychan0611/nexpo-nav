import React, {useContext} from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Context } from "../../context/Context";

export default function CategoryNames({data}) {

  const { setSelectedCat } = useContext(Context);

  return (
    <CategoryContainer>
    {data && data.map((category) => {
      return (
        <TouchableOpacity key={category.id}>
          <Name
            onPress={() => {
              setSelectedCat((category.id - 1).toString())
            }}
            key={category.id} setSelectedCat={setSelectedCat}>
            {category.name}
          </Name>
        </TouchableOpacity>
      )
    })}
  </CategoryContainer>
    )
};

const CategoryContainer = styled.View`
      flex: 2;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: flex-start;
`;
const Name = styled.Text`
      text-transform: capitalize;
      background-color: white;
      width: 100%;
      margin: 10px 0 10px 0;

`;