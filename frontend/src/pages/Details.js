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
import { bookDetails, addReview } from "../actions/booksActions";
import MetaData from "../components/MetaData";
import StarRatings from "react-star-ratings";

const Details = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { book, loading, error, success } = useSelector(
    (state) => state.details
  );
  const { user } = useSelector((state) => state.auth);

  const [modal, setModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(true);
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");

  const handleModal = () => {
    setModal(!modal);
    setModalInfo(true);
  };
  const handleReview = () => {
    console.log(comment, star, reviewTitle);
    const form = new FormData();
    form.set("rating", star);
    form.set("title", reviewTitle);
    form.set("comment", comment);

    addReview(dispatch, params.id, form);
    setModal(false);
    setStar(0);
  };

  useEffect(() => {
    bookDetails(dispatch, params.id);
  }, [success]);
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
            <Col lg={4} className="d-flex justify-content-center my-2">
              <Image
                src={book && book.cover ? book.cover.url : ""}
                className="img-fluid rounded shadow w-100"
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
              <h3 style={{ color: "#0d6efd", textTransform: "capitalize" }}>
                {book.title}
              </h3>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  color: "#0d6efd",
                  fontWeight: "700",
                  textTransform: "capitalize",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-fill"
                  viewBox="0 0 16 16"
                  style={{
                    width: "20px",
                    height: "20px",
                    fill: "#0d6efd",
                    marginRight: "10px",
                  }}
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
                <p>{book.author ? book.author : ""}</p>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  fontSize: "18px",
                  color: "#aba9a9",
                  fontWeight: "800",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bi bi-star-fill"
                  viewBox="0 0 16 16"
                  style={{
                    height: "20px",
                    width: "20px",
                    fill: "gold",
                    marginRight: "10px",
                  }}
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <p>{book.avgRating ? book.avgRating : "N/A"}</p>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  fontSize: "12px",
                  color: "#aba9a9",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-tags-fill"
                  viewBox="0 0 16 16"
                  style={{
                    position: "relative",
                    height: "20px",
                    width: "20px",
                    marginRight: "10px",
                    fill: "#aba9a9",
                  }}
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
              <div className="my-3">{book.description}</div>
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

            <Card.Body
              className={`${modalInfo ? "d-block" : "d-none"} overflow-auto`}
            >
              {book && book.ratings[0] ? (
                <>
                  {book.ratings.map((rating, i) => (
                    <Container key={i}>
                      <Card.Title>
                        {rating.title}{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="bi bi-star-fill"
                          viewBox="0 0 16 16"
                          style={{
                            height: "20px",
                            width: "20px",
                            fill: "gold",
                          }}
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <span style={{ fontSize: "12px", color: "grey" }}>
                          {rating.rating}/5
                        </span>
                      </Card.Title>
                      <Card.Text>
                        <p>{rating.comment}</p>
                        <p style={{ color: "grey", fontSize: "10px" }}>
                          rated by {rating.user}
                        </p>
                      </Card.Text>
                    </Container>
                  ))}
                </>
              ) : (
                <>
                  <Container>
                    <Card.Title>No Rating</Card.Title>
                    <Card.Text>Give your thoughts on the book</Card.Text>
                  </Container>
                </>
              )}
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
                starHoverColor={"#f3e391"}
                starDimension={"40px"}
                starSpacing={"5px"}
              />
              <input
                type="text"
                className="form-control my-3"
                id="bookTitle"
                aria-describedby="nameHelp"
                name="title"
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="Review Title"
              />
              <textarea
                class="form-control my-3"
                id="exampleFormControlTextarea1"
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What are your thoughts on the book?"
              ></textarea>
              <Button variant="primary" onClick={handleReview}>
                Rate Book
              </Button>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Details;
