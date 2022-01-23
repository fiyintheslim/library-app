import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Container className="mt-5 h-100">
        <form
          onSubmit={Login}
          className="w-100 w-sm-50 d-flex flex-column align-items-center rounded py-4 px-2 px-md-5 border border-2"
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
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
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
