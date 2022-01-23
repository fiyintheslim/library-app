import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/authReducers";

const reducers = combineReducers({
  auth: userReducer,
});

const middlewares = [thunk];

const store = createStore(reducers, {}, applyMiddleware(...middlewares));
export default store;
