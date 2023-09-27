import { combineReducers } from "redux";
import { productReducer, selectedProductsReducer, cartReducer} from "./productReducer";
// import {  cartReducer } from "./cartReducer"

const reducers = combineReducers({
    allproducts : productReducer,
    product: selectedProductsReducer,
    cart: cartReducer
})

export default reducers;