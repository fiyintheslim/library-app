import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { login } from "../actions/userActions";

const Login = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [loading, error, isAuthenticated]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);
    login(dispatch, formData);
  };

  return (
    <>
      <Container className="mt-5 h-100 d-flex justify-content-center align-items-center">
        <form
          onSubmit={handleSubmit}
          className="w-md-50 w-sm-50 d-flex flex-column align-items-center rounded py-4 px-2 px-md-5 border border-2"
        >
          <h5 className="fs-2">Login</h5>
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
          <div className="mb-3 w-100">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading ? true : false}
            className="btn btn-primary w-100"
          >
            Submit
          </button>
          <div className="d-flex justify-content-evenly">
            <Link to="/register">Sign up</Link>
          </div>
        </form>
      </Container>
    </>
  );
};

export default Login;
