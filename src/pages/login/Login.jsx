import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  sendForgotPasswordToken,
} from "src/redux/actions/AuthActions";
import { Redirect, useHistory } from "react-router";
import Spinner from "src/components/Spinner";
import AppModal from "src/components/AppModal";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.app.loading);
  const loggedIn = useSelector((state) => state.auth.logged_in);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const setFormStateValue = (key, value) => {
    setFormState({
      ...formState,
      [key]: value,
    });
  };

  const onSubmit = () => {
    dispatch(
      loginUser(formState, (data) => {
        localStorage.setItem("cozeller_token", data?.token);
        window.location.assign("/dashboard");
      })
    );
  };
  return loggedIn === false ? (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-lg-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <div className="d-flex flex-row justify-content-between">
                      <p className="text-muted">Sign In to your account</p>
                      <p className="text-right">
                        <Link className="text-success" to="/register">
                          Or Register
                        </Link>
                      </p>
                    </div>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={(e) =>
                          setFormStateValue("email", e.target.value)
                        }
                        type="text"
                        placeholder="Email"
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={(e) =>
                          setFormStateValue("password", e.target.value)
                        }
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          disabled={loading}
                          onClick={() => onSubmit()}
                          color="success"
                          className="px-4"
                        >
                          <Spinner color="text-light" status={loading} /> Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <ForgotPassword />
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-success py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      If you had no previous account with us or you had either
                      customer account or store worker/manager account and now
                      you wish to own a store account.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="success"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  ) : (
    <Redirect to={{ pathname: "/dashboard" }} />
  );
};

export default Login;

function ForgotPassword() {
  const [view, setView] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const loading = useSelector((state) => state.app.loading);
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(
      sendForgotPasswordToken({ email }, () => history.push("/forgot-password"))
    );
  };

  return (
    <>
      <p
        className="text-success px-0"
        style={{ cursor: "pointer" }}
        onClick={() => setView(true)}
      >
        Forgot password?
      </p>
      <AppModal
        centered
        show={view}
        onClose={() => setView(false)}
        title="Forgot password"
      >
        <p style={{ fontSize: "17px", textAlign: "center" }}>
          Enter your email registered to this platform for account verification
        </p>
        <CInputGroup className="mb-3">
          <CInputGroupPrepend>
            <CInputGroupText>
              <CIcon name="cil-user" />
            </CInputGroupText>
          </CInputGroupPrepend>
          <CInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            autoComplete="username"
          />
        </CInputGroup>

        <CButton
          disabled={loading}
          onClick={() => onSubmit()}
          color="success"
          className="px-4"
        >
          <Spinner color="text-light" status={loading} /> Submit email
        </CButton>
      </AppModal>
    </>
  );
}
