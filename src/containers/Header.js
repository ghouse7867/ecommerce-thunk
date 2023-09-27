import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Calculate the total number of cart items
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className='ui fixed menu'>
       <div className='ui container center header-container'>
        <Link to="/"> E-commerce Shopping </Link>
        <Link to = "addproducts">Add New Product</Link>
         {/* Cart container with position relative */}
         <div className="cart-icon-container">
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
            {/* Count badge */}
            {totalCartItems > 0 && (
              <span className="cart-item-count">{totalCartItems}</span>
            )}
          </Link>
          </div>
      </div>
    </div>

  )
}

export default Header;