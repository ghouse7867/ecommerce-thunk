import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, removeSelectedProduct, addToCart} from "../redux/actions/productActions";
import "../App.css";

const ProductDetails = () => {
  const { id } = useParams();
  let product = useSelector((state) => state.product);
  const products = product.product || {};
  const { image, name, price, category, description } = products
  const dispatch = useDispatch(); 

  const handleAddToCart = (product) => {
     console.log("clicked")
    dispatch(addToCart(product));
  };
  
  useEffect(() => {
    if (id && id !== "") dispatch(fetchProduct(id));
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [id]);
  return (
    <div style = {{ padding: "100px"}}>
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        null
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
              {image[0] && (
                <img
                  src={image[0]?.url || image[0]} 
                  alt={name || "image"}
                  className="product-image"
                />
              )}
              </div>
              <div className="column rp">
                <h1>{name}</h1>
                <h2>
                  <a className="ui green tag label">${price}</a>
                </h2>
                <h3 className="ui teal block header">{category}</h3>
                <p className="ui grey header">{description}</p>
                <div className="ui vertical animated button" tabIndex="0">
                  <div className="">
                    <i className=""></i>
                  </div>
                  <div className="ui button"><button key={product._id} onClick={() => handleAddToCart(products)}>Add to Cart</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ProductDetails;