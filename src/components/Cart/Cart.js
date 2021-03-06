import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [checkout, setCheckout] = useState(false);
  const [uploadingData, setUploadingData] = useState(false);
  const [uploadedData, setUploadedData] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const checkoutHandler = (event) => {
    setCheckout(true);
  };

  const onSubmitHandler = async (userData) => {
    setUploadingData(true);
    await fetch(
      "https://react-http-46554-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setUploadingData(false);
    setUploadedData(true);
    cartCtx.clearCart();
  };

  const actionButtons = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.hideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={checkoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const modalData = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span> {totalAmount}</span>
      </div>
      {checkout && (
        <Checkout onSubmit={onSubmitHandler} onCancel={props.hideCart} />
      )}
      {!checkout && actionButtons}
    </React.Fragment>
  );

  return (
    <Modal hideCart={props.hideCart}>
      {!uploadingData && !uploadedData && modalData}
      {uploadingData && <p>Uploading Data to the server.</p>}
      {uploadedData && (
        <React.Fragment>
          <p>Uploaded Data. You will be contacted soon!</p>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.hideCart}>
              Close
            </button>
          </div>
        </React.Fragment>
      )}
    </Modal>
  );
};

export default Cart;
