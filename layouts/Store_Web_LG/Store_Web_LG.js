
import React, { useContext } from "react";
import { Context } from "../../context/Context";
import { ProductsContext } from "../../context/ProductsContext";
import { ScrollView, TouchableOpacity, Platform, View } from "react-native";
import { useRouting } from "expo-next-react-navigation";
import { Col, Row, Grid } from "react-native-easy-grid";
import { FlatGrid } from 'react-native-super-grid'

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

  return (
    <Grid>
      <Col size={1} style={{
        maxWidth: 150,
        minWidth: 130,
        height: Platform.OS === "web" ? "calc(100vh - 60px)" : "100%",
      }}>
        <ScrollView>
          <CategoryNames />
        </ScrollView>
      </Col>

      <Col size={3} style={{
        height: Platform.OS === "web" ? "calc(100vh - 60px)" : "100%",
        backgroundColor: "#e8dfe1"
      }}>

        <FlatGrid style={{
          marginTop: 10,
          flex: 1
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
        <View style={{ height: 50 }}></View>
      </Col>
    </Grid>
  );
}
