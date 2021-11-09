import { CButton, CCard, CCardBody, CCol, CFormGroup, CInput, CInputGroup, CInputGroupPrepend, CLabel, CRow} from "@coreui/react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import FileUploadComponent from "src/components/FileUploadComponent";
import { setProductAttribute, uploadMainProductImage } from "src/redux/actions/CurrentProductActions";
import ProductCategorySelect from "./ProductCategorySelect";

const ProductFrontForm = () => {
    const dispatch = useDispatch();
    const current_product = useSelector(state => state.current_product);
    const productNameRef = useRef(current_product.product_name ?? "");
    const regularPriceRef = useRef(current_product.regular_price ?? "");
    const salesPriceRef = useRef(current_product.sales_price ?? "");
    const amountInStockRef = useRef(current_product.amount_in_stock ?? "");
    const categoryRef = useRef(current_product.category_name ?? "")

    return (
        <CCard>
            <CCardBody>
                <CRow>
                    <CCol lg={{size:"4"}}>
                        <FileUploadComponent
                            id="product_image"
                            onFileChanged={(file,loader) => dispatch(uploadMainProductImage(file,loader))}
                            caption="Main Image"
                            file_path={current_product.main_product_image}
                        />
                    </CCol>
                    <CCol lg={{size:8}}>
                        <div>
                            <CFormGroup>
                                <CLabel>Product Name<span className="text-danger">*</span></CLabel>
                                <input  className="form-control" ref={productNameRef} placeholder="Eg: Apple Macbook Pro 2021 mi" />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Regular Price<span className="text-danger">*</span></CLabel>
                                <input  className="form-control" type="number" ref={regularPriceRef} placeholder="Enter regular price" />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Sales Price</CLabel>
                                <input  className="form-control" type="number" ref={salesPriceRef} placeholder="Enter sales price" />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Amount In Stock</CLabel>
                                <input  className="form-control" type="number" ref={amountInStockRef} placeholder="Enter Amount of product in stock" />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Category</CLabel>
                                <CInputGroup>
                                    <CInputGroupPrepend>
                                        <ProductCategorySelect 
                                            categories={null}
                                            onSelectItem={(item) => {
                                                dispatch(setProductAttribute(item.id,'category_id'));
                                                categoryRef.current.value = item.category_title;
                                            }} 
                                        />
                                    </CInputGroupPrepend>
                                    <input 
                                        className="form-control"
                                        disabled={true}
                                        ref={categoryRef} 
                                        placeholder="Click Button to select category" 
                                    />
                                </CInputGroup>
                            </CFormGroup>
                            
                        </div>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    )
}

export default ProductFrontForm;