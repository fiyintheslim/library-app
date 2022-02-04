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
} from "react-bootstrap";
import { bookDetails } from "../actions/booksActions";
import MetaData from "../components/MetaData";

const Details = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { book, loading, error } = useSelector((state) => state.details);

  const [modal, setModal] = useState(false);

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
            <Col>
              <Image
                src={book && book.cover ? book.cover.url : ""}
                style={{ width: "100%" }}
              />
            </Col>
            <Col>
              <h3>{book.title}</h3>
              <div>{book.description}</div>
              <a
                target="_blank"
                href={book.link}
                className="btn btn-md btn-primary"
              >
                Read book
              </a>
              <button onClick={handleModal} className="btn btn-md btn-primary">
                Review
              </button>
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
        onClose={handleModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Details;
