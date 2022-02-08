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
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
    case LOGIN_USER_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOGOUT_REQUEST:
    case DELETE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isAuthenticated: true,
        success: true,
      };
    case LOAD_USER_FAIL:
    case LOGIN_USER_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };
    case DELETE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case LOGOUT_SUCCESS:
    case DELETE_PROFILE_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
        message: action.payload,
      };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default userReducer;
