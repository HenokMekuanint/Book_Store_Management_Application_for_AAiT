import axios from "axios"
import { ORDER_CREATE_REQUEST } from "../Constants/OrderConstants"
import {PRODUCTION_LIST_REQUEST, PRODUCTION_LIST_SUCCESS, PRODUCTION_LIST_FAIL, PRODUCTION_CREATE_REVIEW_REQUEST, PRODUCTION_CREATE_REVIEW_SUCCESS, PRODUCTION_CREATE_REVIEW_RESET,PRODUCTION_CREATE_REVIEW_FAIL} from "../Constants/ProductConstants"
import {PRODUCTION_DETAIL_REQUEST, PRODUCTION_DETAIL_SUCCESS, PRODUCTION_DETAIL_FAIL} from "../Constants/ProductConstants"
import { logout } from "./userActions";
//LIST ALL PRODUCT 
export const listProduct = (keyword=" ",pageNumber=" ")=> 
    
    async (dispatch)=>{
    try{
        dispatch({type:PRODUCTION_LIST_REQUEST})
        const {data}=await axios.get(`/api/books?keyword=${keyword}&pageNumber=${pageNumber}`);
        dispatch({type:PRODUCTION_LIST_SUCCESS,payload:data})
    }catch(error){
        dispatch({
            type:PRODUCTION_LIST_FAIL,
            payload:error.response && error.response.data.message 
            ? error.response.data.message
            :error.message,
        })
    }
}
//SINGLE PRODUCT
export const listProductDetails = (id)=> async (dispatch)=>{
    try{
        dispatch({type:PRODUCTION_DETAIL_REQUEST})
        const {data}=await axios.get(`/api/books/${id}`);

        dispatch({type:PRODUCTION_DETAIL_SUCCESS,payload:data})
    }catch(error){
        dispatch({
            type:PRODUCTION_DETAIL_FAIL,
            payload:
            
            error.response && error.response.data.message 
            ? error.response.data.message
            :error.message,
        })
    }
}



//PRODUCT REVIEW CREATE
export const createProductReview = 
    (productId,review)=> async (dispatch,getState)=>{
        console.log(review)
    try{
        dispatch({type:PRODUCTION_CREATE_REVIEW_REQUEST});

        const {
            userLogin:{userInfo},
        }= getState();
        
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            },
        };
        await axios.post(`/api/books/${productId}/review`,review,config);

        dispatch({type:PRODUCTION_CREATE_REVIEW_SUCCESS});
    }catch(error){
        const message = 
        error.response && error.response.data.message 
        ? error.response.data.message
        :error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout())
        }
        dispatch({
            type:PRODUCTION_CREATE_REVIEW_FAIL,
            payload:message
        })


    }
}