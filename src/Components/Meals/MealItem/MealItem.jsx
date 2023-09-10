import React, { useContext } from "react";
import style from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartItemContext from "../../Store/cart-context";

const MealItem = props => {
  const cartCxt = useContext(CartItemContext);

  const addToCartHandler = (amount) => {
    cartCxt.addItem({
      id: props.id, 
      price: props.price,
      amount: amount,
      name: props.name
    })
  }

  return (
    <div className={style.meal}>
      <div>
      <h3>{props.name}</h3>
        <div className={style.description}>{props.description}</div>
        <div className={style.price}>{props.price}</div>
      </div>
      <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
    </div>
  );
};

export default MealItem;
