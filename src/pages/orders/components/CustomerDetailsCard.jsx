import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import CustomBadge from "src/components/CustomBadge";


const CustomerDetailsCard = (props) => {
    const {billing_address,user} = props;
    return (
        <CCard>
            <CCardHeader>
                Customer Details
            </CCardHeader>
            <CCardBody>
                    <Flex n>
                        <div><CustomBadge>First&nbsp;Name</CustomBadge></div>
                        <div style={{fontSize:"0.9em"}}>{user.first_name ?? "N/A"}</div>
                    </Flex>
                    <Flex>
                        <div><CustomBadge>Last&nbsp;Name</CustomBadge></div>
                        <div style={{fontSize:"0.9em"}}>{user.last_name ?? "N/A"}</div>
                    </Flex>
                    <Flex n>
                        <div><CustomBadge>Customer&nbsp;Email</CustomBadge></div>
                        <div style={{fontSize:"0.9em", maxWidth:'200px'}}>{user.email ?? "N/A"}</div>
                    </Flex>
                    <Flex>
                        <div><CustomBadge>Phone&nbsp;Number</CustomBadge></div>
                        <div style={{fontSize:"0.9em",textOverflow:'ellipsis'}}>{billing_address.telephone_code+billing_address.phone_number}</div>
                    </Flex>
                    <Flex n>
                        <div><CustomBadge>Additional&nbsp;Number</CustomBadge></div>
                        <div style={{fontSize:"0.9em"}}>{(billing_address.additional_telephone_code != null && billing_address.additional_number != null)? 
                         billing_address.additional_telephone_code+billing_address.additional_number : "N/A"}</div>
                    </Flex>
                    <Flex>
                        <div><CustomBadge>User&nbsp;Status</CustomBadge></div>
                        <div style={{fontSize:"0.9em"}}>{user.account_status == 1? "Active":"In-active"}</div>
                    </Flex>
            </CCardBody>
        </CCard>
    )
}

export default CustomerDetailsCard;


export const Flex = ({children, n}) => {
  return (<div style={{background:n?"rgb(230,230,230)":"",padding:'5px 5px',display:'flex',alignItems:'center', justifyContent:'space-between',flexWrap:'wrap'}}>
    {children}
  </div>)
}