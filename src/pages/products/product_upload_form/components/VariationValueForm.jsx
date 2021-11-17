import { useState } from "react";
import VariationOptionInput from "./VariationOptionInput";

import { CButton, CAlert, CCard, CCardBody} from "@coreui/react";
import AppModal from "src/components/AppModal";

const VariationValueForm = (props) => {
    const [visible,setVisible] = useState(false);
    

    return (
        <>
            <AppModal title={"Variation Attributes"} show={visible} onClose={() => setVisible(false)}>
                <CCard>
                    <CCardBody>
                        {
                            (props.variation.options.length > 0)?
                        
                                props.variation.options.map((item,index) => {
                                    return (
                                        <VariationOptionInput  variationIndex={props.index} variation={props.variation} key={`variation-option-input-${props.index}-${index}`} index={index} option={item}  />
                                    )
                                })
                            :
                                <CAlert color="info">
                                    <h3>No Attributes Found</h3>
                                    <p>You did not specify any variation attributes when creating these group of variations</p>
                                </CAlert>
                        }
                    </CCardBody>
                </CCard>
            </AppModal>
            <CButton onClick={() => setVisible(true)} color="info">Options</CButton>
        </>
    )
}

export default VariationValueForm;