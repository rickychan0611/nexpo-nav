import {db} from "../../firebase";

const onCreateProductSubmit = (ctx) => {
  const { setError, product, selectedCategory } = ctx;
  
  const productRef = db.collection("products").doc()
  const timestamp = new Date()
  
  console.log("Clicked")
  setError()

  product.category = selectedCategory
  console.log(product)

  //handle Errors
  if (!product.chineseName) {
    setError(prev => ({ ...prev, chineseName: "Cannot be empty" }))
  }
  if (!product.englishName) {
    setError(prev => ({ ...prev, englishName: "Cannot be empty" }))
  }
  if (!product.qty) {
    setError(prev => ({ ...prev, qty: "Cannot be empty" }))
  }
  if (!product.original_price_err) {
    setError(prev => ({ ...prev, original_price_err: "Cannot be empty" }))
  }
  if (!product.discount_amt_err) {
    setError(prev => ({ ...prev, discount_amt_err: "Cannot be empty" }))
  }
  if (!product.discount_precent_err) {
    setError(prev => ({ ...prev, discount_precent_err: "Cannot be empty" }))
  }
  if (!product.unit) {
    setError(prev => ({ ...prev, unit: "Cannot be empty" }))
  }
  if (selectedCategory.length === 0) {
    console.log("here?")
    console.log(selectedCategory)
    setError(prev => ({ ...prev, category_err: "Error: Please select at least one category or create a new one." }))
  }
  // if (!product.ch_description) {
  //   setError(prev => ({ ...prev, ch_description: "Cannot be empty" }))
  // }
  // if (!product.en_description) {
  //   setError(prev => ({ ...prev, englishName: "Cannot be empty" }))
  // }

  // productRef.set({
  //   ...product,
  //   uid: productRef.id,
  //   createAt: timestamp,
  // })
  //   .then(() => {
  //     //reset everything after sumbitting to server
  //     setProduct(productInitValue)
  //     setSelectedCategory([])
  //   })
  //   .catch(error => console.log(error))
}

export default onCreateProductSubmit;