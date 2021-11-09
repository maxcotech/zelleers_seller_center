import { CCard, CCardBody, CCardHeader, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from "@coreui/react";
import ProductAttributesForm from "../components/ProductAttributesForm";
import ProductDescriptionForm from "../components/ProductDescriptionForm";
import ProductDimensionForm from "../components/ProductDimensionsForm";
import ProductFrontForm from "../components/ProductFrontForm";
import ProductGalleryForm from "../components/ProductGalleryForm";
import ProductVariationForm from "../components/ProductVariationForm";

const CreateProduct = () => {
    

    return (
        <CCard>
            <CCardHeader>
                <h4>Create Product</h4>
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
                            <ProductFrontForm />
                        </CTabPane>
                        <CTabPane data-tab="profile">
                            <ProductGalleryForm />
                        </CTabPane>
                        <CTabPane data-tab="description">
                            <ProductDescriptionForm />
                        </CTabPane>
                        <CTabPane data-tab="dimensions">
                            <ProductDimensionForm />
                        </CTabPane>
                        <CTabPane data-tab="variations">
                            <ProductVariationForm />
                        </CTabPane>
                        <CTabPane data-tab="attributes">
                            <ProductAttributesForm />
                        </CTabPane>
                    </CTabContent>
                </CTabs>
            </CCardBody>
        </CCard>
    )
}

export default CreateProduct;