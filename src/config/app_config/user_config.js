export const UserRoles = {
    storeOwner: 12,
    storeStaff: 10,
    superAdmin: 24,
    customer: 1
}

export const StoreRoles = {
    storeOwner: 12,
    storeWorker: 10,
    storeManager: 11
}

export const UserStatus = {
    inactive : 0,
    active : 1,
    readOnly : 2,
}

export const getUserTypeText = (type) => {
    switch(type){
        case UserRoles.customer:return "Customer";
        case UserRoles.storeOwner:return "Store Owner";
        case UserRoles.storeStaff:return "Store Staff";
        case UserRoles.superAdmin:return "Super Admin";
        default: return "Unknown";
    }
}

export const getUserStatusText = (type) => {
    switch(type){
        case UserStatus.inactive:return "Inactive";
        case UserStatus.active: return "Active";
        case UserStatus.readOnly: return "Read Only";
        default: return "Unknown";
    }
}