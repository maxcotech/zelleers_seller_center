import { CButton, CCard, CCardBody } from "@coreui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import AppModal from "src/components/AppModal";
import VariationOptionForm from "./VariationOptionForm";

import ProductVariationTableRow from "./ProductVariationTableRow";


const ProductVariationForm = (props) => {
    const currentProduct = useSelector(state => state.current_product);
    const [visible,setVisible] = useState(false);

    return (
        <>
        <CCard>
            <CCardBody>
                {
                    currentProduct.variations.length > 0? 
                    <>
                    <div className="table-responsive">
                        <table className="table condensed">
                            <thead>
                                <tr>
                                <th>Variation Image</th>
                                <th>Variation Name</th>
                                <th>Variation Sku</th>
                                <th>Regular Price</th>
                                <th>Sales Price</th>
                                <th>Amount In Stock</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentProduct.variations.map((item,index) => {
                                        return (
                                            <ProductVariationTableRow key={"product-table-row-"+index} item={item} index={index} />
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                   </>
                    
                    :
                    <div className="text-center">
                        <p>There is no variation available for this product</p>
                        <div><CButton color="primary" onClick={() => setVisible(true)}>Create Variations</CButton></div>
                        <div style={{marginTop:'20px',color:'red', fontWeight:'bold'}}>Please read</div>
                        <div style={{ textAlign:'left'}}>
                            Variations is a way of identifying different forms of your product especially when they are of different prices, for instance black color is a form different from red color, size 45 is a form different from size 42,
                            you can also have red shoe of size 45 as a different variation from red shoe size 42.
                        </div>

                    </div>
                }
               
            </CCardBody>
        </CCard>
        <AppModal show={visible} onClose={() => setVisible(false)} title="Create Variations" >
            <VariationOptionForm variationFormRef={props.variationFormRef} onComplete={() => setVisible(false)} />
        </AppModal>
        </>
    )
}

export default ProductVariationForm;