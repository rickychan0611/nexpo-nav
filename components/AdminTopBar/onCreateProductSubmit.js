const onCreateProductSubmit = () => {
    console.log("Clicked")
    const productRef = db.collection("products").doc()
    const timestamp = new Date()
    product.category = selectedCategory
    console.log(product)
    
    //handle Errors
    if (!product.chineseName){
      setCreateProductErrMsg(prev => ({ ...prev, chineseName : "Cannot be empty"}))
    }
    if (!product.englishName){
      setCreateProductErrMsg(prev => ({ ...prev, englishName : "Cannot be empty"}))
    }
    if (!product.qty){
      setCreateProductErrMsg(prev => ({ ...prev, qty : "Cannot be empty"}))
    }
    if (!product.price){
      setCreateProductErrMsg(prev => ({ ...prev, price : "Cannot be empty"}))
    }
    if (!product.unit){
      setCreateProductErrMsg(prev => ({ ...prev, unit : "Cannot be empty"}))
    }
    if (!product.ch_description){
      setCreateProductErrMsg(prev => ({ ...prev, ch_description : "Cannot be empty"}))
    }
    if (!product.en_description){
      setCreateProductErrMsg(prev => ({ ...prev, englishName : "Cannot be empty"}))
    }

    productRef.set({
      ...product,
      uid: productRef.id,
      createAt: timestamp,
    })
      .then(() => {
        setProduct(productInitValue)
        setSelectedCategory([])
      })
      .catch(error => console.log(error))
  }