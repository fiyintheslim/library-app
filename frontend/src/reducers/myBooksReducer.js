import {
  MY_BOOKS_REQUEST,
  MY_BOOKS_SUCCESS,
  MY_BOOKS_FAIL,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAIL,
  CLEAR_MESSAGE,
  CLEAR_ERRORS,
} from "../constants/booksConstants";
const myBooks = (state = {}, action) => {
  switch (action.type) {
    case MY_BOOKS_REQUEST:
    case DELETE_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MY_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload,
      };
    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case MY_BOOKS_FAIL:
    case DELETE_BOOK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};
export default myBooks;
