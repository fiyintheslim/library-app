import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Image,
  Col,
  Card,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../components/MetaData";
import { changeProfilePicture } from "../actions/userUpdateActions";
import { loadUser, deleteAccount } from "../actions/userActions";
import { useAlert } from "react-alert";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const update = useSelector((state) => state.update);
  const [modal, setModal] = useState(false);
  const [img, setImg] = useState("/img/user.svg");

  const handleModal = () => {
    setModal(!modal);
    setImg("/img/user.svg");
  };

  const handleImg = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (e) => {
      setImg(e.target.result);
    };
  };

  const handleDeleteAccount = () => {
    deleteAccount(dispatch);
    navigate("/");
  };

  const handleSubmit = () => {
    const form = new FormData();
    form.set("img", img);
    console.log("form", form);
    changeProfilePicture(dispatch, form);
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (update.message) {
      loadUser(dispatch).then((res) => {
        navigate("/me");
      });

      alert.success(update.message);
    }
    if (update.error) {
      alert.error(update.error);
    }
  }, [update.loading, update.message]);
  return (
    <>
      <MetaData title={"Profile"} />
      {!loading && user ? (
        <Container className="my-5 w-lg-50 p-3 border border-1">
          <h1 className="fs-2">Profile</h1>
          <Row className="gy-2 justify-content-evenly">
            <Col className=" col-md d-flex flex-column justify-content-evenly align-items-center">
              <Image
                src={user.avatar.url}
                roundedCircle={true}
                style={{ objectFit: "cover", height: "320px", width: "320px" }}
                className="img-fluid border"
              />
              <Container
                fluid="md"
                className="d-flex justify-content-evenly my-3"
              >
                <Link className="btn btn-primary btn-sm" to="/password/update">
                  Update Password
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleDeleteAccount}
                >
                  Delete Profile
                </Button>
              </Container>
            </Col>
            <Col className="col-md d-flex flex-column justify-content-evenly">
              <Card className="bibli-card my-2">
                <Card.Body>
                  <Card.Title>Name</Card.Title>
                  <Card.Text>{user.name}</Card.Text>
                </Card.Body>
              </Card>
              <Card className="bibli-card my-2">
                <Card.Body>
                  <Card.Title>Email</Card.Title>
                  <Card.Text>{user.email}</Card.Text>
                </Card.Body>
              </Card>
              <Button
                className="btn btn-primary btn-md w-100"
                onClick={(e) => setModal(true)}
                disabled={update.loading}
              >
                Update Profile Picture
              </Button>
            </Col>
          </Row>
        </Container>
      ) : (
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      <Modal
        show={modal}
        onHide={handleModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Profile Picture
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body className={`d-flex flex-column align-items-center`}>
              <img
                src={img}
                style={{ width: "170px", height: "170px" }}
                alt="avatar"
                title="avatar"
                className="rounded-circle"
              />
              <input
                className="form-control my-3"
                type="file"
                name="avatar"
                id="formFile"
                onChange={handleImg}
              />
              <Button
                variant="primary"
                disabled={update.loading}
                onClick={handleSubmit}
              >
                Set Profile Picture
              </Button>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
