import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import AddBook from "./pages/AddBook";
import Books from "./pages/Books";
import Details from "./pages/Details";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <App>
                <Home />
              </App>
            }
          />
          <Route
            path="/login"
            element={
              <App>
                <Login />{" "}
              </App>
            }
          />
          <Route
            path="/register"
            element={
              <App>
                <SignUp />
              </App>
            }
          />
          <Route
            path="/me"
            element={
              <App>
                <Profile />
              </App>
            }
          />
          <Route
            path="/password/update"
            element={
              <App>
                <ChangePassword />
              </App>
            }
          />
          <Route
            path="/add"
            element={
              <App>
                <AddBook />
              </App>
            }
          />
          <Route
            path="/books"
            element={
              <App>
                <Books />
              </App>
            }
          />
          <Route
            path="/details/:id"
            element={
              <App>
                <Details />
              </App>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
