import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container fluid className="bg-secondary py-5">
      <Container className="d-flex justify-content-center">
        <span dangerouslySetInnerHTML={{ __html: "&copy;" }} />
        {new Date(Date.now()).getFullYear()}
      </Container>
    </Container>
  );
};

export default Footer;
