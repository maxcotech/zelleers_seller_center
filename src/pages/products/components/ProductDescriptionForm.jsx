import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductAttribute } from "src/redux/actions/CurrentProductActions";

const ProductDescriptionForm = () => {
    const simpleDesRef = useRef();
    const desRef = useRef();
    const keyFeaturesRef = useRef();
    const current_product = useSelector(state => state.current_product);
    const dispatch = useDispatch();

    return (
        <CCard>
            <CCardBody>
                <CRow>
                    <CCol lg={12}>
                        <h5>Simple Description</h5>
                        <JoditEditor 
                            config={{readonly:false}}
                            ref={simpleDesRef}
                            tabIndex={1}
                            value={current_product.simple_description}
                            onBlur={content => dispatch(setProductAttribute(content,'simple_description'))}
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg={12}>
                        <h5>Exhausive Description</h5>
                        <JoditEditor 
                            config={{readonly:false}}
                            ref={desRef}
                            tabIndex={1}
                            value={current_product.description}
                            onBlur={content => dispatch(setProductAttribute(content,'description'))}
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg={12}>
                        <h5>Key Features</h5>
                        <JoditEditor 
                            config={{readonly:false}}
                            ref={keyFeaturesRef}
                            tabIndex={1}
                            value={current_product.key_features}
                            onBlur={content => dispatch(setProductAttribute(content,'key_features'))}
                        />
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    )
}

export default ProductDescriptionForm;