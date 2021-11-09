import { useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "src/components/Spinner";

const { CCard, CCardBody, CFormGroup, CLabel, CInput, CButton } = require("@coreui/react")

const BrandForm = (props) => {

    const loading = useSelector(state => state.app.loading);
    const [formState,setFormState] = useState({
        brand_name:"",website_url:"",
        brand_logo:null
    });

    const setFormStateValue = (val,key) => {
        setFormState({
            ...formState,
            [key]:val
        })
    }

    const onFormSubmit = () => {
        if(loading) return;
        let formData = new FormData();
        let keys = Object.keys(formState);
        keys.forEach((key) => {
            if(formState[key] !== "" && formState[key] !== null){
                formData.append(key,formState[key]);
            }
        })
        props.onFormSubmit(formData);
    }

    return (
        <CCard>
            <CCardBody>
                <CFormGroup>
                    <CLabel>Brand Name<span className="text-danger">*</span></CLabel>
                    <CInput 
                        placeholder="Enter Brand Name" 
                        value={formState.brand_name} 
                        onChange={(e)=>setFormStateValue(e.target.value,'brand_name')}
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Brand Website</CLabel>
                    <CInput 
                        type="url"
                        placeholder="Enter Brand Website Url" 
                        value={formState.website_url} 
                        onChange={(e)=>setFormStateValue(e.target.value,'website_url')}
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Brand Logo</CLabel>
                    <CInput 
                        type="file"
                        onChange={(e)=>setFormStateValue(e.target.files[0],'brand_logo')}
                    />
                </CFormGroup>
                <CFormGroup>
                    <CButton onClick={onFormSubmit} color="primary"><Spinner status={loading} /> Submit</CButton>
                </CFormGroup>
            </CCardBody>
        </CCard>
    )
}

export default BrandForm;