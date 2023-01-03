import axios from "axios"
import { CART_ADD_ITEM, CART_CLEAR_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_SCREEN, CART_SAVE_SHIPPING_ADDRESS } from "../Constants/CartConstants";

export const addToCart = (id,qty) => async(dispatch,getState) =>{
    const {data} =await axios.get(`/api/books/${id}`);
    dispatch({
        type:CART_ADD_ITEM,
        payload:{
            product:data._id,
            name:data.title,
            image:data.image,
            countInStock:data.countInStock,
            qty:1,

        },
    });
    localStorage.setItem("cartItems" ,JSON.stringify(getState().cart.cartItems));
}
//REMOVE PRODUCT FROM CART
export const removeFromcart=(id) => (dispatch,getState) => {
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id,
    });
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

export const clearcart=()=>(dispatch)=>{
    dispatch({
        type:CART_CLEAR_ITEM
    })
}
//SAVE SHIPPING ADDRESS
export const saveShippingAddress=(data) => (dispatch) => {
    dispatch({
        type:CART_SAVE_SHIPPING_ADDRESS,
        payload:data,
    });
    localStorage.setItem("shippingAddress",JSON.stringify(data))
}

//SAVE PAYMENT METHOD
export const savePaymentMethod=(data) => (dispatch)=>{
    dispatch({
        type:CART_SAVE_PAYMENT_SCREEN,
        payload:data,
    });
    localStorage.setItem("paymentMethod",JSON.stringify(data))
}