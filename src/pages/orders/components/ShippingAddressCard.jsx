import { CBadge, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react"
import CustomBadge from "src/components/CustomBadge";
import { Flex } from "./CustomerDetailsCard";


const ShippingAddressCard = (props) => {
    const {billing_address} = props;
    const getAddressName = () => {
        if(billing_address?.first_name != null && billing_address?.last_name != null){
            return billing_address?.first_name+" "+billing_address?.last_name;
        } else {
            return "N/A"
        }
    }
    return (
        <CCard>
            <CCardHeader>
                Billing Address
            </CCardHeader>
            <CCardBody>
                <Flex n>
                    <div><CustomBadge>Postal&nbsp;Code</CustomBadge></div>
                    <div style={{fontSize:"0.9em"}}>{billing_address.postal_code ?? "No Postal Code"}</div>
                </Flex>
                <Flex>
                    <div><CustomBadge>Street&nbsp;Address</CustomBadge></div>
                    <div style={{fontSize:"0.9em"}}>{billing_address.street_address}</div>
                </Flex>
                <Flex n>
                    <div><CustomBadge>Shipping&nbsp;City</CustomBadge></div>
                    <div style={{fontSize:"0.9em"}}>{billing_address.city?.city_name ?? "N/A"}</div>
                </Flex>
                <Flex>
                    <div><CustomBadge>Shipping&nbsp;State</CustomBadge></div>
                    <div style={{fontSize:"0.9em"}}>{billing_address.state?.state_name ?? "N/A"}</div>
                </Flex>
                <Flex n>
                    <div ><CustomBadge>Shipping&nbsp;Country</CustomBadge></div>
                    <div style={{fontSize:"0.9em"}}>{billing_address.country?.country_name ?? "N/A"}</div>
                </Flex>
                <Flex>
                    <div ><CustomBadge>Receiver&nbsp;Name</CustomBadge></div>
                    <div style={{fontSize:"0.9em"}}>{getAddressName()}</div>
                </Flex>
            </CCardBody>
        </CCard>
    )
}

export default ShippingAddressCard;