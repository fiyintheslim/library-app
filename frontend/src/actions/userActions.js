import axios from "axios";
import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

export const login = async (dispatch, data) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });
    const options = {
      headers: { "Content-Type": "application/json" },
    };

    const user = await axios.post("/api/v1/login", data, options);
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user.data });
  } catch (err) {
    console.log("error login", err.response);
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: err.response.data.error,
    });
    dispatch({ type: CLEAR_ERRORS });
  }
};
export const register = async (dispatch, user) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const account = await axios.post("/api/v1/register", user, config);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: account.data });
  } catch (err) {
    dispatch({ type: REGISTER_USER_FAIL, payload: err.response.data });

    dispatch({ type: CLEAR_ERRORS });
  }
};
export const loadUser = async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const me = await axios.get("/api/v1/me");

    dispatch({ type: LOAD_USER_SUCCESS, payload: me.data });
  } catch (err) {
    dispatch({ type: LOAD_USER_FAIL, payload: err.response.data.errorMessage });

    dispatch({ type: CLEAR_ERRORS });
  }
};
export const logout = async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });

  const logout = await axios.get("/api/v1/logout");

  dispatch({ type: LOGOUT_SUCCESS, payload: logout.data.message });
};
export const deleteAccount = async (dispatch) => {
  try {
    dispatch({ type: DELETE_PROFILE_REQUEST });

    const res = axios.get("/api/v1/delete/me");

    dispatch({ type: DELETE_PROFILE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: DELETE_PROFILE_FAIL,
      payload: err.response.data.errorMessage,
    });

    dispatch({ type: CLEAR_ERRORS });
  }
};
export const forgotPassword = async (dispatch, password) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/v1/password/reset", password, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: err.response.data.errorMessage,
    });
    dispatch({ type: CLEAR_ERRORS });
  }
};
export const resetPasssword = async (dispatch, det, form) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `/api/v1/password/reset/${det.id}/${det.token}`,
      form,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.errorMessage,
    });
    dispatch({ type: CLEAR_ERRORS });
  }
};
export const clear = (dispatch) => {
  dispatch({ type: "CLEAR" });
};