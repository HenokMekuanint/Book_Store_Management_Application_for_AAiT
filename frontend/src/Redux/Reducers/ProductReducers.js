import { PRODUCTION_LIST_REQUEST ,PRODUCTION_LIST_SUCCESS,PRODUCTION_LIST_FAIL, PRODUCTION_CREATE_REVIEW_REQUEST, PRODUCTION_CREATE_REVIEW_SUCCESS, PRODUCTION_CREATE_REVIEW_FAIL, PRODUCTION_CREATE_REVIEW_RESET} from "../Constants/ProductConstants";
import { PRODUCTION_DETAIL_REQUEST ,PRODUCTION_DETAIL_SUCCESS,PRODUCTION_DETAIL_FAIL} from "../Constants/ProductConstants";
//ALL PRODUCT
export const productListReducer=(state={products:[]},action)=>{
    switch(action.type){
        case PRODUCTION_LIST_REQUEST:
            return { loading:true,products:[]};
        case PRODUCTION_LIST_SUCCESS:
            return { loading:false, 
                pages:action.payload.pages,
                page:action.payload.page,
                products:action.payload.products
            };
        case PRODUCTION_LIST_FAIL:
            return { loading:false,error:action.payload};
        default:
            return state;
    }
}
//SINGLE PRODUCT
export const productDetailsReducer=(state={product:{reviews:[]}},action)=>{
    switch(action.type){
        case PRODUCTION_DETAIL_REQUEST:
            return { ...state,loading:true };
        case PRODUCTION_DETAIL_SUCCESS:
            return { loading:false, product:action.payload};
        case PRODUCTION_DETAIL_FAIL:
            return { loading:false,error:action.payload};
        default:
            return state;
    }
}
//PRODUCT REVIEW
export const productCreateReviewReducer=(
    state={},
    action)=>{
    switch(action.type){
        case PRODUCTION_CREATE_REVIEW_REQUEST:
            return {loading:true };
        case PRODUCTION_CREATE_REVIEW_SUCCESS:
            return { loading:false, success:true};
        case PRODUCTION_CREATE_REVIEW_FAIL:
            return { loading:false,error:action.payload};
            case PRODUCTION_CREATE_REVIEW_RESET:
                return {};
        default:
            return state;
    }
}