import React, { useEffect } from "react";
import { Card, Col, Container, Spinner, Row, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { myBooks } from "../actions/booksActions";

const MyBooks = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, books } = useSelector((state) => state.books);

  useEffect(() => {
    myBooks(dispatch);
  }, []);
  return (
    <Container fluid className="p-0 m-0">
      {!loading && books ? (
        <Row className="g-2 row-cols-4 p-0 m-0">
          {books.map((book) => {
            return (
              <Col className="d-flex justify-content-center col-12 col-lg-3">
                <Card style={{ height: "350px" }}>
                  <Card.Img
                    variant="top"
                    src={book.cover ? book.cover.url : ""}
                    style={{ height: "50%" }}
                  />
                  <Card.Body className="d-flex flex-column align-items-center justify-content-evenly">
                    <Card.Title className="fs-5">{book.title}</Card.Title>

                    <Button className="btn-primary btn btn-md">Details</Button>
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
      {books && books.length > 0 && !loading && (
        <div>You have no books on Bibli</div>
      )}
    </Container>
  );
};

export default MyBooks;
