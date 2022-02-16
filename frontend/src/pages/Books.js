import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useMatch, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { searchBook } from "../actions/booksActions";
import MetaData from "../components/MetaData";

const Books = () => {
  const { loading, error, books } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const alert = useAlert();
  //const match = useMatch();
  const location = useLocation();

  const [page, setPage] = useState(0);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    searchBook(dispatch, page, location.search.replace("?", ""), genre);
  }, [location, genre, page]);

  const handlePaginationClick = (e) => {
    setPage(e.nextSelectedPage);
  };

  const handleInput = (e) => {
    const genres = [];
    const genre = document.getElementsByName("genre");
    Array.from(genre).forEach((g) => {
      if (g.checked) {
        genres.push(g.value);
      }
    });
    setPage(0);
    setGenre(genres);
  };

  const genres = [
    "action",
    "romance",
    "mystery",
    "fiction",
    "horror",
    "sci-fi",
    "thriller",
    "shorts",
    "biography",
    "history",
    "cookbook",
    "poetry",
    "self-help",
    "educational",
    "finance",
  ];

  return (
    <>
      <MetaData title={"Books"} />
      <Container className="my-3">
        {!loading && books ? (
          <>
            <h1 className="fs-3">Books</h1>
            <Container fluid className="p-0 m-0">
              <Row>
                <Col lg={2} className="">
                  <h2 className="fs-5">Filter</h2>
                  <Container
                    className="mb-2"
                    fluid
                    style={{ padding: "0px", margin: "0px" }}
                  >
                    <Row>
                      {genres.map((g, i) => (
                        <Col className="col-3 col-lg-12" key={i}>
                          <div class="form-check col-sm-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={g}
                              name="genre"
                              value={g}
                              checked={genre.includes(g) ? true : false}
                              onChange={handleInput}
                            />
                            <label
                              className="form-check-label text-capitalize"
                              style={{ fontSize: "10px" }}
                              htmlFor={g}
                            >
                              {g}
                            </label>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Container>
                </Col>
                <Col lg={10} className="p-0 m-0">
                  {books.books.length > 0 ? (
                    <Container fluid className="p-0 m-0">
                      <Row className="g-2 row-cols-4 p-0 m-0">
                        {books.books.map((book) => {
                          return (
                            <Col
                              className="d-flex justify-content-center col-12 col-lg-3"
                              key={book._id}
                            >
                              <Card
                                className="shadow"
                                style={{ height: "350px", width: "100%" }}
                              >
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
                  ) : (
                    <Container>
                      <p className="fs-4">
                        Books aren't available at the moment.
                      </p>
                    </Container>
                  )}
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
            disabledLinkClassName="disabled"
            disabledClassName="disabled"
          />
        ) : null}
      </Container>
    </>
  );
};

export default Books;
