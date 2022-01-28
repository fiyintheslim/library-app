import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, loading: false, message: action.payload };
    case CHANGE_PASSWORD_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default updateUserReducer;
