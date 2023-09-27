// src/components/Cart.js
import React from "react";
// import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/actions/productActions";
import { CartSummary } from "./cartSummary";
import { updateQuantity } from "../redux/actions/productActions";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  
   console.log(cartItems);
   const dispatch = useDispatch();

  const handleRemoveFromCarts = (_id) => {
    console.log('Removing product with ID:', _id);
    dispatch(removeFromCart(_id));
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const handleRemoveFromCart = (_id) => {
    dispatch(removeFromCart(_id));
  };

  const handleIncreaseQuantity = (_id) => {
    dispatch(updateQuantity(_id, 1)); // Increase quantity by 1
  };

  const handleDecreaseQuantity = (_id) => {
    dispatch(updateQuantity(_id, -1)); // Decrease quantity by 1
  };

  const filteredCartItems = cartItems.filter((item) => item.quantity > 0); 
  console.log(cartItems)

  return (
    <div className="ui grid container">
      <h1>Your Cart</h1>
      <div className="ui list">
        {cartItems?.map((item, index) => (
          <div className="item" key={`${item._id}-${index}`}>
            <div className="right floated content">
              <button className="ui button red" onClick={() => handleRemoveFromCarts(item._id)}>
                Remove
              </button>
            </div>
            <div className="content">
            {item.image && (
                <img
                  src={item.image[0].url || item.image}
                  alt={item.name}
                  className="product-image"
                />
              )}
            <p className="ui grey header"><b>Item price : {Math.floor(item.price)}</b></p>
              <h3 className="ui teal header">{item.name}</h3>
                <p className="ui black header"><b>Item qty : {item.quantity}</b></p>
                <p className="ui black header"><b>Amount: ${item.totalPrice}</b></p>
                <button className="qty" onClick={() => handleDecreaseQuantity(item._id)}> - </button>
                <button className="qty" onClick={() => handleIncreaseQuantity(item._id)}> + </button>
            </div>
          </div>
        ))}
      </div>
      <div>
      {filteredCartItems.length > 0 && (
        <div>
         <CartSummary 
      handleDecreaseQuantity = {handleDecreaseQuantity} 
      handleIncreaseQuantity = {handleIncreaseQuantity}
      handleRemoveFromCart = {handleRemoveFromCart}
      />
        </div>
      )}
      </div>
    </div>
    
  );
};

export default Cart;
