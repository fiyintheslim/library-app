import {
  REQUEST_DETAILS,
  REQUEST_DETAILS_SUCCESS,
  REQUEST_DETAILS_FAIL,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/booksConstants";
const bookDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_DETAILS:
    case ADD_REVIEW_REQUEST:
      return { ...state, loading: true };
    case REQUEST_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        book: action.payload,
      };
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message,
      };
    case REQUEST_DETAILS_FAIL:
    case ADD_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
      };
    default:
      return state;
  }
};

export default bookDetailsReducer;
