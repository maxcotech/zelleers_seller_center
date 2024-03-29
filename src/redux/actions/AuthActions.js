import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "src/config/constants/app_constants";
import { handleAxiosError } from "src/config/helpers/http_helpers";
import { handleArrayMessage } from "src/config/helpers/message_helpers";
import Swal from "sweetalert2";
import { AUTH_ACTION_TYPES } from "../action_types/AuthActionTypes";
import { setLoading, useCustomLoader } from "./AppActions";
import { setStore } from "./StoreActions";

export const setUserData = (data, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: AUTH_ACTION_TYPES.setUserData,
      payload: data,
    });
    dispatch(
      setStore({
        current_store: data.current_store ?? null,
        stores: data.stores ?? [],
      })
    );

    resolve();
  });
};

export const sendEmailVerificationToken = (data, onComplete = null) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios
      .post(`${BASE_URL}email_verification/send`, data)
      .then((result) => {
        dispatch(setLoading(false));
        if (result.data?.status === "success") {
          toast.success(result.data.message);
          if (onComplete) onComplete();
        } else {
          result.data?.message
            ? handleArrayMessage(result.data?.message, toast.error)
            : toast.error("An error occurred");
        }
      })
      .catch((ex) => {
        dispatch(setLoading(false));
        handleAxiosError(ex);
      });
  };
};
export const emailVerification = (data, onComplete = null) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios
      .post(`${BASE_URL}email_verification/complete`, data)
      .then((result) => {
        dispatch(setLoading(false));
        if (result.data?.status === "success") {
          toast.success(result.data.message);
          localStorage.removeItem("user_email");
          if (onComplete) onComplete();
        } else {
          result.data?.message
            ? handleArrayMessage(result.data?.message, toast.error)
            : toast.error("An error occurred");
        }
      })
      .catch((ex) => {
        dispatch(setLoading(false));
        handleAxiosError(ex);
      });
  };
};

export const sendForgotPasswordToken = (data, onComplete = null) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios
      .post(`${BASE_URL}reset_password/email/init`, data)
      .then((result) => {
        dispatch(setLoading(false));
        if (result.data?.status === "success") {
          toast.success(result.data.message);
          localStorage.removeItem("user_email");
          localStorage.setItem("user_email", data.email);
          if (onComplete) onComplete();
        } else {
          result.data?.message
            ? handleArrayMessage(result.data?.message, toast.error)
            : toast.error("An error occurred");
        }
      })
      .catch((ex) => {
        dispatch(setLoading(false));
        handleAxiosError(ex);
      });
  };
};

export const resetPasswordComplete = (data, onComplete = null) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios
      .post(`${BASE_URL}reset_password/email/complete`, data)
      .then((result) => {
        dispatch(setLoading(false));
        if (result.data?.status === "success") {
          toast.success(result.data.message);
          localStorage.removeItem("user_email");
          if (onComplete) onComplete();
        } else {
          result.data?.message
            ? handleArrayMessage(result.data?.message, toast.error)
            : toast.error("An error occurred");
        }
      })
      .catch((ex) => {
        dispatch(setLoading(false));
        handleAxiosError(ex);
      });
  };
};

export const registerUser = (data, onComplete = null) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios
      .post(`${BASE_URL}user/register`, data)
      .then((result) => {
        dispatch(setLoading(false));
        if (result.data?.status === "success") {
          toast.success(result.data.message);
          localStorage.setItem("user_email", data.email);
          if (onComplete) onComplete();
        } else {
          result.data?.message
            ? handleArrayMessage(result.data?.message, toast.error)
            : toast.error("An Error Occurred.");
        }
      })
      .catch((ex) => {
        dispatch(setLoading(false));
        handleAxiosError(ex);
      });
  };
};

export const fetchUser = (onComplete = null) => {
  return (dispatch) => {
    console.log("retriving user data");
    dispatch(setLoading(true));
    axios
      .get(`${BASE_URL}user/profile`)
      .then((result) => {
        dispatch(setLoading(false));
        if (result.data.status == "success") {
          console.log(result.data);
          setUserData(result.data.data, dispatch).then(() => {
            if (onComplete) onComplete();
          });
        } else {
          toast.error(result.data?.message ?? "An Error Occurred.");
        }
      })
      .catch((ex) => {
        dispatch(setLoading(false));
        handleAxiosError(ex);
      });
  };
};

export const loginUser = (data, onComplete = null) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios
      .post(`${BASE_URL}user/login`, data)
      .then((result) => {
        dispatch(setLoading(false));
        if (result.data?.status == "success") {
          toast.success("You have successfully signed in.");
          console.log(result?.data?.data);
          dispatch(
            fetchUser(() =>
              onComplete ? onComplete(result?.data?.data) : false
            )
          );
        } else {
          result.data?.message
            ? handleArrayMessage(result.data?.message, toast.error)
            : toast.error("An Error Occurred");
        }
      })
      .catch((ex) => {
        console.log(ex);
        dispatch(setLoading(false));
        handleAxiosError(ex);
      });
  };
};

export const setLogoutUser = () => {
  return {
    type: AUTH_ACTION_TYPES.logoutUser,
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    axios
      .delete(`${BASE_URL}user/logout`)
      .then((result) => {
        if (result.data?.status === "success") {
          dispatch(setLogoutUser());
          localStorage.removeItem("cozeller_token");
        } else {
          result.data?.message
            ? handleArrayMessage(result.data.message, toast.error)
            : toast.error("An Error Occurred");
        }
      })
      .catch((ex) => {
        handleAxiosError(ex);
      });
  };
};

export const updateUserCurrency = (
  currency_id,
  iloader = null,
  onComplete = null
) => {
  return async (dispatch) => {
    try {
      dispatch(useCustomLoader(true, iloader));
      const params = { currency_id };
      const result = await axios.put(`${BASE_URL}user/currency`, params);
      dispatch(useCustomLoader(false, iloader));
      if (result.data?.status === "success") {
        if (onComplete) onComplete();
      } else {
        toast.error(result.data?.error ?? "An Error Occurred.");
      }
    } catch (ex) {
      handleAxiosError(ex);
      dispatch(useCustomLoader(false, iloader));
    }
  };
};
