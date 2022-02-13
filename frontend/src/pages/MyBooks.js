import React, { useEffect } from "react";
import { Card, Col, Container, Spinner, Row, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { myBooks, deleteBook } from "../actions/booksActions";
import MetaData from "../components/MetaData";

const MyBooks = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, books, message, error } = useSelector(
    (state) => state.myBooks
  );

  const deleteBookHandler = (e, id) => {
    deleteBook(dispatch, id);
  };

  useEffect(() => {
    if (message) {
      alert.success(message);
    }
    if (error) {
      alert.error(error);
    }
    if (!books || message) {
      myBooks(dispatch);
    }
  }, [message, error]);
  return (
    <>
      <MetaData title={"My Books"} />
      <Container className="p-0 m-0">
        {!loading && books ? (
          <Row className="g-2 row-cols-5 p-0 my-2 mx-1">
            {books.map((book) => {
              return (
                <Col className="d-flex justify-content-center col-12 col-lg-3">
                  <Card style={{ height: "350px", width: "100%" }}>
                    <Card.Img
                      variant="top"
                      src={book.cover ? book.cover.url : ""}
                      style={{ height: "72%" }}
                    />
                    <Card.Body className="d-flex flex-column align-items-center justify-content-evenly">
                      <Card.Title
                        className="fs-5 my-card-title"
                        title={book.title}
                      >
                        {book.title}
                      </Card.Title>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          width: "75%",
                        }}
                      >
                        <Link
                          to={`/details/${book._id}`}
                          className="btn-primary btn btn-md"
                        >
                          Details
                        </Link>
                        <Button
                          onClick={(e) => {
                            deleteBookHandler(e, book._id);
                          }}
                          className="btn-danger btn btn-md"
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {books && books.length <= 0 && !loading && (
          <div>
            <p
              className="fs-2"
              style={{ margin: "50px auto", width: "fit-content" }}
            >
              You have no books on Bibli at the moment
            </p>
          </div>
        )}
      </Container>
    </>
  );
};

export default MyBooks;
