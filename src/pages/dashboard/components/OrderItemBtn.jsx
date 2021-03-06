import { CButton } from "@coreui/react";
import Spinner from './../../../components/Spinner';
import AppModal from './../../../components/AppModal';
import { useState } from 'react';
import OrderItemsTable from './OrderItemsTable';
import { useDispatch } from 'react-redux';
import { fetchOrderItems } from './../../../redux/actions/OrderActions';


const OrderItemBtn = (props) => {
    const [loading,setLoading] = useState(false);
    const [visible,setVisible] = useState(false);
    const storeId = useDispatch(state => state.store.current_store.id);
    const dispatch = useDispatch();
    const {sub_order_id,user_id} = props;

    const onBtnClick = () => {
        const params = {paginate:0,store_id:storeId}
        if(sub_order_id){
            params.sub_order_id = sub_order_id;
        }
        if(user_id){
            params.user_id = user_id
        }
        dispatch(fetchOrderItems(params,setLoading,() => {
            setVisible(true);
        }))
    }

    return (
        <>
            <CButton onClick={onBtnClick} disabled={loading} color="dark"><Spinner status={loading} /> Order&nbsp;Item</CButton>
            <AppModal size="lg" show={visible} onClose={() => setVisible(false)} title="Order Items" >
                {
                    (visible)? <OrderItemsTable /> : <></>
                }
            </AppModal>
        </>
    )
}

export default OrderItemBtn;