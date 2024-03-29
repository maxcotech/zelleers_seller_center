import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthGuard from "./config/guards/AuthGuard";
import { fetchUser } from "./redux/actions/AuthActions";
import "react-toastify/dist/ReactToastify.css";
import "./scss/style.scss";
import axios from "axios";
import LoadingPage from "./components/LoadingPage";
import { ipFetchUrl } from "./config/constants/app_constants";
import {
  getCookie,
  isCookieSet,
  setCookie,
} from "./config/helpers/cookie_helpers";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./pages/login/Login"));
const Register = React.lazy(() => import("./pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const InvalidAccount = React.lazy(() =>
  import("./pages/invalid_account/InvalidAccount")
);
const ForgotPassword = React.lazy(() =>
  import("./pages/authentication/forgotPassword")
);
const VerifyAccount = React.lazy(() =>
  import("./pages/authentication/verifyAccount")
);

const App = (props) => {
  const auth = useSelector((state) => state.auth);
  const store = useSelector((state) => state.store);
  const token = localStorage.getItem("cozeller_token");
  const dispatch = useDispatch();

  const getUserIpPayload = async () => {
    if (isCookieSet("ip_payload")) {
      const cookiev = getCookie("ip_payload");
      console.log("Via cookies", cookiev);
      return cookiev;
    } else {
      const res = await axios.get(ipFetchUrl, { withCredentials: false });
      console.log(res);
      const finalRes = JSON.stringify(res.data);
      setCookie("ip_payload", finalRes, 1);
      return finalRes;
    }
  };

  useEffect(async () => {
    console.log("App initialized. Fetching user...");
    axios.defaults.withCredentials = true;
    axios.defaults.headers["X-client-ip-payload"] = await getUserIpPayload();
    if (token) {
      axios.defaults.headers.authorization = `Bearer ${token}`;
    }
    // axios.interceptors.request.use((configs) => {
    //   configs.headers.authorization = `Bearer ${token}`
    // })
    if (dispatch && auth.init === false) {
      dispatch(fetchUser());
    }
  }, [auth.logged_in]);

  return (
    <HashRouter>
      <ToastContainer />
      <React.Suspense fallback={<LoadingPage />}>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          />
          <Route
            exact
            path="/404"
            name="Page 404"
            render={(props) => <Page404 {...props} />}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            render={(props) => <Page500 {...props} />}
          />
          <Route
            exact
            path="/invalid-account"
            name="Invalid Account"
            render={(props) => <InvalidAccount {...props} />}
          />
          <Route
            exact
            path="/forgot-password"
            name="Forgot password"
            render={(props) => <ForgotPassword {...props} />}
          />
          <Route
            exact
            path="/verify-account"
            name="Verify account"
            render={(props) => <VerifyAccount {...props} />}
          />
          <AuthGuard
            loggedIn={auth.logged_in}
            path="/"
            name="Home"
            redirectTo="/login"
            userStore={store.current_store}
            userRole={auth.user?.user_type}
            component={TheLayout}
          />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default App;
