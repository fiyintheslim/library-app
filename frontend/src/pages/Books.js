import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { searchBook } from "../actions/booksActions";

const Books = () => {
  const { loading, error, books } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  useEffect(() => {
    console.log(page);
    // let data = { page: 1 };
    console.log("Page effect", page);
    searchBook(dispatch, page, "");
  }, []);

  const handlePaginationClick = (e) => {
    const selected = e.nextSelectedPage;
    let data = { page: selected + 1 };

    console.log("Click", selected);
    console.log(selected);
    //searchBook(dispatch, data);
    setPage(selected);
    // console.log(page);
    searchBook(dispatch, selected + 1, "");
  };
  console.log("again");

  return (
    <>
      <Container className="">
        {books ? (
          <>
            <h1 className="fs-3">Books</h1>
            <Container>
              <Row>
                <Col lg={2} className="">
                  <h2>filters</h2>
                </Col>
                <Col lg={10} className="">
                  <Container fluid>
                    <Row>
                      {books.books.map((book) => {
                        return (
                          <Col>
                            <Card style={{ width: "15rem" }}>
                              <Card.Img
                                variant="top"
                                src="holder.js/100px180"
                              />
                              <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                                <Card.Text>
                                  Some quick example text to build on the card
                                  title and make up the bulk of the card's
                                  content.
                                </Card.Text>
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
                  </Container>
                </Col>
              </Row>
            </Container>
          </>
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {books && books.pages > 1 ? (
          <ReactPaginate
            currentPage={page}
            nextLabel="next"
            onClick={(e) => {
              handlePaginationClick(e);
            }}
            pageRangeDisplayed={5}
            pageCount={books.pages}
            previousLabel="prev"
            className="pagination d-flex my-2 justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            nextClassName="page-link"
            previousClassName="page-link"
            activeLinkClassName="active"
            activeClassName="active"
            initialPage={page}
          />
        ) : null}
      </Container>
    </>
  );
};

export default Books;
