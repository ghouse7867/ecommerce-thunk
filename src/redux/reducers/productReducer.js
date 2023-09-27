import { ActionTypes } from "../constants/action-types";

const initialState = {
    products: [],
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
  resPerPage: 0, // Initialize resPerPage to 0
  ProductCount: 0, // Initialize productCount to 0
    
}

export const productReducer = (state = initialState, { type, payload }) => {
    console.log(payload)
    switch (type) {
        case ActionTypes.SET_PRODUCTS:
            return { ...state, products: payload.products };
        case ActionTypes.FETCH_PRODUCTS:
            return { ...state,
                products: payload.products,
                resPerPage: payload.resPerPage, // Set resPerPage from the payload
                ProductCount: payload.ProductCount, 
              };
        default:
            return state;
    }
}

export const selectedProductsReducer = (state = {}, { type, payload }) => {
    console.log(type);
    switch (type) {
        case ActionTypes.SELECTED_PRODUCTS:
            return { ...state, ...payload, };
        case ActionTypes.REMOVE_SELECTED_PRODUCTS:
            return {};
        default:
            return state;
    }
};

export const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case ActionTypes.ADD_TO_CART:
        const { _id, price, image, name } = payload;
        console.log(payload)

       
        const existingProductIndex = state.cartItems.findIndex(
          (item) => item._id === _id
        );
  
        if (existingProductIndex !== -1) {
          // If the product already exists in the cart, update its quantity and total price
          const updatedCartItems = state.cartItems.map((item) => {
            if (item._id === _id) {
              return {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.totalPrice + price,
                image: item.image[0]?.url,
                name:item.name
              };
            }
            return item;
          });
  
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
          return { ...state, cartItems: updatedCartItems };
        } else {
          // If the product is not in the cart, add it as a new item
          const newCartItem = {
            _id,
            name,
            image,
            price,
            quantity: 1,
            totalPrice: price,
          };
  
          const updatedCartItems = [...state.cartItems, newCartItem];
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
          return { ...state, cartItems: updatedCartItems };
        }
  
      case ActionTypes.REMOVE_FROM_CART:
        const filteredCartItems = state.cartItems.filter(
          (item) => item._id !== payload
        
        );
        console.log(payload)
        localStorage.setItem("cartItems", JSON.stringify(filteredCartItems));
        return { ...state, cartItems: filteredCartItems };
  
      case ActionTypes.UPDATE_QUANTITY:
        const { productId, quantity } = payload;
  
        const updatedCartItems = state.cartItems.map((item) => {
          if (item._id === productId) {
            // Update the quantity of the matching product
            const newQuantity = item.quantity + quantity;
  
            // Remove the item if the quantity becomes zero or negative
            if (newQuantity <= 0) {
              return null;
            }
  
            const newTotalPrice = item.price * newQuantity;
  
            return { ...item, quantity: newQuantity, totalPrice: Math.floor(newTotalPrice) };
          }
          return item;
        });
  
        const filteredCartItemse = updatedCartItems.filter((item) => item !== null);
        localStorage.setItem("cartItems", JSON.stringify(filteredCartItemse));
        return { ...state, cartItems: filteredCartItemse };
  
      default:
        return state;
    }
  };

  export const newProductReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.ADD_PRODUCT:
            console.log('Reducer: ADD_PRODUCT action called with payload:', payload);
            return { ...state, products: payload};
        default:
            return state;

};
};