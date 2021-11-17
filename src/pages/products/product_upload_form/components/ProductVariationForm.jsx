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