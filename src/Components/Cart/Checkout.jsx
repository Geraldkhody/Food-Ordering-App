import React, { useRef, useState } from "react";
import style from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {
  const [formInputIsValid, setFormInputIsValid] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postalInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const cityIsValid = !isEmpty(enteredCity);
    const postalIsValid = !isEmpty(enteredPostal);

    setFormInputIsValid({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postal: postalIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalIsValid;

    if (!formIsValid) {
      return;
    }

    props.onComfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostal,
    });
  };

  const nameContronClasses = `${style.control} ${
    formInputIsValid.name ? "" : style.invalid
  }`;
  const streetContronClasses = `${style.control} ${
    formInputIsValid.street ? "" : style.invalid
  }`;
  const cityContronClasses = `${style.control} ${
    formInputIsValid.city ? "" : style.invalid
  }`;
  const postalContronClasses = `${style.control} ${
    formInputIsValid.postal ? "" : style.invalid
  }`;

  return (
    <form className={style.form} onSubmit={confirmHandler}>
      <div className={nameContronClasses}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputIsValid.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetContronClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputIsValid.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalContronClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputIsValid.postal && <p>Please enter a valid postal code</p>}
      </div>
      <div className={cityContronClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputIsValid.city && <p>Please enter a valid city</p>}
      </div>
      <div className={style.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={style.submit}>Comfirm</button>
      </div>
    </form>
  );
};

export default Checkout;
