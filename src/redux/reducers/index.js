import { combineReducers } from "redux";
import { AUTH_ACTION_TYPES } from "../action_types/AuthActionTypes";
import AppReducer from "./AppReducer";
import AuthReducer from "./AuthReducer";
import CategoryReducer from "./CategoryReducer";
import CountryReducer from "./CountryReducer";
import CurrentProductReducer from "./CurrentProductReducer";
import ProductReducer from "./ProductReducer";
import StaffTokenReducer from "./StaffTokenReducer";
import StoreReducer from "./StoreReducer";
import VariationOptionReducer from "./VariationOptionReducer";

const appReducers = combineReducers({
    auth:AuthReducer,
    app:AppReducer,
    store:StoreReducer,
    country:CountryReducer,
    staff_token:StaffTokenReducer,
    current_product:CurrentProductReducer,
    category:CategoryReducer,
    variation_option:VariationOptionReducer,
    product:ProductReducer
});

const rootReducers = (state,action) => {
    if(action.type ===  AUTH_ACTION_TYPES.logoutUser){
        return appReducers(undefined,action);
    }
    return appReducers(state,action);
}

export default rootReducers;