export default function onCreateProductInputChange (name, value, ctx) {
  let final_price = 0;

  const { setError, product, setProduct } = ctx;

  if (name === "original_price") {
    setError(prev=>({...prev, original_price_err: ""}));
    setError(prev=>({...prev, discount_amt_err: ""}));
    setError(prev=>({...prev, discount_precent_err: ""}));
    setProduct(prev => ({ ...prev, discount_precent: "0", discount_amt: "0" }))

    var t = value;
    value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;

    setProduct(prev => ({ ...prev, [name]: value, final_price: value }))
  }

  else if (name === "discount_amt") {
    setError(prev=>({...prev, original_price_err: ""}));
    setError(prev=>({...prev, discount_amt_err: ""}));
    setError(prev=>({...prev, discount_precent_err: ""}));

    if (+value <= +product.original_price && +value >= 0) {
      setError(prev=>({...prev, discount_amt_err: ""}));

      var t = value;
      value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;
      final_price = +product.original_price - +value
      let discount_precent = ((+value / +product.original_price) * 100).toFixed(0)

      setProduct(prev => ({ ...prev, [name]: value, final_price, discount_precent }))
    }

    if (+value > +product.original_price) {
      setError(prev => ({ ...prev, discount_amt_err: "Amount cannot be greater than original price" }))
    }
    if (+value < 0) {
      setError(prev => ({ ...prev, discount_amt_err: "Amount Cannot be smaller than zero" }))
    }
    if (!product.original_price) {
      setError(prev => ({ ...prev, discount_amt_err: "Please enter the original price 1st." }))
      setError(prev => ({ ...prev, original_price_err: "Price cannot be empty." }))
    }
  }

  else if (name === "discount_precent") {
    setError(prev=>({...prev, original_price_err: ""}));
    setError(prev=>({...prev, discount_amt_err: ""}));
    setError(prev=>({...prev, discount_precent_err: ""}));

    if (+value <= 100 && +value >= 0) {
      setError(prev=>({...prev, discount_precemt_err: ""}));

      var t = value;
      value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 0)) : t;
      final_price = +product.original_price - (+product.original_price * +value / 100)
      let discount_amt = ((+product.original_price * +value) / 100).toFixed(2)

      setProduct(prev => ({ ...prev, [name]: value, final_price, discount_amt }))
    }

    if (+value > 100) {
      setError(prev => ({ ...prev, discount_precent_err: "Discount cannot be greater than 100%" }))
    }
    if (+value < 0) {
      setError(prev => ({ ...prev, discount_precent_err: "Discount cannot be smaller than 0%" }))
    }
    if (!product.original_price) {
      setError(prev => ({ ...prev, discount_precent_err: "Please enter the original price 1st." }))
      setError(prev => ({ ...prev, original_price_err: "Price cannot be empty." }))
    }
  }

  else setProduct(prev => ( { ...prev, [name]: value } ))
};
