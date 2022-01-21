import { WALLET_ACTION_TYPES } from './../action_types/WalletActionTypes';


const initState = {
    total_balance:0,
    locked_credits:0,
    unlocked_credits:0,
    total_debits:0,
    pending_requests:0,
    data:[],
    current_link:null,
    params:{},
    bank_accounts:[],
    links:[]
}


const WalletReducer = (state = initState, {type,payload}) => {
    switch(type){
        case WALLET_ACTION_TYPES.setWalletData:{
            const {links,data,total_balance,locked_credits,unlocked_credits,total_debits,pending_requests} = payload;
            return {
                ...state,
                links,data,total_balance,locked_credits,unlocked_credits,total_debits,pending_requests
            };
        };
        case WALLET_ACTION_TYPES.setCurrentLink:
            return {...state,current_link:payload};
        case WALLET_ACTION_TYPES.setParams:
            return {...state,params:payload};
        case WALLET_ACTION_TYPES.setBankAccounts:
            return {...state,bank_accounts:payload};
        default: return state;

    }
}

export default WalletReducer;