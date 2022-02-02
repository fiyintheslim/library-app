import axios from "axios";
import {
  REQUEST_BOOKS,
  REQUEST_BOOKS_SUCCESS,
  REQUEST_BOOKS_FAIL,
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAIL,
  CLEAR_ERRORS,
} from "../constants/booksConstants";

export const addBook = async (dispatch, data) => {
  try {
    dispatch({ type: ADD_BOOK_REQUEST });
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await axios.post("/api/v1/add", data, options);

    dispatch({ type: ADD_BOOK_SUCCESS, payload: res.data.book });
  } catch (error) {
    dispatch({
      type: ADD_BOOK_FAIL,
      payload: error.response.data.errorMessage,
    });

    dispatch({ type: CLEAR_ERRORS });
  }
};

export const searchBook = async (dispatch, page, categories) => {
  try {
    dispatch({ type: REQUEST_BOOKS });

    const result = await axios.get(`/api/v1/books?page=${page || 1}`);

    dispatch({ type: REQUEST_BOOKS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: REQUEST_BOOKS_FAIL,
      payload: error.response.data.errorMessage,
    });

    dispatch({ type: CLEAR_ERRORS });
  }
};
