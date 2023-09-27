import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/actions/productActions';
import ProductDetails from './ProductDetails';
import '../App.css';

export const ProductComponent = () => {
  const products = useSelector((state) => state.allproducts.products);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  
  // Check if products is an array before mapping
  if (!Array.isArray(products)) {
    return <div>Loading...</div>; // You can show a loading message or handle the case where products is not an array
  }

  const renderList = products.map((product) => {
    return (
      <div className="four wide column" key={product._id}>
        <Link to={`/products/${product._id}`}>
          <div className="ui link cards">
            <div className="card">
              <div className="image-container">
                {product.image[0] && (
                  <img
                    src={product.image[0].url}
                    alt={product.title}
                    className="product-image"
                  />
                )}
              </div>
              <div className="content">
                <div className="header">Name: {product.name}</div>
                <div className="meta price">Price: $ {Math.floor(product.price)}</div>
                <div className="meta price">Category: {product.category}</div>
              </div>
            </div>
          </div>
        </Link>
        <button
          className="ui button blue"
          key={product.id}
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    );
  });

  return (
    <>
      {renderList}
      <ProductDetails handleAddToCart={handleAddToCart} />
    </>
  );
};
