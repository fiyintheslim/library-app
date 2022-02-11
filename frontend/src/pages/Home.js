import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

import MetaData from "../components/MetaData";

const Home = () => {
  const [index, setIndex] = useState(0);
  const [latest, setLatest] = useState([]);
  const [rated, setRated] = useState([]);
  const [loaded, setLoaded] = useState(false);

  function handleCarousel(ind, e) {
    setIndex(ind);
  }
  const loadLatest = async () => {
    const res = await axios.get("/api/v1/latest");

    setLatest(res.data.latestBooks);
  };
  const highestRated = async () => {
    const res = await axios.get("/api/v1/rated");

    setRated(res.data.rated);
  };
  useEffect(() => {
    if (rated.length <= 0 || latest.length <= 0) {
      loadLatest();
      highestRated();
    }
  }, [latest, rated]);
  return (
    <>
      <MetaData title={"Home"} />
      <Container fluid className=" p-0">
        <Carousel activeIndex={index} onSelect={handleCarousel}>
          <Carousel.Item>
            <img
              className="d-block w-100 img-fluid vh-10"
              src="img/book1.jpg"
              alt="First slide"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 img-fluid vh-10"
              src="img/book2.jpg"
              alt="Second slide"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 img-fluid"
              src="img/book3.jpg"
              alt="Third slide"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </Carousel.Item>
        </Carousel>
      </Container>
      <Container className="my-2 text-light mb-5">
        <Row className=" gy-2">
          <Col lg className="mg-1">
            <Card className="d-flex flex-row align-middle bg-secondary p-3 rounded shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "60px", height: "60px", fill: "white" }}
                fill="currentColor"
                className="bi bi-box-arrow-in-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
                />
                <path
                  fillRule="evenodd"
                  d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
              <Container fluid>
                <Card.Title>Sign up</Card.Title>
                <Card.Body>Join us.</Card.Body>
              </Container>
            </Card>
          </Col>
          <Col lg>
            <Card className="d-flex flex-row align-middle bg-success p-3 rounded shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "60px", height: "60px", fill: "white" }}
                fill="currentColor"
                className="bi bi-cloud-upload"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
                />
                <path
                  fillRule="evenodd"
                  d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"
                />
              </svg>
              <Container fluid>
                <Card.Title>Add books</Card.Title>
                <Card.Body>Upload books.</Card.Body>
              </Container>
            </Card>
          </Col>
          <Col lg className="mg-1">
            <Card className="d-flex flex-row align-middle bg-primary p-3 rounded shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-star-half"
                viewBox="0 0 16 16"
                style={{ width: "60px", height: "60px", fill: "white" }}
              >
                <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
              </svg>
              <Container fluid>
                <Card.Title>Review</Card.Title>
                <Card.Body>Review books.</Card.Body>
              </Container>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container className="my-2">
        <h1>Latest</h1>
        {latest && latest.length > 0 ? (
          <Row>
            {latest.map((book, i) => {
              return (
                <Col
                  className="d-flex justify-content-center col-12 col-lg-3"
                  key={book._id}
                >
                  <Card style={{ height: "350px", width: "100%" }}>
                    <Card.Img
                      variant="top"
                      src={book.cover ? book.cover.url : ""}
                      style={{ height: "50%" }}
                    />
                    <Card.Body className="d-flex flex-column align-items-center justify-content-evenly">
                      <Card.Title className="fs-5">{book.title}</Card.Title>

                      <Link
                        to={`/details/${book._id}`}
                        className="btn-primary btn btn-md"
                      >
                        Details
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <div>
            <p>Problem loading latest books</p>
          </div>
        )}
      </Container>
      <Container className="my-2">
        <h1>Top Rated</h1>
        {rated && rated.length > 0 ? (
          <Row>
            {rated.map((book, i) => {
              return (
                <Col
                  className="d-flex justify-content-center col-12 col-lg-3"
                  key={book._id}
                >
                  <Card style={{ height: "350px", width: "100%" }}>
                    <Card.Img
                      variant="top"
                      src={book.cover ? book.cover.url : ""}
                      style={{ height: "50%" }}
                    />
                    <Card.Body className="d-flex flex-column align-items-center justify-content-evenly">
                      <Card.Title className="fs-5">{book.title}</Card.Title>

                      <Link
                        to={`/details/${book._id}`}
                        className="btn-primary btn btn-md"
                      >
                        Details
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <div>
            <p>Problem loading Top rated books</p>
          </div>
        )}
      </Container>
    </>
  );
};

export default Home;
