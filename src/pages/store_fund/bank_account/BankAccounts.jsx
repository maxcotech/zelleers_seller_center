import { CCard, CCardHeader, CCardBody, CAlert, CButton, CButtonGroup } from "@coreui/react";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Spinner from "src/components/Spinner";
import { createBankAccount, deleteBankAccount, fetchBankAccounts } from './../../../redux/actions/WalletActions';
import LoadingBtn from './../../../components/LoadingBtn';
import AppModal from "src/components/AppModal";
import BankAccountForm from "./components/BankAccountForm";
import UpdateBankAccountBtn from "./components/UpdateBankAccountBtn";
import { confirmAction } from 'src/config/helpers/message_helpers';


const BankAccounts = () => {
    const {bank_accounts} = useSelector(state => state.wallet);
    const store = useSelector(state => state.store.current_store);
    const [showCreateForm,setShowCreateForm] = useState(false);
    const {currencies} = useSelector(state => state.country)
    const loading = useSelector(state => state.app.loading);
    const dispatch = useDispatch();
    const getCurrencyText = (key) => {
        if(currencies.length > 0){
            for(let currency of currencies){
                if(currency.id === key){
                    return `${currency.currency_name} (${currency.currency_code})`;
                }
            }
        }
        return "N/A";
    }
    const onCreateBankAccount = (data,iloader = null) => {
        const formData = {...data,store_id:store.id};
        dispatch(createBankAccount(formData,iloader,() => {
            dispatch(fetchBankAccounts({store_id:store?.id},iloader,() => {
                setShowCreateForm(false);
            }))
        }))
    }
    const onDeleteAccount = async (data,iloader = null) => {
        if(await confirmAction({text:"This bank account will no longer be available for your payout."})){
            const param = {store_id:store.id};
            dispatch(deleteBankAccount(data,param,iloader,() => {
                dispatch(fetchBankAccounts({store_id:store?.id}));
            }))
        }
    }
    useEffect(() => {
        dispatch(fetchBankAccounts({store_id:store?.id}))
    },[]);



    return (
        <>
            <CCard>
                <CCardHeader>
                    <h4 className="inline-block"><Spinner status={loading} /> Bank Accounts</h4>
                    <div className="card-header-actions">
                        <CButton onClick={()=>setShowCreateForm(true)} color="dark">+ Create Bank Account</CButton>
                    </div>
                </CCardHeader>
                <CCardBody>
                    {
                        (bank_accounts.length > 0)?
                        <div className="table-responsive">
                            <table className="table table-hover table-outlined">
                                <thead className="thead-light">
                                    <tr>
                                        <th>S/N</th>
                                        <th>Bank Name</th>
                                        <th>Bank Code</th>
                                        <th>Account Number</th>
                                        <th>Currency</th>
                                        <th>Created On</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        bank_accounts.map((item,index) => (
                                            <tr key={item.id}>
                                                <th>{index + 1}</th>
                                                <td>{item.bank_name}</td>
                                                <td>{item.bank_code}</td>
                                                <td>{item.account_number}</td>
                                                <td>{getCurrencyText(item.bank_currency_id)}</td>
                                                <td>{(new Date(item.created_at)).toDateString()}</td>
                                                <td>
                                                    <CButtonGroup>
                                                        <UpdateBankAccountBtn onComplete={() => dispatch(fetchBankAccounts({store_id:store?.id}))} item={item} />
                                                        <LoadingBtn data={item.id} onClick={onDeleteAccount} color="danger">Delete</LoadingBtn>
                                                    </CButtonGroup>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>:
                        <CAlert color="info">
                            <h4>No Bank Accounts</h4>
                            <p>You do not have any bank account affiliated to this store. In order to be capable of withdrawing your funds, you must create at least one bank account.</p>
                            <CButton onClick={()=>setShowCreateForm(true)} color="dark">+ Create Bank Account</CButton>
                        </CAlert>
                    }
                </CCardBody>
            </CCard>
            <AppModal title="Add Bank Account" show={showCreateForm} onClose={() => setShowCreateForm(false)}>
                 <BankAccountForm submitHandler={onCreateBankAccount} />   
            </AppModal>
        </>
    )
}

export default BankAccounts;