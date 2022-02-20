import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Form, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../components/MetaData";
import { resetPasssword } from "../actions/userActions";

const ResetPassword = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  console.log(params);

  const { loading, message, error } = useSelector(
    (state) => state.forgotPassword
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (message) {
      alert.success(message);
      navigate("/login");
    }
  }, [loading, message, alert, error]);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      return alert.error("Passwords don't match");
    }
    const form = new FormData();
    form.set("password", password);
    return resetPasssword(dispatch, params, form);
  };
  return (
    <>
      <MetaData title={"Forgot password"} />
      <Container className="my-5 d-flex justify-content-center" fluid="md">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="mx-0 w-100 mx-md-5 border border-light border-2 border-rounded p-3 d-flex flex-column align-items-center"
          style={{ maxWidth: "750px" }}
        >
          <h5 className="fs-2">Change Password</h5>
          <Form.Group className="mb-4 w-100">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
              value={password}
            />
          </Form.Group>

          <Form.Group className="mb-4 w-100">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              onChange={(e) => setConfirm(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              value={confirm}
            />
          </Form.Group>

          <button
            disabled={loading ? true : false}
            className="btn bibli-btn w-100"
          >
            Change Password
          </button>
        </form>
      </Container>
    </>
  );
};

export default ResetPassword;
