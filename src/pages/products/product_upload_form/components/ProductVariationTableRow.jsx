import { useDispatch, useSelector } from "react-redux";
import FileUploadComponent from "src/components/FileUploadComponent";
import { setCurrentProductVariations, uploadProductVariationImage } from "src/redux/actions/CurrentProductActions";
import { useCallback, useRef } from "react";
import VariationValueForm from "./VariationValueForm";
import { CButton, CButtonGroup } from "@coreui/react";


const ProductVariationTableRow = (props) => {

    const dispatch = useDispatch();
    const {item,index} = props;

    const variationNameRef = useRef(item.variation_name);
    const variationSkuRef = useRef(item.variation_sku);
    const regularPriceRef = useRef(item.regular_price);
    const salesPriceRef = useRef(item.sales_price);
    const amountInStockRef = useRef(item.amount_in_stock);
    const currentProduct = useSelector(state => state.current_product);

    const updateVariationByIndex = (index,item) => {
        let variations = currentProduct.variations;
        variations[index] = item;
        dispatch(setCurrentProductVariations(variations))
    }

    const removeVariationByIndex = (indexKey) => {
        const variations = currentProduct.variations;
        let newList = [];
        
        variations.forEach((item,index) => {
            if(index !== indexKey){
                newList.push(item);
            }
        })
        dispatch(setCurrentProductVariations(newList));
    }

    const setInputValue = useCallback((value,key) => {
        let variations = currentProduct.variations;
        let currentVariation = item;
        currentVariation[key] = value;
        variations[index] = currentVariation;
        dispatch(setCurrentProductVariations(variations))
    })

    return (
        <tr>
            <td>
                <FileUploadComponent
                    onFileChanged={(file, iloading) => {
                        dispatch(uploadProductVariationImage(
                            file, item, iloading, (data) => {
                                updateVariationByIndex(index, { ...item, variation_image_url: data.image_full_path });
                            }
                        ))
                    }}
                    caption={null}
                    file_path={item.variation_image_url}
                />
            </td>
            <td><input onBlur={(e) => setInputValue(e.target.value,"variation_name")} ref={variationNameRef} placeholder="Variaion Name" /></td>
            <td><input onBlur={(e) => setInputValue(e.target.value,"variation_sku")} ref={variationSkuRef} placeholder="Variation Sku" /></td>
            <td><input onBlur={(e) => setInputValue(e.target.value,"regular_price")} ref={regularPriceRef} placeholder="Regular Price" /></td>
            <td><input onBlur={(e) => setInputValue(e.target.value,"sales_price")} ref={salesPriceRef} placeholder="Sales Price" /></td>
            <td><input onBlur={(e) => setInputValue(e.target.value,"amount_in_stock")} ref={amountInStockRef} placeholder="Amount In Stock" /></td>
            <td>
                <CButtonGroup>
                    <VariationValueForm key={"variation-value-form-"+index} index={index} variation={item} />
                    <CButton onClick={() => removeVariationByIndex(index)} color="primary">Delete</CButton>
                </CButtonGroup>
            </td>
        </tr>
    )
}

export default ProductVariationTableRow;