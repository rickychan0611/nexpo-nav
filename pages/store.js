
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";
import { SearchBar, Button } from 'react-native-elements';
import { View, TouchableOpacity, Platform } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import BottomBar from "../components/BottomBar";
import ProductCard from "../components/ProductCard";
import AppContainer from "../components/AppContainer";
import dataJson from '../public/db.json';

// const API_URL = `http://strapi-ric.herokuapp.com/categories`
// const API_URL = `http://localhost:1337/categories`

export default function Store({ ssrData }) {
  const { navigate } = useRouting();
  const {
    selectedItem, setSelectedItem,
    selectedCat, setSelectedCat,
    data, setData,
  } = useContext(Context);

  // console.log(data);
  const outline = Platform.OS === 'web' ? { outline: "none" } : null;

  useEffect(() => {
    // const res = await fetch(API_URL)
    // const data = await res.json()
    // return { props: { data } }
    console.log(ssrData)
    ssrData ? setData(ssrData) : setData(dataJson)
  }, [])

  return (
    <>
      {data && <>
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
          <CategoryScrollView>

            <CategoryContainer>
              {data && data.map((category, index) => {
                return (
                  <TouchableOpacity key={category.id}>
                    <CategoryName
                      onPress={() => {
                        setSelectedCat((category.id - 1).toString())
                      }}
                      key={category.id} setSelectedCat={setSelectedCat}>
                      {category.name}
                    </CategoryName>
                  </TouchableOpacity>
                )
              })}

{data && data.map((category, index) => {
                return (
                  <TouchableOpacity key={category.id}>
                    <CategoryName
                      onPress={() => {
                        setSelectedCat((category.id - 1).toString())
                      }}
                      key={category.id} setSelectedCat={setSelectedCat}>
                      {category.name}
                    </CategoryName>
                  </TouchableOpacity>
                )
              })}

{data && data.map((category, index) => {
                return (
                  <TouchableOpacity key={category.id}>
                    <CategoryName
                      onPress={() => {
                        setSelectedCat((category.id - 1).toString())
                      }}
                      key={category.id} setSelectedCat={setSelectedCat}>
                      {category.name}
                    </CategoryName>
                  </TouchableOpacity>
                )
              })}

{data && data.map((category, index) => {
                return (
                  <TouchableOpacity key={category.id}>
                    <CategoryName
                      onPress={() => {
                        setSelectedCat((category.id - 1).toString())
                      }}
                      key={category.id} setSelectedCat={setSelectedCat}>
                      {category.name}
                    </CategoryName>
                  </TouchableOpacity>
                )
              })}

{data && data.map((category, index) => {
                return (
                  <TouchableOpacity key={category.id}>
                    <CategoryName
                      onPress={() => {
                        setSelectedCat((category.id - 1).toString())
                      }}
                      key={category.id} setSelectedCat={setSelectedCat}>
                      {category.name}
                    </CategoryName>
                  </TouchableOpacity>
                )
              })}

{data && data.map((category, index) => {
                return (
                  <TouchableOpacity key={category.id}>
                    <CategoryName
                      onPress={() => {
                        setSelectedCat((category.id - 1).toString())
                      }}
                      key={category.id} setSelectedCat={setSelectedCat}>
                      {category.name}
                    </CategoryName>
                  </TouchableOpacity>
                )
              })}

{data && data.map((category, index) => {
                return (
                  <TouchableOpacity key={category.id}>
                    <CategoryName
                      onPress={() => {
                        setSelectedCat((category.id - 1).toString())
                      }}
                      key={category.id} setSelectedCat={setSelectedCat}>
                      {category.name}
                    </CategoryName>
                  </TouchableOpacity>
                )
              })}


{data && data.map((category, index) => {
                return (
                  <TouchableOpacity key={category.id}>
                    <CategoryName
                      onPress={() => {
                        setSelectedCat((category.id - 1).toString())
                      }}
                      key={category.id} setSelectedCat={setSelectedCat}>
                      {category.name}
                    </CategoryName>
                  </TouchableOpacity>
                )
              })}

{data && data.map((category, index) => {
                return (
                  <TouchableOpacity key={category.id}>
                    <CategoryName
                      onPress={() => {
                        setSelectedCat((category.id - 1).toString())
                      }}
                      key={category.id} setSelectedCat={setSelectedCat}>
                      {category.name}
                    </CategoryName>
                  </TouchableOpacity>
                )
              })}

{data && data.map((category, index) => {
                return (
                  <TouchableOpacity key={category.id}>
                    <CategoryName
                      onPress={() => {
                        setSelectedCat((category.id - 1).toString())
                      }}
                      key={category.id} setSelectedCat={setSelectedCat}>
                      {category.name}
                    </CategoryName>
                  </TouchableOpacity>
                )
              })}
            </CategoryContainer>

          </CategoryScrollView>

          <ProductContainer>
            {data && data[selectedCat].products.map((item) => {
              return (
                <TouchableOpacity key={item.id}
                onPress={() => {
                  console.log("pressed")
                  setSelectedItem(item)
                  navigate({
                    routeName: "details",
                  })
                }}>
                  <ProductCard item={item} />
                </TouchableOpacity>
              )
            })}

{data && data[selectedCat].products.map((item) => {
              return (
                <TouchableOpacity key={item.id}
                onPress={() => {
                  console.log("pressed")
                  setSelectedItem(item)
                  navigate({
                    routeName: "details",
                  })
                }}>
                  <ProductCard item={item} />
                </TouchableOpacity>
              )
            })}


{data && data[selectedCat].products.map((item) => {
              return (
                <TouchableOpacity key={item.id}
                onPress={() => {
                  console.log("pressed")
                  setSelectedItem(item)
                  navigate({
                    routeName: "details",
                  })
                }}>
                  <ProductCard item={item} />
                </TouchableOpacity>
              )
            })}


{data && data[selectedCat].products.map((item) => {
              return (
                <TouchableOpacity key={item.id}
                onPress={() => {
                  console.log("pressed")
                  setSelectedItem(item)
                  navigate({
                    routeName: "details",
                  })
                }}>
                  <ProductCard item={item} />
                </TouchableOpacity>
              )
            })}


{data && data[selectedCat].products.map((item) => {
              return (
                <TouchableOpacity key={item.id}
                onPress={() => {
                  console.log("pressed")
                  setSelectedItem(item)
                  navigate({
                    routeName: "details",
                  })
                }}>
                  <ProductCard item={item} />
                </TouchableOpacity>
              )
            })}


{data && data[selectedCat].products.map((item) => {
              return (
                <TouchableOpacity key={item.id}
                onPress={() => {
                  console.log("pressed")
                  setSelectedItem(item)
                  navigate({
                    routeName: "details",
                  })
                }}>
                  <ProductCard item={item} />
                </TouchableOpacity>
              )
            })}


{data && data[selectedCat].products.map((item) => {
              return (
                <TouchableOpacity key={item.id}
                onPress={() => {
                  console.log("pressed")
                  setSelectedItem(item)
                  navigate({
                    routeName: "details",
                  })
                }}>
                  <ProductCard item={item} />
                </TouchableOpacity>
              )
            })}


          </ProductContainer>

        </ContextArea>
        <BottomBar />
      </>
      }
    </>
  );
}

export async function getServerSideProps() {

  // const res = await fetch(API_URL)
  // const data = await res.json()
  // return { props: { data } }

  return { props: { ssrData: dataJson } }


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
const CategoryScrollView = styled.ScrollView`
      height: 100%;
      background-color: white;
      border-right-color: #f5f5f5;
      border-right-width: 4px;
`;
const CategoryContainer = styled.View`
      flex: 2;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: flex-start;
`;
const CategoryName = styled.Text`
      text-transform: capitalize;
      background-color: white;
      width: 100%;
      margin: 10px 0 10px 0;

`;
const ProductContainer = styled.ScrollView`
      flex: 5;
      background-color: #f5f5f5;
      height: 100%;
      flex-direction: column;
`;