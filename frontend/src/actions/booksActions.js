import axios from "axios";
import {
  REQUEST_BOOKS,
  REQUEST_BOOKS_SUCCESS,
  REQUEST_BOOKS_FAIL,
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAIL,
  REQUEST_DETAILS,
  REQUEST_DETAILS_SUCCESS,
  REQUEST_DETAILS_FAIL,
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

export const searchBook = async (dispatch, page, search, genre) => {
  try {
    dispatch({ type: REQUEST_BOOKS });
    const url = `/api/v1/books?page=${page + 1}${search ? `&${search}` : ""}${
      genre.length > 0 ? `&genres=${genre}` : ""
    }`;
    const result = await axios.get(url);

    dispatch({ type: REQUEST_BOOKS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: REQUEST_BOOKS_FAIL,
      payload: error.response,
    });

    dispatch({ type: CLEAR_ERRORS });
  }
};

export const bookDetails = async (dispatch, id) => {
  try {
    dispatch({ type: REQUEST_DETAILS });

    const res = await axios.get(`/api/v1/details/${id}`);

    dispatch({ type: REQUEST_DETAILS_SUCCESS, payload: res.data.book });
  } catch (error) {
    dispatch({
      type: REQUEST_DETAILS_FAIL,
      payload: error.response.data.errorMessage,
    });

    dispatch({ type: CLEAR_ERRORS });
  }
};
