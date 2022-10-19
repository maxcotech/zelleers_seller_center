import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Spinner from "src/components/Spinner";
import { setCurrentProductVariations } from "src/redux/actions/CurrentProductActions";
import { fetchVariationOptions} from "src/redux/actions/VariationOptionActions";

const { CCard, CCardBody, CFormGroup, CLabel, CButton, CRow, CCol } = require("@coreui/react")

const VariationOptionForm = (props) => {
    const variationOptions = useSelector(state => state.variation_option.options);
    const loading = useSelector(state => state.app.loading);
    const dispatch = useDispatch();
    const [variationCount,setVariationCount] = useState(1);
    const [selectedOptions,setSelectedOptions] = useState([]);

    const appendOption = (option) => {
        if(!optionExistsInList(option)){
            setSelectedOptions([
                ...selectedOptions,
                getModifiedOption(option)
            ])
        }
    }

    const getModifiedOption = (option) => {
        return {
            option_id:option.id,
            option_value:option.option_value ?? ""
        }
    }

    const optionExistsInList = (option) => {
        let exists = false;
        selectedOptions.forEach((item) => {
            if(item.id === option.id){
                exists = true;
            }
        })
        return exists;
    }

    const removeOption = (option) => {
        if(selectedOptions.length > 0){
           let newList = [];
           selectedOptions.forEach((item) => {
               if(option.option_id !== item.option_id){
                   newList.push(item);
               }
           })
           setSelectedOptions(newList);
        }
    }

    const onCheckBoxChanged = (checked,item) => {
        if(checked === true) {
            appendOption(item);
        } else {
            removeOption(item)
        }
    }

    useEffect(() => {
        if(variationOptions?.length === 0){
            dispatch(fetchVariationOptions());
        }
    },[]);

    const onGenerateVariations = () => {
        let variations = [];
        if(variationCount < 1) return;
        for(let i = 0;i < variationCount;i++){
            variations.push({
                variation_image_url:"",
                variation_name:"",
                variation_sku:"",
                regular_price:"",
                sales_price:"",
                amount_in_stock:"",
                options:selectedOptions
            })
        }
        dispatch(setCurrentProductVariations(variations));
        if(props.onComplete) props.onComplete();
    }

    const onVariationCount = (e) => {
        const val = e.target.value;
        const parsedVal = parseInt(val);
        if(parsedVal === NaN){
            setVariationCount(0);
        } else {
            setVariationCount(parsedVal);
        }
    }

    return (
        <>
            <CCard>
                <CCardBody>
                    <form ref={props.variationFormRef}>
                    <p>Select Attributes</p>
                    {
                                (variationOptions.length > 0)?
                                <CRow>
                                {
                                    variationOptions.map((item,index) => {
                                        return (
                                            <CCol key={index} lg={6}>
                                                <CFormGroup>
                                                 <input type="checkbox" onChange={(e) => onCheckBoxChanged(e.target.checked,item)} /> <CLabel><b>{item.option}</b></CLabel>
                                                 </CFormGroup>
                                            </CCol>
                                        )
                                    })
                                }
                            </CRow>:<Spinner status={loading} />
                    }
                    <CFormGroup>
                        <CLabel>Number of variations</CLabel>
                        <input value={variationCount} onChange={onVariationCount} type="number" className="form-control" />
                    </CFormGroup>
                    <CFormGroup>
                        <CButton onClick={onGenerateVariations} block={true} color="primary">Generate Variations</CButton>
                    </CFormGroup>
                    </form>
                </CCardBody>
            </CCard>
        </>
    )
}

export default VariationOptionForm;