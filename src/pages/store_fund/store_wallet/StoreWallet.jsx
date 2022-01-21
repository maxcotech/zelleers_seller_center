import { CCard, CCardBody, CCardHeader, CRow, CCol, CWidgetIcon, CAlert, CBadge, CButton, CContainer } from "@coreui/react";
import Spinner from "src/components/Spinner";
import { useSelector } from 'react-redux';
import Money from "src/components/Money";
import { CIcon } from '@coreui/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStoreWallet, defaultWalletUrl, createWithdrawalRequest } from './../../../redux/actions/WalletActions';
import PaginationComponent from "src/components/PaginationComponent";
import AppModal from "src/components/AppModal";
import WRequestForm from "./components/WRequestForm";

const StoreWallet = (props) => {
    const { loading } = useSelector(state => state.app);
    const dispatch = useDispatch();
    const store = useSelector(state => state.store.current_store);
    const [showForm,setShowForm] = useState(false)
    const { total_balance, locked_credits, unlocked_credits, total_debits, pending_requests, data, links,params,current_link } = useSelector(state => state.wallet)
    useEffect(() => {
        const params = {
            store_id: store.id
        }
        dispatch(fetchStoreWallet(defaultWalletUrl, params))
    }, [])

    const getLockStatusColor = (item) => {
        if(item.lock === null){
            return "success";
        } else {
            if(item.lock.status === 1){
                return "success";
            }
        }
        return "danger"
    }
    const onPaginationClick = (url) => {
        dispatch(fetchStoreWallet(url, params))
    }
    const onCreateRequest = (data,iloader) => {
        const formData = {...data,store_id:store.id};
        dispatch(createWithdrawalRequest(formData,iloader,() => {
            dispatch(fetchStoreWallet(current_link,params,iloader,() => {
                setShowForm(false);
            }))
        }))
    }
    return (
        <>
           
            <CCard>
                <CCardHeader>
                    <h4 className="inline-block"><Spinner status={loading} /> Store Wallet</h4>
                    <div className="card-header-actions">
                        <CButton onClick={() => setShowForm(true)} color="primary">Request Withdrawal</CButton>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CRow className="justify-content-center">
                        <CCol sm={12} xl={12}>
                            <CCard className="bg-gradient-dark text-center">
                                <CCardBody>
                                    <p style={{ fontSize: "1.9em" }}><Money>{total_balance}</Money></p>
                                    <h5>Total Balance</h5>
                                </CCardBody>
                            </CCard>

                            <CRow>
                                <CCol xs="12" sm="6" lg="3">
                                    <CWidgetIcon text="Total Locked Credits" header={<Money>{locked_credits}</Money>} color="gradient-warning" iconPadding={false}>
                                        <CIcon width={24} name="cil-chart-pie" />
                                    </CWidgetIcon>
                                </CCol>
                                <CCol xs="12" sm="6" lg="3">
                                    <CWidgetIcon text="Total Unlocked Credits" header={<Money>{unlocked_credits}</Money>} color="gradient-success" iconPadding={false}>
                                        <CIcon width={24} name="cil-chart-pie" />
                                    </CWidgetIcon>
                                </CCol>
                                <CCol xs="12" sm="6" lg="3">
                                    <CWidgetIcon text="Total Debits" header={<Money>{total_debits}</Money>} color="gradient-danger" iconPadding={false}>
                                        <CIcon width={24} name="cil-chart-pie" />
                                    </CWidgetIcon>
                                </CCol>
                                <CCol xs="12" sm="6" lg="3">
                                    <CWidgetIcon text="Amount In Request" header={<Money>{pending_requests}</Money>} color="gradient-info" iconPadding={false}>
                                        <CIcon width={24} name="cil-chart-pie" />
                                    </CWidgetIcon>
                                </CCol>
                            </CRow>

                        </CCol>
                    </CRow>
                    {
                        (data.length > 0)? 
                        <div className="table-responsive">
                            <table className="table table-hover table-outline">
                                <thead className="thead-light">
                                    <tr>
                                        <th>S/N</th>
                                        <th>Amount</th>
                                        <th>Ledger Type</th>
                                        <th>Sender Email</th>
                                        <th>Sender Type</th>
                                        <th>Transaction Type</th>
                                        <th>Lock Status</th>
                                        <th>Created On</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item,index) => (
                                            <tr key={item.id}>
                                                <th>{index + 1}</th>
                                                <td><Money>{item.amount}</Money></td>
                                                <td><CBadge style={{fontSize:"0.9em"}} color={(item.ledger_type === 1)? "success":"danger"}>{item.ledger_type_text}</CBadge></td>
                                                <td><a href={(item.sender_email !== null)? "mailto:"+item.sender_email:"#"}>{item.sender_email ?? "N/A"}</a></td>
                                                <td>{item.sender_type_text}</td>
                                                <td>{item.transaction_type_text}</td>
                                                <td><CBadge style={{fontSize:"0.9em"}} color={getLockStatusColor(item)}>{item.lock?.status_text ?? "Unlocked"}</CBadge></td>
                                                <td>{item.created_at}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>:
                        <CAlert color="info">
                            <h4>No Transactions</h4>
                            <p>Transactions pertaining to your store wallet will appear here</p>
                        </CAlert>
                    }
                    <div>
                        <PaginationComponent links={links} onClick={onPaginationClick} />
                    </div>
                </CCardBody>
            </CCard>
            <AppModal size="lg" show={showForm} onClose={() => setShowForm(false)} title="Withdraw Fund">
                <WRequestForm submitHandler={onCreateRequest} />
            </AppModal>
        </>
    )
}

export default StoreWallet;