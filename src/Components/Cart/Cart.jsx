import React, { useContext, useState } from "react";
import style from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import ShowCartContext from "../Store/Context";
import CartItemContext from "../Store/cart-context";
import Checkout from "./Checkout";

const Cart = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitted, setDidSubmitted] = useState(false);

  const cartShowCxt = useContext(ShowCartContext);
  const cartCxt = useContext(CartItemContext);

  const totalAmount = `${cartCxt.totalAmount.toFixed(2)}`;
  const hasItem = cartCxt.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCxt.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCxt.addItem({
      ...item,
      amount: 1,
    });
  };

  const orderHandler = () => {
    setShowCheckout(true);
  };

  const submitOrderHandle = async (userData) => {
    setIsSubmitting(true);
    await fetch("http://localhost:5000/Orders", {
      method: "Post",
      body: JSON.stringify({
        user: userData,
        orderedItem: cartCxt.items,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    setIsSubmitting(false);
    setDidSubmitted(true);
    cartCxt.clearCart();
  };

  const cartItems = (
    <ul className={style["cart-items"]}>
      {cartCxt.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)} //
          onAdd={cartItemAddHandler.bind(null, item)} //-- OR -- // () => (cartItemAddHandler(item))
        />
      ))}
    </ul>
  );

  const modelAction = (
    <div className={style.actions}>
      <button className={style["button--alt"]} onClick={cartShowCxt.hideCart}>
        Close
      </button>
      {hasItem && (
        <button className={style.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={style.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <Checkout
          onComfirm={submitOrderHandle}
          onCancel={cartShowCxt.hideCart}
        />
      )}
      {!showCheckout && modelAction}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmittedModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>;
      <div className={style.actions}>
        <button className={style.button} onClick={cartShowCxt.hideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal>
      {!isSubmitting && !didSubmitted && cartModalContent}
      {isSubmitting && !didSubmitted && isSubmittingModalContent}
      {!isSubmitting && didSubmitted && didSubmittedModalContent}
    </Modal>
  );
};

export default Cart;
