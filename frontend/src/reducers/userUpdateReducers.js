import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PROFILE_PICTURE_REQUEST,
  CHANGE_PROFILE_PICTURE_SUCCESS,
  CHANGE_PROFILE_PICTURE_FAIL,
  CLEAR_ERRORS,
  CLEAR,
} from "../constants/userConstants";

const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
    case CHANGE_PROFILE_PICTURE_REQUEST:
      return { loading: true };
    case CHANGE_PASSWORD_SUCCESS:
    case CHANGE_PROFILE_PICTURE_SUCCESS:
      return { ...state, loading: false, message: action.payload };
    case CHANGE_PASSWORD_FAIL:
    case CHANGE_PROFILE_PICTURE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    case CLEAR:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export default updateUserReducer;
