import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container fluid classNAme="bg-secondary py-5">
      <Container>&copy {new Date(Date.now()).getFullYear()}</Container>
    </Container>
  );
};

export default Footer;
