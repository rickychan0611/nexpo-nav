
import produce from "immer";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function handlePlus(selectedItem, ctx) {
  console.log(selectedItem)
  let idArray = [];
  const { newOrderProductList, setNewOrderProductList, setTotal, counter, setCounter } = ctx;
  let index = -1;

  if (newOrderProductList[0]) {
    newOrderProductList.forEach(item => {
      idArray.push(item.productId);
    });
    console.log("idArray")
    console.log(idArray)
    index = idArray.indexOf(selectedItem.uid)
  }

  // setCounter(prev => prev + 1);
  setTotal(prev => prev + +selectedItem.final_price)

  if (+selectedItem.qty > 0) {
    setNewOrderProductList(
      //update state object in nested array
      produce(
        prev => {
          if (prev[0]) {
            // check if current state contains the same id
            if (idArray.indexOf(selectedItem.uid) === -1) {
              // if the ID is not found, push the new object into the state
              return [...prev, { item: selectedItem, productId: selectedItem.uid, quantity: 1, price: selectedItem.final_price }];
            }
            else {
              // if the ID is found, get the index and update prev state
              // let index = idArray.indexOf(selectedItem.uid)
              if (index !== -1) {
                if (newOrderProductList[index].quantity < selectedItem.qty) {
                  prev[index] = { item: selectedItem, productId: selectedItem.uid, quantity: newOrderProductList[index].quantity + 1, price: selectedItem.final_price };
                  return prev
                }
                else alert("Sorry, not enough stock.")
              }
            }
          }
          // if state is empty, just return the value
          else return [{ item: selectedItem, productId: selectedItem.uid, quantity: 1, price: selectedItem.final_price }];
        }
      )
    );
  }
  else alert("Sorry, item is out of stock.")
}



export function handleMinus(selectedItem, ctx) {
  let idArray = [];
  let index = -1;
  const { newOrderProductList, setNewOrderProductList, setTotal, counter, setCounter } = ctx;

  if (newOrderProductList[0]) {
    newOrderProductList.forEach(item => {
      idArray.push(item.productId);
    });
    index = idArray.indexOf(selectedItem.uid)
  }



  if (newOrderProductList[index].quantity > 0) {
    // setCounter(prev => prev - 1);
    setTotal(prev => prev - +selectedItem.final_price)

    // remove object if it is the last one
    if (newOrderProductList[index].quantity === 1) {
      AsyncStorage.setItem('newOrderProductList', JSON.stringify(newOrderProductList.filter(e => e.productId !== selectedItem.uid)))
      setNewOrderProductList(
        produce( prev => {
          return prev.filter(e => e.productId !== selectedItem.uid)
        })
      );
    }

    // update quantity if it is not the last one
    else if (newOrderProductList[index].quantity > 1) {
      if (newOrderProductList[0]) {
        newOrderProductList.forEach(item => {
          idArray.push(item.productId);
        });
      }
      setNewOrderProductList(
        produce(prev => {
          if (prev[0]) {
            let index = idArray.indexOf(selectedItem.uid)
            if (index !== -1) {
              prev[index] = { item: selectedItem, productId: selectedItem.uid, quantity: newOrderProductList[index].quantity - 1, price: selectedItem.final_price };
              return
            }
          };
        })
      )
    }
  };
};
