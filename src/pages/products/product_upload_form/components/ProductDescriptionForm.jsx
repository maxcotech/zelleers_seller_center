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
                                <span style={{color:'red',fontSize:'11px'}}>Required</span> 
                                <p>Provide a short information about this product</p>
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
                                <span style={{color:'grey',fontSize:'11px'}}>Optional</span> 
                                <p>Describe everything about your product</p>

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
                        <CCardHeader>
                                <h5>Key Features</h5>
                                <span style={{color:'grey',fontSize:'11px'}}>Optional</span> 
                                <p>List out important attributes of this product eg: "Condition" = "fairly used, new, used". Preferably in a list format</p>
                            </CCardHeader>
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