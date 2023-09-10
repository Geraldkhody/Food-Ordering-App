import style from './CartItem.module.css';

const CartItem = (props) => {
  // Changing the price props to a number by using the Number() method
  const price = `${Number(props.price).toFixed(2)}`;

  return (
    <li className={style['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={style.summary}>
          <span className={style.price}>{price}</span>
          <span className={style.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={style.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
