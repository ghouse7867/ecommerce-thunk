// import logo from './logo.svg';
import React, { useEffect } from "react";
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './containers/Header';
import ProductListing from './containers/ProductListing.js';
import ProductDetails from './containers/ProductDetails.js';
import Cart from './containers/Cart';
import { fetchCartItems } from './redux/actions/productActions';
import { useDispatch } from "react-redux";
import ProductForm from  "./containers/ProductForm";

function App() {
  const dispatch = useDispatch();
 

  useEffect(() => {
    // Dispatch the action to fetch cart items when the app loads
    dispatch(fetchCartItems());
  }, []);

  return (
    <div className="App">
          <Header />
        <Routes>
        <Route path="/" exact element={<ProductListing />}/>
        <Route path="/products/:id" element = {<ProductDetails />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/search/:keyword" element={<ProductListing />} />
        <Route >404 Not Found!</Route>
        <Route path = "/addproducts"  element={<ProductForm /> }/>
      </Routes>

    </div>
  );
}

export default App;
