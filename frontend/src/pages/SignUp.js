import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { register } from "../actions/userActions";

const SignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [img, setImg] = useState("/img/user.svg");
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleInput = (e) => {
    if (e.target.name === "avatar") {
      console.log("avatar", e.target);
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setImg(fileReader.result);
      };
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
      console.log("not avatar", user);
    }
  };
  const register = (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      return alert.error("Confirm password");
    }
    const formData = new FormData();
    formData.set("name", user.name);
    formData.set("email", user.email);
    formData.set("password", user.password);
    formData.set("avatar", img);
    console.log(formData);
    register(dispatch, formData);
  };
  return (
    <>
      <Container
        fluid="md"
        className="d-flex justify-content-center mt-5 h-100"
      >
        <form
          onSubmit={register}
          className="w-100 w-sm-50 d-flex flex-column align-items-center rounded py-4 px-2 px-md-5 border border-2"
        >
          <h5 className="fs-2">Register</h5>
          <img
            src={img}
            style={{ width: "170px", height: "170px" }}
            alt="avatar"
            title="avatar"
            className="rounded-circle"
          />
          <div className="mb-3 w-100">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputName"
              aria-describedby="nameHelp"
              name="name"
              onChange={handleInput}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={handleInput}
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
              name="password"
              onChange={handleInput}
            />
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              name="confirmPassword"
              onChange={handleInput}
            />
          </div>
          <div class="mb-3 w-100">
            <label for="formFile" class="form-label">
              Add avatar
            </label>
            <input
              class="form-control"
              type="file"
              name="avatar"
              id="formFile"
              onChange={handleInput}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </Container>
    </>
  );
};

export default SignUp;
