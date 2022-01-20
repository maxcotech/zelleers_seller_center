
import { DASHBOARD_ACTION_TYPES } from './../action_types/DashboardActionTypes';

const initState = {
    stock_data:{
        stock_quantity:0,
        stock_value:0,
        total_products:0
    },
    total_completed_orders:0,
    revenues:{
        daily_revenue:0,
        monthly_revenue:0,
        yearly_revenue:0,
        all_time_revenue:0
    },
    data:[],
    links:[],
    current_link:null,
    params:{}

}

const DashboardReducer = (state = initState,{payload,type}) => {
    switch(type){
        case DASHBOARD_ACTION_TYPES.setDashboardData:{
            const {stock_data,total_completed_orders,data,links,revenues} = payload;
            return {...state,stock_data,total_completed_orders,data,links,revenues};
        };
        case DASHBOARD_ACTION_TYPES.setParams:{
            return {...state,params:payload};
        };
        case DASHBOARD_ACTION_TYPES.setCurrentLink:{
            return {...state,current_link:payload};
        };
        default:return state;
    }
}

export default DashboardReducer;