import { getService, postService } from './ActionServices';
import { WALLET_ACTION_TYPES } from './../action_types/WalletActionTypes';
import { BASE_URL } from './../../config/constants/app_constants';

export const defaultWalletUrl = `${BASE_URL}store/wallet`;

export const setWalletData = (payload) => ({type:WALLET_ACTION_TYPES.setWalletData,payload});
export const setCurrentLink = (payload) => ({type:WALLET_ACTION_TYPES.setCurrentLink,payload});
export const setParams = (payload) => ({type:WALLET_ACTION_TYPES.setParams,payload});
export const setBankAccounts = (payload) => ({type:WALLET_ACTION_TYPES.setBankAccounts,payload});

export const fetchStoreWallet = (url = null,params = {},iloader = null,onComplete = null) => {
    return (dispatch) => {
        const currentPath = url ?? defaultWalletUrl;
        dispatch(getService(currentPath,{params,iloader,onComplete:(data) => {
            dispatch(setWalletData(data));
            dispatch(setCurrentLink(currentPath));
            dispatch(setParams(params));
            if(onComplete) onComplete(data);
        }}))
    }
}

export const fetchBankAccounts = (params = {},iloader = null,onComplete = null) => {
    return (dispatch) => {
        dispatch(getService(`${BASE_URL}store/bank_accounts`,{params,iloader,onComplete:(data) => {
            dispatch(setBankAccounts(data));
            if(onComplete) onComplete(data);
        }}))
    }
}

export const createWithdrawalRequest = (data,iloader = null, onComplete = null) => {
    return (dispatch) => {
        dispatch(postService(`${BASE_URL}withdrawal_request`,data,{iloader,onComplete}))
    }
}

export const createBankAccount = (data,iloader = null, onComplete = null) => {
    return (dispatch) => {
        dispatch(postService(`${BASE_URL}store/bank_account`,data,{iloader,onComplete}))
    }
}