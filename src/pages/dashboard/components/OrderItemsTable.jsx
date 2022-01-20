import { CAlert, CCard, CCardBody } from "@coreui/react";
import { useSelector } from 'react-redux';
import Money from "src/components/Money";
import ExpandableImage from './../../../components/ExpandableImage';
import { normalizeSnakeCasing } from './../../../config/helpers/string_helpers';


const OrderItemsTable = (props) => {
    const {current_order_items} = useSelector(state => state.order);
    const getProductImage = (item) => {
        if(item.variation?.variation_image){
            return item.variation?.variation_image;
        } else {
            return item.product?.product_image;
        }
    }
    return (
        <CCard>
            <CCardBody>
                {
                    (current_order_items.length > 0)?
                        <div className="table-responsive">
                            <table className="table table-hover table-outline">
                                <thead className="thead-light">
                                    <tr>
                                        <th>S/N</th>
                                        <th>Product Image</th>
                                        <th>Product Name</th>
                                        <th>Paid Amount</th>
                                        <th>Quantity</th>
                                        <th>Product Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        current_order_items.map((item,index) => (
                                            <tr key={item.id}>
                                                <th>{index + 1}</th>
                                                <td><ExpandableImage width="auto" height="60px" title={'Product Image'} src={getProductImage(item)} /></td>
                                                <td>
                                                    <div>{item.product?.product_name}</div>
                                                    {(item.variation?.variation_name) ? <span className="text-muted">{item.variation?.variation_name}</span>:<></>}
                                                </td>
                                                <td>
                                                    <Money>{item.paid_amount}</Money>
                                                </td>
                                                <td>
                                                    {item.quantity}
                                                </td>
                                                <td>
                                                    <span style={{textTransform:"capitalize"}}>{normalizeSnakeCasing(item.product_type)}</span>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>:
                        <CAlert color="info">
                            <h4>No Order Item</h4>
                            <p>There are no order items under the selected order.</p>
                        </CAlert>
                }
                
            </CCardBody>
        </CCard>
    )
}

export default OrderItemsTable;