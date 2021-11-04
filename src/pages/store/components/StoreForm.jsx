import { CButton, CCol, CFormGroup, CInput, CLabel, CRow, CSelect } from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "src/redux/actions/CountryActions";

const StoreForm = (props) => {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.country.countries);
    const [formState,setFormState] = useState(props.defaultData ?? {
        store_name:"",store_email:"",
        store_telephone:"",store_logo:"",
        country_id:""
    });
    const submitForm = () => {
        props.submitHandler(formState);
    }
    useEffect(() => {
        if(countries.length === 0){
            dispatch(fetchCountries());
        }
    },[])

    const setFormStateValue = (value,key) => {
        setFormState({
            ...formState,
            [key]:value
        })
    }
    return (
        <form encType="multipart/form-data">
            <CFormGroup>
                <CLabel>Store Name<span className="text-danger">*</span></CLabel>
                <CInput 
                    placeholder="Enter Store Name"
                    value={formState.store_name} 
                    onChange={(e) => setFormStateValue(e.target.value,'store_name')}  
                />
            </CFormGroup>
            
            <CFormGroup>
                <CRow>
                    <CCol>
                        <CLabel>Store Telephone</CLabel>
                        <CInput 
                            placeholder="Enter Store Telephone number"
                            type="tel"
                            value={formState.store_telephone}
                            onChange={(e) => setFormStateValue(e.target.value,'store_telephone')}
                        />
                    </CCol>
                    <CCol>
                        <CLabel>Store Logo</CLabel>
                        <CInput 
                            type="file"
                            onChange={(e) => 
                                setFormStateValue(e.target.files[0],'store_logo')}
                        />
                    </CCol>
                </CRow>
                
            </CFormGroup>
            <CFormGroup>
                <CLabel>Store Email Address</CLabel>
                <CInput 
                    placeholder="Enter Store Email"
                    value={formState.store_email}
                    onChange={(e) => setFormStateValue(e.target.value,'store_email')}
                />
            </CFormGroup>
            <CFormGroup>
                <CLabel>Store Country<span className="text-danger">*</span></CLabel>
                <CSelect value={formState.country_id}
                    onChange={(e) => setFormStateValue(e.target.value,'country_id')}>
                    <option value="">Select Store Country</option>
                    {
                        countries.length > 0?
                            countries.map((item,index) => {
                                return <option key={index} value={item.id}>{item.country_name}</option>
                            }):<option disabled>Loading...</option>
                    }
                </CSelect>
            </CFormGroup>
            <CFormGroup>
                <CButton onClick={() => submitForm()} block color="primary"> Submit</CButton>
            </CFormGroup>

        </form>
    )
}

export default StoreForm;