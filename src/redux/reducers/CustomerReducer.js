import { CUSTOMERS_ACTION_TYPES } from './../action_types/CustomersActionTypes';

const initState = {
    customers:[],
    current_link:null,
    params:{},
    links:[]
}
const CustomerReducer = (state = initState, {type,payload}) => {
    switch(type){
        case CUSTOMERS_ACTION_TYPES.setCustomers:{
            const {data,links} = payload;
            return {...state,customers:data,links};
        };
        case CUSTOMERS_ACTION_TYPES.setCurrentLink:
            return {...state,current_link:payload};
        case CUSTOMERS_ACTION_TYPES.setParams:
            return {...state,params:payload};
        default: return state;
    }
}

export default CustomerReducer;