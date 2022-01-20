import { ORDER_ACTION_TYPES } from "../action_types/OrderActionTypes";

const initState = {
    orders:[],
    links:[],
    current_link:null,
    current_order_items:[],
    params:null
}

const OrderReducer = (state = initState, action) => {
    switch(action.type){
        case ORDER_ACTION_TYPES.setStoreOrders:
            const data = action.payload;
            return {
                ...state,
                orders:data.data,
                links:data.links
            };
        case ORDER_ACTION_TYPES.setCurrentLink:
            return {
                ...state,
                current_link:action.payload
            };
        case ORDER_ACTION_TYPES.setCurrentParams:
            return {
                ...state,
                params:action.payload
            };
        case ORDER_ACTION_TYPES.setCurrentOrderItems:
            return {
                ...state,
                current_order_items:action.payload
            }
        default:return state;
    }
}

export default OrderReducer;