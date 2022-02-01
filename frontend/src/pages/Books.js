import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import ReactPaginate from "react-paginate";
import { searchBook } from "../actions/booksActions";

const Books = () => {
  const { loading, error, books } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  useEffect(() => {
    let data = { page: 1 };

    searchBook(dispatch, data);
  }, []);

  const handlePagination = (e) => {
    let data = { page: e.selected + 1 };
    //setPage(e.selected);
    console.log("page", e.selected, page);
  };
  const handlePaginationClick = (e) => {
    const selected = e.nextSelectedPage;
    let data = { page: selected + 1 };
    //setPage(selected);
    console.log("Click", selected);
    searchBook(dispatch, data);
  };

  return (
    <>
      <Container>
        {books ? (
          <>
            <h1 className="fs-3">Books</h1>
            <Container>
              <Row>
                <Col lg={2} className="bg-warning">
                  <h2>filters</h2>
                </Col>
                <Col lg={10} className="bg-danger">
                  <h2>books</h2>
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
            nextLabel="next"
            onClick={handlePaginationClick}
            pageRangeDisplayed={5}
            pageCount={books.pages}
            previosLabel="prev"
            className="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            nextClassName="page-link"
            previousClassName="page-link"
            activeLinkClassName="active"
            activeClassName="active"
            initialPage={0}
          />
        ) : null}
      </Container>
    </>
  );
};

export default Books;
