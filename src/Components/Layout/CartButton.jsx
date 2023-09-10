import React, { useContext, useEffect, useState } from "react";
import style from "./CartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import ShowCartContext from "../Store/Context";
import CartItemContext from "../Store/cart-context";

const Cart = (props) => {
  const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);
  const cartshowCxt = useContext(ShowCartContext);
  const cartCxt = useContext(CartItemContext);

  const { items } = cartCxt;

  const numberOfCartItem = cartCxt.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnclasses = `${style.button} ${btnIsHighLighted ? style.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighLighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnclasses} onClick={cartshowCxt.showCart}>
      <span className={style.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={style.numOfOrder}>{numberOfCartItem}</span>
    </button>
  );
};

export default Cart;
