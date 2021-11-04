import { combineReducers } from "redux";
import AppReducer from "./AppReducer";
import AuthReducer from "./AuthReducer";
import CountryReducer from "./CountryReducer";
import StaffTokenReducer from "./StaffTokenReducer";
import StoreReducer from "./StoreReducer";

const rootReducers = combineReducers({
    auth:AuthReducer,
    app:AppReducer,
    store:StoreReducer,
    country:CountryReducer,
    staff_token:StaffTokenReducer
});

export default rootReducers;