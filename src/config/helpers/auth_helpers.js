import { UserRoles } from "../app_config/user_config"

export const isStoreStaff = (role) => {
    switch(role){
        case UserRoles.storeStaff: return true;
        case UserRoles.storeOwner:return true;
        default: return false;
    }
}