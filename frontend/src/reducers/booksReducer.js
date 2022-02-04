import {
  REQUEST_BOOKS,
  REQUEST_BOOKS_SUCCESS,
  REQUEST_BOOKS_FAIL,
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAIL,
  CLEAR_ERRORS,
} from "../constants/booksConstants";

const booksReducers = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_BOOKS:
    case ADD_BOOK_REQUEST:
      return {
        loading: true,
      };
    case REQUEST_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload,
        
      };
    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        added:true
      };
    case REQUEST_BOOKS_FAIL:
    case ADD_BOOK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};
export default booksReducers;
