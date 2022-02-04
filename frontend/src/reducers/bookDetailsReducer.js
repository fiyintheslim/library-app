import {
  REQUEST_DETAILS,
  REQUEST_DETAILS_SUCCESS,
  REQUEST_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/booksConstants";
const bookDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_DETAILS:
      return { loading: true };
    case REQUEST_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        book: action.payload,
      };
    case REQUEST_DETAILS_FAIL:
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
