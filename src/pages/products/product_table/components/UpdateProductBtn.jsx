import { CButton } from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import Spinner from "src/components/Spinner";
import { fetchProductDetails } from "src/redux/actions/ProductActions";
import ProductUploadForm from "../../product_upload_form/ProductUploadForm";

const UpdateProductBtn = (props) => {
    const [visible,setVisible] = useState(false);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();

    const onBtnClick = () => {
        dispatch(fetchProductDetails(
            props.product_slug,
            (val) => setLoading(val),
            () => setVisible(true)
        ))
    }

    return (
        <>
            <AppModal size="xl" show={visible} onClose={() => setVisible(false)} closeOnBackdrop={false}>
                <ProductUploadForm updateMode={true} uploadBtnTitle="Publish Update" formTitle="Update Product" />
            </AppModal>
            <CButton onClick={onBtnClick} color="primary">
               <Spinner color="text-light" status={loading} />&nbsp;Update
            </CButton>
        </>
    )
}

export default UpdateProductBtn;