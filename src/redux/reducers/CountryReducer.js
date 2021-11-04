const { COUNTRY_ACTION_TYPES } = require("../action_types/CountryActionTypes");

const initState = {
    countries:[]
}

const CountryReducer = (state = initState, action) => {
    switch(action.type){
        case COUNTRY_ACTION_TYPES.setCountries:
            return {...state,countries:action.payload}
        default:return state;
    }
}

export default CountryReducer;