import { CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from "@coreui/react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "src/components/Spinner";
import { confirmAction } from "src/config/helpers/message_helpers";
import { resetCurrentProduct, uploadCurrentProduct } from "src/redux/actions/CurrentProductActions";
import ProductAttributesForm from "./components/ProductAttributesForm";
import ProductDescriptionForm from "./components/ProductDescriptionForm";
import ProductDimensionForm from "./components/ProductDimensionsForm";
import ProductFrontForm from "./components/ProductFrontForm";
import ProductGalleryForm from "./components/ProductGalleryForm";
import ProductVariationForm from "./components/ProductVariationForm";
import PropTypes from "prop-types";

const ProductUploadForm = (props) => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.app.loading);
    const currentProduct = useSelector(state => state.current_product);

    const productFrontFormRef = useRef();
    let descriptionRef = useRef(currentProduct.description);
    let keyFeaturesRef = useRef(currentProduct.key_features);
    let shortDescriptionRef = useRef(currentProduct.simple_description);
    const dimensionsFormRef = useRef();
    const otherAttributesFormRef = useRef();
    const variationFormRef = useRef();

    const clearForms = () => {
        productFrontFormRef.current?.reset();
        otherAttributesFormRef.current?.reset();
        variationFormRef.current?.reset();
        dimensionsFormRef.current?.reset();
    }

    const clearCurrentProduct = async () => {
        let confirmed = await confirmAction({text:"You may lose all the entries you are yet to publish."});
        if(confirmed){
            clearForms();
            dispatch(resetCurrentProduct());
        }
    }
    
    const silentlyClearCurrentProduct = () => {
        clearForms();
        dispatch(resetCurrentProduct());
    }


    return (
        <CCard>
            <CCardHeader>
                <h4 style={{display:"inline-block"}}><Spinner status={loading} /> {props.formTitle ?? "Create Product"}</h4>
                <div style={{display:"inline-block"}} className="card-header-actions">
                    <CButtonGroup>
                        <CButton onClick={() => clearCurrentProduct()} color="danger">Reset</CButton>
                        <CButton onClick={() => dispatch(uploadCurrentProduct(() => silentlyClearCurrentProduct()))} color="primary">{props.uploadBtnTitle ?? "Publish"}</CButton>
                    </CButtonGroup>
                </div>
            </CCardHeader>
            <CCardBody>
                <CTabs activeTab="product_front">
                    <CNav variant="tabs">
                        <CNavItem>
                            <CNavLink data-tab="product_front">
                                Product Front
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink data-tab="profile">
                                Product Gallery
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink data-tab="description">
                                Descriptions
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink data-tab="dimensions">
                                Product Dimensions
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink data-tab="variations">
                                Product Variations
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink data-tab="attributes">
                                Other Attributes
                            </CNavLink>
                        </CNavItem>
                    </CNav>
                    <CTabContent>
                        <CTabPane data-tab="product_front">
                            <ProductFrontForm productFrontFormRef={productFrontFormRef} />
                        </CTabPane>
                        <CTabPane data-tab="profile">
                            <ProductGalleryForm />
                        </CTabPane>
                        <CTabPane data-tab="description">
                            <ProductDescriptionForm keyFeaturesRef={keyFeaturesRef} shortDescriptionRef={shortDescriptionRef} descriptionRef={descriptionRef}/>
                        </CTabPane>
                        <CTabPane data-tab="dimensions">
                            <ProductDimensionForm dimensionsFormRef={dimensionsFormRef}/>
                        </CTabPane>
                        <CTabPane data-tab="variations">
                            <ProductVariationForm variationFormRef={variationFormRef} />
                        </CTabPane>
                        <CTabPane data-tab="attributes">
                            <ProductAttributesForm otherAttributesFormRef={otherAttributesFormRef}/>
                        </CTabPane>
                    </CTabContent>
                </CTabs>
            </CCardBody>
        </CCard>
    )
}

ProductUploadForm.propTypes = {
    formTitle:PropTypes.string,
    uploadBtnTitle:PropTypes.string,
    updateMode:PropTypes.bool
}

export default ProductUploadForm;