import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isStoreStaff } from '../helpers/auth_helpers';

const AuthGuard = ({ component: Component, redirectTo, loggedIn, currentRoute, userRole, userStore = null, ...rest }) => {
    const currentStoreIsSet = () => {
        return (userStore === null)? false : true;
    }
    const store_list = useSelector(state => state.store.stores);
    return <Route {...rest} render={(props) => {

        let validPath = ['/store/create', '/logout','/store/select'];

        if (loggedIn !== false) {
            if (userRole != null && isStoreStaff(userRole)) {
                //to redirect user to create a store if he has none
                if(!currentStoreIsSet() && !validPath.includes(props.location.pathname)){
                   if(store_list.length > 0){
                       console.log('redirecting to select store view');
                       return <Redirect to={{pathname:"/store/select"}} />
                   } else {
                       console.log('redirecting to create store');
                       return <Redirect to={{pathname:'/store/create'}} />
                   }
                   
                }
                else if(currentStoreIsSet() && validPath[0] === props.location.pathname){
                    console.log('redirecting to dashboard...')
                    return <Redirect to={{pathname:'/dashboard'}} />
                }
                else {
                    console.log('returning generic component');
                    return <Component {...props} />
                }
            } 
            else {
                if(validPath[1] === props.location.pathname){
                    return <Component {...props} />
                } else {
                    console.log('redirecting to invalid account page');
                    return <Redirect to={{pathname:"/invalid-account"}} />
                }
            }
        } else {
            console.log('redirecting to login...',loggedIn);
            return <Redirect to={{ pathname: redirectTo, state: { from: props.location } }} />
        }
    }} />
}

export default AuthGuard;