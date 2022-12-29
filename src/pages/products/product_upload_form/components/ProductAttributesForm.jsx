import {CCard,CCardBody,CRow,CCol,CFormGroup,CInput,CLabel} from "@coreui/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import { searchBrands, createBrand } from "src/redux/actions/BrandActions";
import { setProductAttribute } from "src/redux/actions/CurrentProductActions";
import BrandForm from "../../components/BrandForm";
import BrandSearchTable from "../../components/BrandSearchTable";


const ProductAttributesForm = (props) => {
   const dispatch = useDispatch();
   const current_product = useSelector(state => state.current_product);
   const brandRef = useRef();
   const skuRef = useRef(current_product.product_sku ?? "");
   const youtubeVideoRef = useRef(current_product.youtube_video_id ?? "");
   const [brandList,setBrandList] = useState([])
   const [modalVisible,setModalVisible] = useState(false);
   
   var handler = null;
   const onProposeBrand = (fdata) => {
        dispatch(createBrand(fdata,() => setModalVisible(false)));
   }
   const onBrandChange = (e) => {
       if(handler !== null) clearTimeout(handler);
       handler = setTimeout(() => {
           dispatch(searchBrands(e.target.value,(data) => setBrandList(data)))
       },400 )
   }
   const onSelectBrand = (item) => {
        dispatch(setProductAttribute(item.id,'brand_id'));
        brandRef.current.value = item.brand_name;
        setBrandList([]);
   }
   useEffect(() => {
        brandRef.current.value = current_product.brand_name;
        skuRef.current.value = current_product.product_sku;
        youtubeVideoRef.current.value = current_product.youtube_video_id;
   },[current_product.id])

   return (
       <>
       <CCard>
           <CCardBody>
                <CRow>
                    <CCol lg={{offset:2,size:8}}>
                        <form ref={props.otherAttributesFormRef}>
                        <CFormGroup>
                        <CLabel style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>Youtube video<span className="text-muted" style={{fontSize:'11px'}}>Optional</span></CLabel>
                            <input 
                                className="form-control"
                                ref={youtubeVideoRef}
                                onBlur={(e) => dispatch(setProductAttribute(e.target.value,'youtube_video_id'))} 
                                placeholder="Enter Youtube video ID"
                            />
                        </CFormGroup>
                        <CFormGroup>
                        <CLabel style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>Product SKU<span className="text-danger" style={{fontSize:'11px'}}>Optional</span></CLabel>
                            <input 
                                className="form-control"
                                onBlur={(e) => dispatch(setProductAttribute(e.target.value,"product_sku"))}
                                ref={skuRef}
                                placeholder="Enter Product Sku" 
                            />
                        </CFormGroup>
                        <CFormGroup>
                        <CLabel style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>Brand name<span className="text-muted" style={{fontSize:'11px'}}>Optional</span></CLabel>
                            <input onChange={onBrandChange} ref={brandRef} className="form-control" placeholder="Enter Brand Name" />
                            <small>Could not find the appropriate brand? <span onClick={()=>setModalVisible(true)} style={{cursor:"pointer"}} className="text-primary">propose a brand </span></small>
                            <BrandSearchTable 
                                onSelectBrand={onSelectBrand}
                                list={brandList} />
                        </CFormGroup>
                        </form>
                    </CCol>
                </CRow>
           </CCardBody>
       </CCard>
       <AppModal show={modalVisible} onClose={()=>setModalVisible(false)}>
           <BrandForm onFormSubmit={onProposeBrand}/>
       </AppModal>
       </>
   )
}

export default ProductAttributesForm;