import React from "react";
import CartItemContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0
}

// const existingItem = defaultCartState.items.findIndex(item => {item.id === id});

const cartReducer = (state, action) => {
  if(action.type === "ADDITEM"){
    const updatedTotalAmount = state.totalAmount + (action.item.amount * action.item.price);

    const existingCartItemIndex = state.items.findIndex(item => (item.id === action.item.id))
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;
    
    if(existingCartItem){
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    else{
      updatedItems = state.items.concat(action.item); 
    }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      }
  }
  else if(action.type === "REMOVEITEM"){
    const existingCartItemIndex = state.items.findIndex(item => (item.id === action.id));
    const existingCartItem = state.items[existingCartItemIndex];
    
    const updatedTotalAmount = state.totalAmount -  existingCartItem.price;

    let updatedItems;

    if(existingCartItem.amount > 1){
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1
      }
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    else {
      updatedItems = state.items.filter(item => (item.id !== action.id))
    }


    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }

  }

  if(action.type === "CLEAR"){
    return defaultCartState;
  }

  return defaultCartState;
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = React.useReducer(cartReducer, defaultCartState);

    const addItemHandler = (item) => {
      dispatchCartAction({ type: "ADDITEM", item: item });
    };
    
    const removeItemHandler = (id) => {
      dispatchCartAction({ type: "REMOVEITEM", id: id });
    };

    const clearCartHandler = () => {
      dispatchCartAction({ type: "CLEAR" })
    }

  return (
    <CartItemContext.Provider
      value={{
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearCartHandler
      }}
    >
      {props.children}
    </CartItemContext.Provider>
  );
};

export default CartProvider;
