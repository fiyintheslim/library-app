import React, { useEffect } from "react";
import { Container, Row, Image, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../components/MetaData";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <MetaData title={"Profile"} />
      <Container className="my-5 w-lg-50 p-3 border border-1">
        <h1 className="fs-2">Profile</h1>
        <Row className="gy-2 justify-content-evenly">
          <Col className=" col-md d-flex flex-column justify-content-evenly align-items-center">
            <Image
              src={user.avatar.url}
              roundedCircle={true}
              style={{ objectFit: "cover", height: "320px", width: "320px" }}
              className="img-fluid"
            />
            <Container
              fluid="md"
              className="d-flex justify-content-evenly my-3"
            >
              <Link className="btn btn-primary btn-sm" to="/password/update">
                Update Password
              </Link>
              <Button variant="danger" size="sm">
                Delete Profile
              </Button>
            </Container>
          </Col>
          <Col className="col-md d-flex flex-column justify-content-evenly">
            <Card className="bibli-card">
              <Card.Body>
                <Card.Title>Name</Card.Title>
                <Card.Text>{user.name}</Card.Text>
              </Card.Body>
            </Card>
            <Card className="bibli-card">
              <Card.Body>
                <Card.Title>Email</Card.Title>
                <Card.Text>{user.email}</Card.Text>
              </Card.Body>
            </Card>
            <Link className="btn btn-primary btn-md w-100" to="/update">
              Update Profile
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
