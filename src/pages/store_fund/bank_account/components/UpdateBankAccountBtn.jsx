import { CButton } from "@coreui/react";
import { useState } from "react";
import AppModal from "src/components/AppModal";
import BankAccountForm from "./BankAccountForm";
import { useDispatch } from 'react-redux';
import { updateBankAccount } from "src/redux/actions/WalletActions";


const UpdateBankAccountBtn = (props) => {
    const {item,onComplete} = props;
    const [visible,setVisible] = useState(false);
    const dispatch = useDispatch();
    const onUpdateAccount = (data,iloader) => {
        dispatch(updateBankAccount(data,iloader,() => {
            if(onComplete) onComplete();
            setVisible(false);
        }))
    }

    return (
        <>
            <CButton onClick={() => setVisible(true)} color="primary">Update</CButton>
            <AppModal show={visible} onClose={() => setVisible(false)} title="Update Bank Account" >
                <BankAccountForm submitHandler={onUpdateAccount} defaultData={item} />
            </AppModal>
        </>
    )
}

export default UpdateBankAccountBtn;