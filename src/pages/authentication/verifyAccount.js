import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CRow } from '@coreui/react'
import React from 'react'
import Countdown from 'react-countdown';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from 'src/components/Spinner';
import { emailVerification, sendEmailVerificationToken } from 'src/redux/actions/AuthActions';

function ForgotPassword() {
    const dispatch = useDispatch();
    const email = localStorage.getItem("user_email")
    const loading = useSelector((state) => state.app.loading);
    const [formState, setFormStateValue] = React.useState({});
    const [resend, setResend] = React.useState(false);
    const history = useHistory();

    const handler = (val, key) => {
        setFormStateValue({ ...formState, [key]: val })
    }

    React.useEffect(() => {
        if (email) {
            handler(email, "email");
        } else {
            history.goBack();
        }
    }, []);

    async function Completionist() {

        if (email) {
            const data = { email: email }
            dispatch(sendEmailVerificationToken(data, () => setResend(!resend)));
        } else {
            toast.error('No email specified');
        }
    }



    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <div onClick={Completionist} style={{ color: "green", cursor: 'pointer', display: 'inline-block', marginLeft: '5px' }}>Resend code? </div>
        } else {
            // Render a countdown
            return <span> {loading ? <Spinner status={loading} color="text-success" /> : `${minutes}:${seconds}`}</span>;
        }
    };


    const onSubmit = () => {
        dispatch(emailVerification(formState, () => history.push("/login")))
    }

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="6" lg="6">
                        <CCardGroup>
                            <CCard className="p-lg-4">
                                <CCardBody>
                                    <CForm>
                                        <h1>Email verification</h1>
                                        <div className="d-flex flex-row justify-content-between">
                                            <p className="text-muted">An xxxxxx digit code has been sent to{email ?? "your email"}, enter this code to verify your email</p>
                                        </div>
                                        <CInputGroup className="mb-1">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput onChange={(e) => handler(e.target.value, "password")} type="number" placeholder="token" />
                                        </CInputGroup>
                                    </CForm>
                                    <span className='mb-2' style={{ float: 'right' }}><span style={{ paddingRight: '10px' }}>{`Resend code after time`}</span>
                                        <span style={{ float: 'right' }}><Countdown zeroPadTime={2} key={resend} date={Date.now() + 90000} renderer={renderer} /></span></span>

                                    <CButton disabled={loading} onClick={() => onSubmit()} color="success" className="px-4"><Spinner color="text-light" status={loading} /> Verify email</CButton>

                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default ForgotPassword