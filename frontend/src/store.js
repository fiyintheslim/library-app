import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./reducers/authReducers";
import userUpdateReducer from "./reducers/userUpdateReducers";
import booksReducer from "./reducers/booksReducer";

const reducers = combineReducers({
  auth: userReducer,
  update: userUpdateReducer,
  books: booksReducer,
});

const middlewares = [thunk];

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(...middlewares))
);
export default store;
