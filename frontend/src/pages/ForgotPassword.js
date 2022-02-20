import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, clear } from "../actions/userActions";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { message, loading, error } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (message) {
      alert.success(message);
    }
    if (error) {
      alert.error(error);
    }
    clear(dispatch);
  }, [alert, message, loading, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.set("email", email);
    return forgotPassword(dispatch, form);
  };

  return (
    <Container className="my-5 h-100 d-flex justify-content-center align-items-center">
      <form
        onSubmit={handleSubmit}
        className="w-100 d-flex flex-column align-items-center rounded py-4 px-2 px-md-5 border border-2 bibli-form"
        style={{ maxWidth: "750px" }}
      >
        <h5 className="fs-2">Forgot Password</h5>
        <div className="mb-3 w-100">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <button
          type="submit"
          disabled={loading ? true : false}
          className="btn bibli-btn w-100"
        >
          Reset Password
        </button>
      </form>
    </Container>
  );
};

export default ForgotPassword;
