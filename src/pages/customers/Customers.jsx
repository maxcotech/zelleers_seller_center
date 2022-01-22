import { CAlert, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCustomers, defaultCustomerUrl } from './../../redux/actions/CustomerActions';
import Spinner from "src/components/Spinner";
import PaginationComponent from './../../components/PaginationComponent';
import { getUserStatusText, getUserTypeText} from 'src/config/app_config/user_config';
import OrderItemBtn from './../dashboard/components/OrderItemBtn';


const Customers = () => {
    const dispatch = useDispatch();
    const store = useSelector(state => state.store.current_store);
    const loading = useSelector(state => state.app.loading);
    const {links,customers,params} = useSelector(state => state.customer);
    const onPaginationClick = (url) => {
        dispatch(fetchCustomers(url,params));
    }

    useEffect(() => {
        const initParams = {
            store_id: store.id
        }
        dispatch(fetchCustomers(defaultCustomerUrl,initParams))
    },[]);
    
    

    return (
        <>
            <CCard>
                <CCardHeader>
                    <h4><Spinner status={loading} /> Store Customers</h4>
                </CCardHeader>
                <CCardBody>
                    {
                        (customers.length > 0)? 
                        <div className="table-responsive">
                            <table className="table table-hover table-outlined">
                                <thead className="thead-light">
                                    <th>S/N</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email Address</th>
                                    <th>Phone Number</th>
                                    <th>User Type</th>
                                    <th>Account Type</th>
                                    <th>Joined On</th>
                                    <th>Purchased Items</th>
                                </thead>
                                <tbody>
                                    {
                                        customers.map((item,index) => (
                                            <tr key={item.id}>
                                                <th>{index + 1}</th>
                                                <td>{item.first_name}</td>
                                                <td>{item.last_name}</td>
                                                <td>{item.email}</td>
                                                <td>{(item.phone_number && item.telephone_code)? item.telephone_code+item.phone_number:"N/A"}</td>
                                                <td>{getUserTypeText(item.user_type)}</td>
                                                <td>{getUserStatusText(item.account_status)}</td>
                                                <td>{item.created_at}</td>
                                                <td><OrderItemBtn user_id={item.id} /></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>:
                        <CAlert color="info">
                            <h4>No Customers</h4>
                            <p>You don't have any customers yet.</p>
                        </CAlert>
                    }
                    <PaginationComponent onClick={onPaginationClick} links={links} />
                </CCardBody>
            </CCard>
        </>
    )
}

export default Customers;