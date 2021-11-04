import axios from "axios";
import { toast } from "react-toastify";
import { UserRoles } from "src/config/app_config/user_config";
import { BASE_URL } from "src/config/constants/app_constants";
import { handleAxiosError } from "src/config/helpers/http_helpers";
import { confirmAction } from "src/config/helpers/message_helpers";
import { STAFF_TOKEN_ACTION_TYPES } from "../action_types/StaffTokenActionTypes";
import { setLoading } from "./AppActions"

export const setStaffTokens = (payload) => {
    return {
        type:STAFF_TOKEN_ACTION_TYPES.setStaffTokens,
        payload:payload
    }
}

export const fetchStaffTokens = (url = null) => {
    return (dispatch,getState) => {
        const state = getState();
        dispatch(setLoading(true));
        axios.get(url ?? `${BASE_URL}store/staff/tokens`,{params:{
            store:state.store?.current_store?.id
        }})
        .then((result) => {
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(setStaffTokens(result.data.data));
            } else {
                toast.error(result.data?.message ?? "An Error Occurred.")
            }
        })
        .catch((ex) => {
            dispatch(setLoading(false));
            handleAxiosError(ex);
        })
    }
}

export const createStaffTokens = (data,onComplete = null) => {
    return (dispatch,getState) => {
        dispatch(setLoading(true));
        const state = getState();
        if(state.auth.user?.user_type == UserRoles.storeStaff){
            data.store_id = state.store.current_store?.id
        }
        axios.post(`${BASE_URL}store/staff/token`,data)
        .then((result) => {
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(fetchStaffTokens());
                toast.success("Successfully created staff token(s).");
                if(onComplete) onComplete();
            } else {
                toast.error(result.data?.message ?? "An Error occurred.")
            }
        })
        .catch((ex) => {
            handleAxiosError(ex);
            dispatch(setLoading(false));
        })
    }
}

export const toggleStaffTokenExpiry = (id,setInnerLoading = null) => {
    return (dispatch) => {
        setInnerLoading? setInnerLoading(true):dispatch(setLoading(true));
        axios.patch(`${BASE_URL}store/staff/token/${id}/toggle_expiry`)
        .then((result) => {
            setInnerLoading? setInnerLoading(false):dispatch(setLoading(false));
            if(result.data?.status === "success"){
                toast.success(result.data?.message);
                dispatch(fetchStaffTokens())
            } else {
                toast.error(result.data?.message ?? "An Error Occurred.");
            }
        })
        .catch((ex) => {
            setInnerLoading? setInnerLoading(false):dispatch(setLoading(false));
            handleAxiosError(ex)
        })
    }
}

export const deleteStaffToken = (id,setInnerLoading = null) => {
    return (dispatch) => {
        confirmAction({text:"This store token will be permanently deleted."}).then((confirmed) => {
            if(confirmed){
                setInnerLoading? setInnerLoading(true):dispatch(setLoading(true));
                axios.delete(`${BASE_URL}store/staff/token/${id}`)
                .then((result) => {
                    setInnerLoading? setInnerLoading(false):dispatch(setLoading(false));
                    if(result.data?.status === "success"){
                        dispatch(fetchStaffTokens());
                        toast.success('Staff token deleted successfully.');
                    } else {
                        toast.error(result.data?.message ?? "An Error Occurred.")
                    }
                })
                .catch((ex) => {
                    handleAxiosError(ex);
                    setInnerLoading? setInnerLoading(false):dispatch(setLoading(false));
                })
            }
        })
    }
}