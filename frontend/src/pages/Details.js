import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Image,
  Col,
  Spinner,
  Modal,
  Button,
  Nav,
  Card,
} from "react-bootstrap";
import { bookDetails } from "../actions/booksActions";
import MetaData from "../components/MetaData";
import StarRatings from "react-star-ratings";

const Details = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { book, loading, error } = useSelector((state) => state.details);

  const [modal, setModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(true);
  const [star, setStar] = useState(0);
  const [review, setReview] = useState("");

  const handleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    bookDetails(dispatch, params.id);
  }, []);
  useEffect(() => {
    if (book) {
      console.log(book);
    }
  }, [loading, book, error]);
  return (
    <>
      <MetaData title={"details"} />
      <Container className="py-3">
        {!loading && book ? (
          <Row>
            <Col lg={4}>
              <Image
                src={book && book.cover ? book.cover.url : ""}
                style={{ width: "100%" }}
              />
            </Col>
            <Col
              lg={8}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h3>{book.title}</h3>
              <p>{book.author ? book.author : ""}</p>
              <div style={{ width: "100%", display: "flex" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-tags-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                  <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                </svg>
                <p>
                  {book.genres.reduce((acc, g) => {
                    return acc + `${g}, `;
                  }, "")}
                </p>
              </div>
              <div>{book.description}</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "220px",
                }}
              >
                <a
                  target="_blank"
                  href={book.link}
                  className="btn btn-md btn-primary"
                  rel="noreferrer"
                >
                  Read book
                </a>
                <button
                  onClick={handleModal}
                  className="btn btn-md btn-primary"
                >
                  Review
                </button>
              </div>
            </Col>
          </Row>
        ) : (
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Container>
      <Modal
        show={modal}
        onHide={handleModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="#first">
                <Nav.Item>
                  <Nav.Link href="#first" onClick={(e) => setModalInfo(true)}>
                    Book Reviews
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#link" onClick={(e) => setModalInfo(false)}>
                    Add Review
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>

            <Card.Body className={`${modalInfo ? "d-block" : "d-none"}`}>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>

            <Card.Body
              className={`${
                !modalInfo ? "d-block" : "d-none"
              } d-flex flex-column align-items-center`}
            >
              <StarRatings
                rating={star}
                changeRating={(e) => setStar(e)}
                numberOfStars={5}
                starRatedColor={"gold"}
                starEmptyColor={"rgb(203, 211, 227)"}
                starHoverColor={"gold"}
              />
              <textarea
                class="form-control my-3"
                id="exampleFormControlTextarea1"
                rows="3"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
              <Button variant="primary">Rate</Button>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Details;
