import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formData, setFormData] = useState({
    name: true,
    street: true,
    postalcode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const isValidName = isNotEmpty(enteredName);
    const isValidStreet = isNotEmpty(enteredStreet);
    const isValidPostalCode = isFiveChars(enteredPostalCode);
    const isValidCity = isNotEmpty(enteredCity);

    setFormData({
      name: isValidName,
      street: isValidStreet,
      postalcode: isValidPostalCode,
      city: isValidCity,
    });

    const isFormValid =
      isValidName && isValidStreet && isValidPostalCode && isValidCity;

    if (!isFormValid) {
      return;
    }

    //Submit the code.
    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      postalcode: enteredPostalCode,
      city: enteredCity,
    });
  };

  const nameControlClasses = `${classes.control} ${
    !formData.name ? classes.invalid : ""
  }`;

  const streetControlClasses = `${classes.control} ${
    !formData.street ? classes.invalid : ""
  }`;

  const cityControlClasses = `${classes.control} ${
    !formData.city ? classes.invalid : ""
  }`;

  const postalControlClasses = `${classes.control} ${
    !formData.postalcode ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formData.name && <p>Invalid Name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formData.street && <p>Invalid Street</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formData.postalcode && <p>Invalid Postal Code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formData.city && <p>Invalid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
