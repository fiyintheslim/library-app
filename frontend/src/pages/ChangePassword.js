import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../components/MetaData";
import { changePassword } from "../actions/userUpdateActions";

const ChangePassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error } = useSelector((state) => state.update);

  useEffect(() => {
    if (message) {
      alert.success("Password change successful.");
      navigate("/me");
    }
  }, [message, error, loading, alert, dispatch]);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    if (!oldPassword || !password || !confirm) {
      alert.error("Please fill all the fields.");
    } else {
      if (confirm !== password) {
        alert.error("Passwords don't match.");
      }
      const form = new FormData();
      form.set("oldPassword", oldPassword);
      form.set("password", password);
      console.log(form);
      changePassword(dispatch, form);
    }
  };
  return (
    <>
      <MetaData title={"Change Password"} />
      <Container className="my-5 d-flex justify-content-center" fluid="md">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="border border-light border-2 border-rounded p-3 w-50 d-flex flex-column align-items-center"
        >
          <h5 className="fs-2">Change Password</h5>
          <Form.Group className="mb-4 w-100">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
              placeholder="Enter old password"
              value={oldPassword}
            />
          </Form.Group>

          <Form.Group className="mb-4 w-100">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Password"
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
            className="btn btn-primary w-100"
          >
            Change Password
          </button>
        </form>
      </Container>
    </>
  );
};

export default ChangePassword;
