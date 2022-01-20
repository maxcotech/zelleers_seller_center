import { BASE_URL } from './../../config/constants/app_constants';
import { getService } from './ActionServices';
import { DASHBOARD_ACTION_TYPES } from './../action_types/DashboardActionTypes';


export const defaultDashboardUrl = `${BASE_URL}store/dashboard`;

export const setDashboardData = (payload) => ({type:DASHBOARD_ACTION_TYPES.setDashboardData,payload});
export const setCurrentLink = (payload) => ({type:DASHBOARD_ACTION_TYPES.setCurrentLink,payload});
export const setParams = (payload) => ({type:DASHBOARD_ACTION_TYPES.setParams,payload})

export const fetchDashboardData = (url = null, params = {}, iloader = null, onComplete = null) => {
    return (dispatch) => {
        const currentPath = url ?? defaultDashboardUrl;
        dispatch(getService(currentPath,{params,iloader,onComplete:(data) => {
            dispatch(setDashboardData(data));
            dispatch(setCurrentLink(currentPath));
            dispatch(setParams(params));
            if(onComplete) onComplete(data);
        }}))
    }
}