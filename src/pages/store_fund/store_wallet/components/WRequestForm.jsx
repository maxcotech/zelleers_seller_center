import { CButton, CCard, CCardBody, CCardFooter, CFormGroup, CInputGroup, CInputGroupPrepend, CInputGroupText, CLabel } from "@coreui/react";
import HtmlEntity from "src/components/HtmlEntity";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { fetchBankAccounts } from './../../../../redux/actions/WalletActions';
import { Link } from "react-router-dom";
import Spinner from "src/components/Spinner";


const WRequestForm = (props) => {
    const {currency_sym} = useSelector(state => state.auth.currency);
    const dispatch = useDispatch();
    const {bank_accounts} = useSelector(state => state.wallet);
    const store = useSelector(state => state.store.current_store);
    const [loading,setLoading] = useState(false);
    const [formState,setFormState] = useState({
        amount:"",
        bank_account_id:"",
        password:""
    });
    const setFValue = (e,key) => {
        setFormState({
            ...formState,
            [key]:e.target.value
        })
    }
    const onSubmit = () => {
        props.submitHandler(formState,setLoading);
    }
    useEffect(() => {
        dispatch(fetchBankAccounts({store_id:store.id},setLoading))
    },[])
    return (
        <CCard>
            <CCardBody>
                <CFormGroup>
                    <CLabel>Amount:<span className="text-danger">*</span></CLabel>
                    <CInputGroup>
                        <CInputGroupPrepend>
                            <CInputGroupText>
                                <HtmlEntity>{currency_sym}</HtmlEntity>
                            </CInputGroupText>
                        </CInputGroupPrepend>
                        <input type="number" onChange={(e) => setFValue(e,"amount")} value={formState.amount} className="form-control" placeholder="Enter Amount to withdraw" />
                    </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Bank Account:<span className="text-danger">*</span></CLabel>
                    <select className="form-control" onChange={(e) => setFValue(e,"bank_account_id")} value={formState.bank_account_id}>
                        <option value="">{(loading)? "Please Wait...":"Select Bank Account"}</option>
                        {
                            bank_accounts.map((item) => (
                                <option key={item.id} value={item.id}>{item.bank_name}</option>
                            ))
                        }
                    </select>
                    <small className="text-muted form-text">
                        Don't have a bank account or wish to add new bank accounts? <Link to="/funds/bank-accounts">Go to banks page</Link>.
                    </small>
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Password:<span className="text-danger">*</span></CLabel>
                    <input onChange={(e) => setFValue(e,"password")} value={formState.password} type="password" placeholder="Enter your password" className="form-control" />
                </CFormGroup>
            </CCardBody>
            <CCardFooter>
                <CButton onClick={onSubmit} color="primary"><Spinner status={loading} /> Submit</CButton>
            </CCardFooter>
        </CCard>
    )
}

export default WRequestForm;