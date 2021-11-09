import { CATEGORY_ACTION_TYPES } from "../action_types/CategoryActionTypes";

const initState = {
    categories:[],
    links:[]
}


const CategoryReducer = (state = initState,action) => {
    switch(action.type){
        case CATEGORY_ACTION_TYPES.setCategories:
            const payload = action.payload;
            return {...state,categories:payload.data,links:payload.links};
        default: return state;
    }
}

export default CategoryReducer;