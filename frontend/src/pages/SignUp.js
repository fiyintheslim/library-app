import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.auth);

  const [imgDisp, setImgDisp] = useState("/img/user.svg");
  const [img, setImg] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log(user);
    if (error) {
      alert.error("An error error occurred while signing up.");
    }
    if (success) {
      navigate("/");
    }
  }, [user, loading, error]);

  const handleInput = (e) => {
    if (e.target.name === "avatar") {
      console.log("avatar", e.target);
      const file = e.target.files[0];
      const size = Math.round(file.size / 1024);
      console.log("size", size);
      if (size > 1024) {
        file.value = "";
        return alert.error("Image larger than 1mb");
      } else {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          setImgDisp(fileReader.result);
          setImg(fileReader.result);
        };
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
      console.log("not avatar", user);
    }
  };
  const submit = (e) => {
    e.preventDefault();

    if (!user.name) {
      return alert.error("Please enter your username");
    }
    if (!user.email) {
      return alert.error("Please enter email.");
    }
    if (user.password && user.password !== user.confirmPassword) {
      return alert.error("Confirm password");
    }
    if (!img) {
      return alert.error("Choose appropriate avatar.");
    }

    const formData = new FormData();
    formData.set("name", user.name);
    formData.set("email", user.email);
    formData.set("password", user.password);
    formData.set("avatar", img);

    register(dispatch, formData);
  };
  return (
    <>
      <Container
        fluid="md"
        className="d-flex justify-content-center mt-5 h-100"
      >
        <form
          onSubmit={(e) => submit(e)}
          className="w-100 w-sm-50 d-flex flex-column align-items-center rounded py-4 px-2 px-md-5 border my-3 border-2"
          style={{ maxWidth: "700px" }}
        >
          <h5 className="fs-2">Register</h5>
          <img
            src={imgDisp}
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
              type="text"
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
          <div className="mb-3 w-100">
            <label htmlFor="formFile" className="form-label">
              Add avatar
            </label>
            <input
              className="form-control"
              type="file"
              name="avatar"
              id="formFile"
              onChange={handleInput}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            Submit
          </button>
        </form>
      </Container>
    </>
  );
};

export default SignUp;
