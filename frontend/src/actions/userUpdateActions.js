import axios from "axios";
import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";
export const changePassword = async (dispatch, data) => {
  try {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const change = await axios.put("/api/v1/password/update", data, config);

    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: change.data.message });
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
      payload: error.response.data.errorMessage,
    });

    dispatch({ type: CLEAR_ERRORS });
  }
};
