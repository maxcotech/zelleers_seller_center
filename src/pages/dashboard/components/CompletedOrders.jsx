
import { CAlert } from '@coreui/react';
import { useSelector } from 'react-redux';
import Money from './../../../components/Money';
import { CBadge } from '@coreui/react';
import OrderItemBtn from './OrderItemBtn';

const CompletedOrders = () => {
    const { data } = useSelector(state => state.dashboard)
    return (
        <>
            {
                (data.length > 0) ?
                    <div className="table-responsive">
                        <table className="table table-hover table-outline">
                            <thead class="thead-light">
                                <tr>
                                    <th>S/N</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Shipping Fee</th>
                                    <th>Amount</th>
                                    <th>Payment Status</th>
                                    <th>Created On</th>
                                    <th>Items</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item,index) => (
                                        <tr key={item.id}>
                                            <th>{index + 1}</th>
                                            <td>{item.user?.first_name}</td>
                                            <td>{item.user?.last_name}</td>
                                            <td>{item.user?.email}</td>
                                            <td><Money>{item.shipping_fee}</Money></td>
                                            <td><Money>{item.amount}</Money></td>
                                            <td><CBadge style={{fontSize:"1em"}} color={(item.payment_status == 1)? "success":"danger" }>{item.payment_status_text}</CBadge></td>
                                            <td>{item.created_at}</td>
                                            <td><OrderItemBtn sub_order_id={item.id} /></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div> :
                    <CAlert color="info">
                        <h4>No Completed Orders</h4>
                        <p>The Details of the Orders you complete subsequently will appear here.</p>
                    </CAlert>
            }
        </>
    )
}

export default CompletedOrders;