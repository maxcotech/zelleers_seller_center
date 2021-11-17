import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import JoditEditor from "jodit-react";
import { useDispatch, useSelector } from "react-redux";
import { setProductAttribute } from "src/redux/actions/CurrentProductActions";

const ProductDescriptionForm = (props) => {
    
    const current_product = useSelector(state => state.current_product);
    const dispatch = useDispatch();
    const joditConfig = {
        askBeforePasteFromWord: false,
        askBeforePasteHTML: false,
        readonly:false
    }

    return (
        <CCard>
            <CCardBody>
                <CRow>
                    <CCol lg={12}>
                        <CCard>
                            <CCardHeader>
                                <h5>Simple Description</h5>
                            </CCardHeader>
                            <CCardBody>
                                <JoditEditor 
                                    config={joditConfig}
                                    ref={props.shortDescriptionRef}
                                    tabIndex={1}
                                    value={current_product.simple_description}
                                    onBlur={content => dispatch(setProductAttribute(content,'simple_description'))}
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg={12}>
                        <CCard>
                            <CCardHeader>
                                <h5>Exhausive Description</h5>
                            </CCardHeader>
                            <CCardBody>
                                <JoditEditor 
                                    config={joditConfig}
                                    ref={props.descriptionRef}
                                    tabIndex={1}
                                    value={current_product.description}
                                    onBlur={content => dispatch(setProductAttribute(content,'description'))}
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg={12}>
                        <CCard>
                            <CCardHeader><h5>Key Features</h5></CCardHeader>
                            <CCardBody>
                                <JoditEditor 
                                    config={joditConfig}
                                    ref={props.keyFeaturesRef}
                                    tabIndex={1}
                                    value={current_product.key_features}
                                    onBlur={content => dispatch(setProductAttribute(content,'key_features'))}
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    )
}

export default ProductDescriptionForm;