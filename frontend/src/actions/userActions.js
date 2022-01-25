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
  CLEAR_ERRORS,
} from "../constants/userConstants";

export const login = async (dispatch, data) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });
    const options = {
      headers: { "Content-Type": "application/json" },
    };

    const user = await axios.post("/login", data, options);
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user.data.user });
  } catch (err) {
    dispatch({ type: LOGIN_USER_FAIL, payload: err.response });
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
