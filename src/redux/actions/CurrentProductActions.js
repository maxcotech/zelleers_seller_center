import axios from "axios"
import { toast } from "react-toastify"
import { BASE_URL } from "src/config/constants/app_constants"
import { removeIrrelevantAttributes } from "src/config/helpers/array_helpers"
import { handleAxiosError } from "src/config/helpers/http_helpers"
import { CURRENT_PRODUCT_TYPE } from "../action_types/CurrentProductType"
import { setLoading } from "./AppActions"

export const setWholeCurrentProduct = (payload) => {
    let data = {...payload};
    const galleryImageLabels = ['front_image','back_image','side_image','fourth_image','fifth_image'];
    galleryImageLabels.forEach((item) => {
        data = appendGalleryImageUrl(data,item);
    })
    data = appendCategoryAndBrandNames(data);
    data = removeIrrelevantAttributes(data,['images','category','brand'])
    return (dispatch) => {
        dispatch(setCurrentProduct(data));
    }
}

export const appendCategoryAndBrandNames = (data) => {
    if(data.category !== null && typeof data.category !== "undefined"){
        data['category_title'] = data.category.category_title;
    }
    if(data.brand !== null && typeof data.brand !== "undefined"){
        data['brand_name'] = data.brand.brand_name;
    }
    return data;
}

export const setCurrentProduct = (data) => {
    return {
        type:CURRENT_PRODUCT_TYPE.setCurrentProduct,
        payload:data
    }
}
 


export const appendGalleryImageUrl = (payload,image_type) => {
    const data = {...payload}
    data[image_type] = null;
    if(payload.images?.length > 0){
        payload.images.forEach((item) => {
            if(item.image_type === image_type){
                data[image_type] = item.image_url;
            }
        })
    }
    return data;
}

export const setProductAttribute = (value,key) => {
    return (dispatch) => {
        dispatch(setCurrentProduct({[key]:value}))
    }
}

export const uploadMainProductImage = (image_file,setILoading = null) => {
    return (dispatch,getState) => {
        setILoading? setILoading(true): dispatch(setLoading(true));
        console.log('...uploading main product image');
        const fdata = new FormData();
        const state = getState();
        fdata.append('image_file',image_file);
        fdata.append('store_id',state.store.current_store?.id);
        if(state.current_product?.id !== null) fdata.append('product_id',state.current_product.id);
        if(state.current_product?.main_product_image !== null) fdata.append('old_image_url',state.current_product.main_product_image);
        axios.post(`${BASE_URL}product/image`,fdata)
        .then((result) => {
            setILoading? setILoading(false):dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(setProductAttribute(result.data.data?.image_full_path,"main_product_image"))
            } else {
                toast.error(result.data?.message ?? "An Error occurred");
            }
        })
        .catch((ex) => {
            setILoading? setILoading(false):dispatch(setLoading(false));
            handleAxiosError(ex);
        })
    }
}

export const uploadGalleryImage = (image_file,label,setILoading) => {
    return (dispatch,getState) => {
        const fdata = new FormData();
        const state = getState();
        fdata.append('image_file',image_file);
        fdata.append('image_type',label);
        fdata.append('store_id',state.store.current_store?.id);
        if(state.current_product[label] !== null) fdata.append('old_image_url',state.current_product[label]);
        if(state.current_product['id'] !== null) fdata.append('product_id', state.current_product['id']);
        setILoading? setILoading(true): dispatch(setLoading(true));
        axios.post(`${BASE_URL}product/gallery_image`,fdata).then((result) => {
            setILoading? setILoading(false): dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(setProductAttribute(result.data.data?.image_full_path,label))
            } else {
                toast.error(result.data?.message ?? "An Error Occurred");
            }
        })
        .catch((ex) => {
            setILoading? setILoading(false): dispatch(setLoading(false));
            handleAxiosError(ex);
        })
    }
}