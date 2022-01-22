
import { getService } from './ActionServices';
import { BASE_URL } from './../../config/constants/app_constants';
import { CUSTOMERS_ACTION_TYPES } from './../action_types/CustomersActionTypes';

export const defaultCustomerUrl = `${BASE_URL}store/users`;
export const setCustomers = (payload) => ({type:CUSTOMERS_ACTION_TYPES.setCustomers,payload});
export const setCurrentLink = (payload) => ({type:CUSTOMERS_ACTION_TYPES.setCurrentLink,payload});
export const setParams = (payload) => ({type:CUSTOMERS_ACTION_TYPES.setParams,payload});

export const fetchCustomers = (url = null, params = {}, iloader = null, onComplete = null) => {
    return (dispatch) => {
        const currentPath = url ?? defaultCustomerUrl;
        dispatch(getService(currentPath,{params,iloader,onComplete:(data) => {
            dispatch(setCustomers(data));
            dispatch(setCurrentLink(currentPath));
            dispatch(setParams(params));
            if(onComplete) onComplete(data);
        }}))
    }
}