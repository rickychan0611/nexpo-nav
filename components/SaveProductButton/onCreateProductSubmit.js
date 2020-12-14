import { db } from "../../firebaseApp";
import { Link, useRouting } from "expo-next-react-navigation";

const onCreateProductSubmit = (ctx) => {
  const { setError, product, selectedCategory, productInitValue } = ctx;

  const productRef = db.collection("products").doc()
  const timestamp = new Date()
  const { navigate } = useRouting();

  setError({})

  product.category = selectedCategory

  let validate = new Promise((resolve, reject) => {

    if (!product.chineseName) {
      setError(prev => ({ ...prev, chineseName: "Required. Please enter a Chinese name" }))
      reject()
    }
    if (!product.englishName) {
      setError(prev => ({ ...prev, englishName: "Required. Please enter an English name" }))
      reject()
    }
    if (!product.qty) {
      setError(prev => ({ ...prev, qty: "Required. Please enter the quantity" }))
      reject()
    }
    if (!product.original_price) {
      setError(prev => ({ ...prev, original_price_err: "Required. Please enter the original price" }))
      reject()
    }
    if (!product.unit) {
      setError(prev => ({ ...prev, unit: "Cannot be empty" }))
      reject()
    }
    if (selectedCategory.length === 0) {
      setError(prev => ({ ...prev, category_err: "Error: Please select at least one category or create a new one." }))
      reject()
    }
    else resolve()
  })

  validate.then(() => {
    productRef.set({
      ...product,
      uid: productRef.id,
      createAt: timestamp,
    })
      .then(() => {
        //reset everything after sumbitting to server
        // setProduct(productInitValue)
        // setSelectedCategory([])
        navigate({
          routeName: "home"
        })
      })
      .catch(error => console.log(error))
  })
}

export default onCreateProductSubmit;