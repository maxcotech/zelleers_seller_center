import { CButton, CCard, CCardBody, CCardFooter, CFormGroup, CLabel } from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBankCodes } from "src/redux/actions/WalletActions";
import { fetchCurrencies } from './../../../../redux/actions/CountryActions';
import Spinner from './../../../../components/Spinner';


const BankAccountForm = (props) => {
    const {defaultData,submitHandler} = props;
    const [bankCodes,setBankCodes] = useState([]);
    const {currencies} = useSelector(state => state.country);
    const [bankCodesLoading,setBankCodesLoading] = useState(false);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const [formState,setFormState] = useState({
        id: defaultData?.id ?? null,
        bank_name: defaultData?.bank_name ?? "",
        bank_code: defaultData?.bank_code ?? "",
        bank_currency_id: defaultData?.bank_currency_id ?? "",
        account_number: defaultData?.account_number ?? "",
        password: "",
        store_id:defaultData?.store_id ?? null
    });

    const setFValue = (e,key) => {
        setFormState({
            ...formState,
            [key]: e.target.value
        })
    }

    useEffect(() => {
        if(defaultData?.bank_currency_id){
            dispatch(fetchBankCodes(defaultData?.bank_currency_id,setBankCodesLoading,(data) => {
                setBankCodes(data);
            }))
        }
        if(currencies.length < 1){
            dispatch(fetchCurrencies({paginate:0},setLoading))
        }
    },[]);

    const onChangeCurrency = (e) => {
        const value = e.target.value;
        if(value !== formState.bank_currency_id){
            setFormState({
                ...formState,
                bank_code:"",
                bank_currency_id:value
            })
        }
        dispatch(fetchBankCodes(value,setBankCodesLoading,(data) => {
            setBankCodes(data);
        }))
       
    }

    const getBankCodeLabel = () => {
        if(bankCodesLoading) return "Loading Bank Codes...";
        if(bankCodes.length < 1) return "Select Currency First";
        return "Select Bank Code";
    }

    const onSubmit = () => {
        submitHandler(formState,setLoading)
    }


    return (
        <CCard>
            <CCardBody>
                <CFormGroup>
                    <CLabel>Bank Name:<span className="text-danger">*</span></CLabel>
                    <input type="text" className="form-control" placeholder="Enter Bank Name" onChange={(e) => setFValue(e,"bank_name")} value={formState.bank_name} />
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Bank Account Number:<span className="text-danger">*</span></CLabel>
                    <input className="form-control" placeholder="Enter Bank Account Number" onChange={(e) => setFValue(e,"account_number")} value={formState.account_number} />
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Password:<span className="text-danger">*</span></CLabel>
                    <input type="password" className="form-control" placeholder="Enter Your Password" onChange={(e) => setFValue(e,"password")} value={formState.password} />
                </CFormGroup>
                <CFormGroup>
                <CLabel>Bank Currency:<span className="text-danger">*</span></CLabel>
                    <select className="form-control" value={formState.bank_currency_id} onChange={onChangeCurrency}>
                        <option value="">Select Currency</option>
                        {
                            currencies.map((item) => (
                                <option key={"currencies_"+item.id} value={item.id} >{`${item.currency_name} (${item.currency_code})`}</option>
                            ))
                        }
                    </select>
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Bank Code:</CLabel>
                    <select className="form-control" value={formState.bank_code} onChange={(e) => setFValue(e,"bank_code")} >
                        <option value="">{getBankCodeLabel()}</option>
                        {
                            bankCodes.map((item) => (
                                <option key={item.id} value={item.code}>{`${item.code} (${item.name})`}</option>
                            ))
                        }
                    </select>
                </CFormGroup>
            </CCardBody>
            <CCardFooter>
                <CButton onClick={onSubmit} disabled={loading} color="primary"><Spinner status={loading}/> Submit</CButton>
            </CCardFooter>
        </CCard>
    )
}

export default BankAccountForm;