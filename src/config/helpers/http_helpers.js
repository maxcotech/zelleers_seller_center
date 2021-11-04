import {toast} from "react-toastify";

export const handleAxiosError = (ex,callback = null) => {
    if(callback) callback();
    if(ex){
        if(ex.response?.data){
            toast.error(ex.response.data.message ?? "sorry, unknown error occurred.");
            return;
        }
    }
    toast.error('Sorry, An error occurred, please contact the developers.');
}