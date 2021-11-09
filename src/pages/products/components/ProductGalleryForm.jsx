import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import FileUploadComponent from "src/components/FileUploadComponent";
import { uploadGalleryImage } from "src/redux/actions/CurrentProductActions";

const { CCard, CCardBody, CCol, CRow, CButton, CFormGroup } = require("@coreui/react")

const ProductGalleryForm = (props) => {
    const dispatch = useDispatch();
    const current_product = useSelector(state => state.current_product);

    return (
        <CCard>
            <CCardBody>
                <CRow>
                    <CCol lg={{size:4}}>
                        <FileUploadComponent
                            id="front_image"
                            onFileChanged={(file,loader) => dispatch(uploadGalleryImage(file,"front_image",loader))}
                            caption="Front Image"
                            file_path={current_product.front_image}
                
                        />
                    </CCol>
                    <CCol lg={{size:4}}>
                        <FileUploadComponent
                            id="back_image"
                            onFileChanged={(file,loader) => dispatch(uploadGalleryImage(file,"back_image",loader))}
                            caption="Back Image"
                            file_path={current_product.back_image}
                        />
                    </CCol>
                    <CCol lg={{size:4}}>
                        <FileUploadComponent
                            id="side_image"
                            onFileChanged={(file,loader) => dispatch(uploadGalleryImage(file,"side_image",loader))}
                            caption="Side Image"
                            file_path={current_product.side_image}
                        />
                    </CCol>
                    <CCol lg={{size:4}}>
                        <FileUploadComponent
                            id="fourth_image"
                            onFileChanged={(file,loader) => dispatch(uploadGalleryImage(file,"fourth_image",loader))}
                            caption="Fourth Image"
                            file_path={current_product.fourth_image}
                        />
                    </CCol>
                    <CCol lg={{size:4}}>
                        <FileUploadComponent
                            id="fifth_image"
                            onFileChanged={(file,loader) => dispatch(uploadGalleryImage(file,"fifth_image",loader))}
                            caption="Fifth Image"
                            file_path={current_product.fifth_image}

                        />
                    </CCol>
                </CRow>
                <CFormGroup>
                    <CButton color="primary" onClick={() => props.onNext()}>Continue</CButton>
                </CFormGroup>
            </CCardBody>
        </CCard>
    )
}

export default ProductGalleryForm;