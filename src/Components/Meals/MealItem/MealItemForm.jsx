import React, { useRef, useState } from "react";
import style from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = props => {
  const amouutInputRef = useRef();
  const [validInput, setValidInput] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amouutInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5 ){
      setValidInput(false);
      return
    }

    props.onAddToCart(enteredAmountNumber);
  }

  return (
    <form className={style.form} onSubmit={submitHandler}>
      <Input
        ref={amouutInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!validInput && <p>Enter a valid number(1-5)</p>}
    </form>
  );
};

export default MealItemForm;
