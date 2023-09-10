import React from 'react';

const CartItemContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: () => {},
    removeItem: () => {},
    clearCart: () => {}
})

export default CartItemContext;