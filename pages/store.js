
import React, { useContext, useState } from "react";
import { Context } from "../context/Context";
import { SearchBar, Button } from 'react-native-elements';
import { View, TouchableOpacity, Platform } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import BottomBar from "../components/BottomBar";
import ProductCard from "../components/ProductCard";
import AppContainer from "../components/AppContainer";

export default function Store({ data }) {
  const { navigate } = useRouting();
  const { 
    selectedItem, setSelectedItem
  } = useContext(Context);
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);
  console.log(data);
  const outline = Platform.OS === 'web' ? { outline: "none" } : null;
  const images = [
    'https://cdn3.volusion.com/hckyx.hepad/v/vspfiles/photos/CONC-REDAPPLE-2.jpg',
    'https://cdn3.volusion.com/hckyx.hepad/v/vspfiles/photos/CONC-REDAPPLE-2.jpg',
    'https://cdn3.volusion.com/hckyx.hepad/v/vspfiles/photos/CONC-REDAPPLE-2.jpg'
  ]
  return (
    <>
      <SearchBar
        placeholder="Search"
        // onChangeText={this.updateSearch}
        // value={"search"}
        lightTheme
        platform="ios"
        containerStyle={{ width: "100%", maxWidth: 500, backgroundColor: "white" }}
        inputContainerStyle={{ backgroundColor: "#f2f2f2", ...outline }}
        inputStyle={outline}
      />
      <ContextArea>
        <ScrollView>
          <CategoryContainer>
            {data.map((category, index) => {
              return (
                <TouchableOpacity onClick={()=>setSelectedCatIndex(index)}>
                  <CategoryName key={category.id} setSelectedCatIndex={setSelectedCatIndex}>
                    {category.name}
                  </CategoryName>
                </TouchableOpacity>
              )
            })}
          </CategoryContainer>
        </ScrollView>
        <ProductContainer>

          {data[selectedCatIndex].products.map((item) => {
            return (
              <TouchableOpacity onPress={() => {
                setSelectedItem(item)
                navigate({
                  routeName: "details",
                })
              }}>
                <ProductCard item={item}/>
              </TouchableOpacity>
            )
          })}
        </ProductContainer>
      </ContextArea>
      <BottomBar />
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:1337/categories`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

const ContextArea = styled.View`
      flex: 1;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: flex-start;
      background-color: white;
      width: 100%;
      max-width: 500px;
      padding-bottom: 70px;
`;
const ScrollView = styled.ScrollView`
      height: 100%;
`;
const CategoryContainer = styled.View`
      flex: 2;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: flex-start;
      background-color: #f5f5f5;
`;
const CategoryName = styled.Text`
      margin: 10px 0 10px 0;
`;
const ProductContainer = styled.ScrollView`
      flex: 5;
      background-color: #f5f5f5;
      height: 100%;
      flex-direction: column;
`;