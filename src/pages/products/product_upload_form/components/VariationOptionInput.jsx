import { useCallback, useRef } from "react";
import { getOptionNameById } from "src/redux/actions/VariationOptionActions";
import { CFormGroup,CLabel } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProduct, setCurrentProductVariations } from "src/redux/actions/CurrentProductActions";

const VariationOptionInput = (props) => {
    const {option,variation,index,variationIndex} = props;
    const inputRef = useRef(option.option_value);
    const currentProduct = useSelector(state => state.current_product);
    const variationOptions = useSelector(state => state.variation_option.options);
    const optionName = getOptionNameById(option.option_id,variationOptions);
    const dispatch = useDispatch();

    const onValueChanged = useCallback((value) => {
        currentProduct.variations.forEach((variation,valIndex) => {
            if(valIndex === variationIndex){
                variation.options.forEach((option,optIndex) => {
                    console.log('working on this val index',valIndex,optIndex);
                    if(optIndex === index){
                        option.option_value = value;
                        dispatch(setCurrentProduct(currentProduct));
                    }
                })
            } 
        })
        /*currentProduct.variations[variationIndex].options[index].option_value = value;
        console.log(`variation ${variationIndex} option ${index}`);*/
        //dispatch(setCurrentProduct(currentProduct));
        
    },[inputRef.current.value])

    return (
        <CFormGroup>
            <CLabel>{optionName}</CLabel>
            <input placeholder={`Enter ${optionName}`} onBlur={(e) => onValueChanged(e.target.value)} ref={inputRef} className="form-control" />
        </CFormGroup>
    )
}

export default VariationOptionInput;