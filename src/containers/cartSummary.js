import React from "react";
import { useSelector } from "react-redux";

export const CartSummary = ({handleDecreaseQuantity, handleIncreaseQuantity, handleRemoveFromCart}) => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  
  return (
    <div className="ui segment cart">
      <h3 style={{textAlign : "center", color: "red"}}><b>Cart Summary</b></h3>
      {cartItems.map((item, index) => (
        <div key={`${item._id}-${index}`}>
          <p>
          {item.image && (
                <img
                  src={item.image[0].url}
                  alt={item.name}
                  className="img-cart"
                />
              )}
            <br></br>{item.title}<br></br> Item Price: ${item.totalPrice} - <br></br>Quantity: {item.quantity}
          </p>
          <button className = "qty" onClick={() => handleDecreaseQuantity(item._id)}>-</button>
          <button className = "qty" onClick={() => handleIncreaseQuantity(item._id)}>+</button>
          <button onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
        </div>
      ))}
      <p>
        <br></br>
        <b className="total">Total Quantity: {cartItems.reduce((total, item) => total + item.quantity, 0)} </b>
      </p>
      <p>
        <br></br>
        <b className="total">Total Price: ${cartItems.reduce((total, item) => total + item.totalPrice, 0)} </b>
      </p>
      <p>
        <span className="ui button">Place Order</span>
      </p>
    </div>
  );
};