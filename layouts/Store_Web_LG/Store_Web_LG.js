
import React, { useContext } from "react";
import { Context } from "../../context/Context";
import { ProductsContext } from "../../context/ProductsContext";
import { ScrollView, TouchableOpacity, Platform, View, Text } from "react-native";
import { useRouting } from "expo-next-react-navigation";
import { Col, Row, Grid } from "react-native-easy-grid";
import { FlatGrid } from 'react-native-super-grid'
import useWindowSize from "../../hooks/useWindowSize"

import ProductCard from "../../components/ProductCard";
import CategoryNames from "../../components/CategoryNames";

export default function Store_Web_LG({ edit }) {
  const { navigate } = useRouting();

  const {
    setSelectedItem, selectedCat, setProduct
  } = useContext(Context);

  const {
    productData
  } = useContext(ProductsContext);

  const outline = Platform.OS === 'web' ? { outline: "none" } : null;

  const { vh, vw } = useWindowSize();

  return (
    <Grid>
      <Col size={1} style={{
        maxWidth: vw > 690 ? undefined : 140,
        minWidth: vw > 690 ? undefined : 140,
        height: Platform.OS === "web" ? "calc(100vh - 60px)" : "100%",
      }}>
        <ScrollView>
          <CategoryNames />
        </ScrollView>
      </Col>

      <Col size={3} style={{
        height: Platform.OS === "web" ? "calc(100vh - 60px)" : "100%",
        backgroundColor: "#e8dfe1",
      }}>

        <FlatGrid style={{
          paddingBottom: 100
        }}
          data={productData[selectedCat]}
          itemDimension={250}
          spacing={10}
          renderItem={({ item }) => {
            return (
              <>
                <TouchableOpacity key={item.uid}
                  onPress={() => {
                    setSelectedItem(item)
                    edit && setProduct(item)
                    edit ?
                      navigate({
                        routeName: "admin/edit-product",
                        params: { id: item.uid, path: "edit-product" },
                        web: { as: `/admin/edit-product?id=${item.uid}` },
                      })
                      :
                      navigate({
                        routeName: "product",
                        params: { id: item.uid },
                        web: { as: `/product?id=${item.uid}` },
                      })

                  }}>
                  <ProductCard item={item} />
                </TouchableOpacity>
              </>
            )
          }} />

      </Col>
    </Grid>
  );
}
