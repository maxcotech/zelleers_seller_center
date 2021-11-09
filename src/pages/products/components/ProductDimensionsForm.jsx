import { CAlert, CCard, CCardBody, CCol, CFormGroup, CInput, CLabel, CRow } from "@coreui/react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProductAttribute } from "src/redux/actions/CurrentProductActions";

const ProductDimensionsForm = () => {

    const dispatch = useDispatch();
    const current_product = useSelector(state => state.current_product);
    const weightRef = useRef(current_product.weight ?? "");
    const heightRef = useRef(current_product.dimension_height ?? "");
    const widthRef = useRef(current_product.dimension_width ?? "");
    const lengthRef = useRef(current_product.dimension_length ?? "");

    return (
        <CCard>
            <CCardBody>
                <CRow>
                    <CCol lg={{offset:2,size:8}}>
                        <div>
                            <CAlert color="info">
                                Here it's either you select weight, or select length, height and width ( you can still select all if you wish).
                            </CAlert>
                            <CFormGroup>
                                <CLabel>Product Weight</CLabel>
                                <input  className="form-control" type="number" ref={weightRef}  onBlur={e => dispatch(setProductAttribute(e.target.value,'weight'))} placeholder="Enter Weight in Kilogram (kg)" />
                            </CFormGroup>
                            <hr style={{border:"1px dashed silver"}}/>
                            <CFormGroup>
                                <CLabel>Product Height</CLabel>
                                <input  className="form-control" type="number" ref={heightRef}  onBlur={e => dispatch(setProductAttribute(e.target.value,'dimension_height'))} placeholder="Enter height in inches." />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Product Width</CLabel>
                                <input  className="form-control" type="number" ref={widthRef}  onBlur={e => dispatch(setProductAttribute(e.target.value,'dimension_width'))} placeholder="Enter Width in inches." />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Product Length</CLabel>
                                <input  className="form-control" type="number" ref={lengthRef}  onBlur={e => dispatch(setProductAttribute(e.target.value,'dimension_length'))} placeholder="Enter Length in inches." />
                            </CFormGroup>
                        </div>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    )
}

export default ProductDimensionsForm;