import { ActionTypes } from "../constants/action-types";
import fakestoreapi from "../../apis/fakestoreapi";


//Create a new product

export const fetchProducts = (Keyword = '', currentPage = 1, category, price = [1, 1000], sortOption) =>async (dispatch) =>{

  if (!price || price.length !== 2) {
    price = [1, 1000]; // Set default price range
  }

      let link = `/products?keyword=${Keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`;
  
       if(category) {
        link = `/products?keyword=${Keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`;
       }


      const response = await fakestoreapi.get(link);

      console.log("Sort Option:", sortOption);

      console.log("API Request URL:", link);

      console.log(response.data); 

      // Ensure response.data is an array
      const products = response.data.products || [];
     const  resPerPage = response.data.resPerPage;
     const  ProductCount = response.data.productCount;
      
      dispatch( { type: ActionTypes.FETCH_PRODUCTS,
         payload : { products, resPerPage, ProductCount }})
   }

   export const fetchProduct = (id) =>async (dispatch) =>{
      const response = await fakestoreapi.get(`/products/${id}`);

      const products = response.data || [];
      console.log(products)

      dispatch( {type: ActionTypes.SELECTED_PRODUCTS, payload : products })
   }

   //Adding new product

   export const addProduct = (productData) => async (dispatch) =>{
    
    console.log('addProduct action called with data:', productData);
   
    const response = await fakestoreapi.post("/product/new", productData, {
      headers: {

        'Content-Type': 'multipart/form-data'
    },
    });

    const newProduct = response.data || [];

    console.log(newProduct)

    dispatch( {type: ActionTypes.ADD_PRODUCT, payload : newProduct })

    alert('Product saved successfully');
 }


export const setProducts = (products) => {
     return {
        type: ActionTypes.SET_PRODUCTS,
        payload : products,
     }
}

export const selectedProducts = (products) => {
    return {
       type: ActionTypes.SELECTED_PRODUCTS,
       payload : products,
    }
}
export const removeSelectedProduct = () => {
   return {
     type: ActionTypes.REMOVE_SELECTED_PRODUCTS,
   };
 };

 export const addToCart = (product) => {
   return {
     type: ActionTypes.ADD_TO_CART,
     payload: product,
   };
 };
 
 export const removeFromCart = (id) => {
   return {
     type: ActionTypes.REMOVE_FROM_CART,
     payload: id,
   };
 };

 export const fetchCartItems = () => (dispatch) => {
   const cartItems = localStorage.getItem("cartItems")
     ? JSON.parse(localStorage.getItem("cartItems"))
     : [];
 
   // Dispatch an action to update the cart items in the Redux store
   dispatch({
     type: ActionTypes.FETCH_CART_ITEMS,
     payload: cartItems,
   });
 };

 export const updateQuantity = (productId, quantity) => {
   return {
     type: ActionTypes.UPDATE_QUANTITY,
     payload: { productId, quantity },
   };
 };