import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Image } from "react-bootstrap";

const Details = () => {
  const params = useParams();
  return (
    <>
      <Container>
        <Row></Row>
        <Image />
      </Container>
    </>
  );
};

export default Details;
