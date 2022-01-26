import React from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl,
  Image,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ user, auth }) => {
  return (
    <Navbar bg="primary" className="text-light-50" sticky={"top"} expand="lg">
      <Container>
        <Link to="/" className="text-decoration-none text-white-50 logo">
          <Navbar.Brand className="">BIBLI</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/books" className="text-decoration-none text-white-50">
              <Nav.Link>Books</Nav.Link>
            </Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="" id="basic-nav-dropdown">
              {auth && (
                <>
                  <NavDropdown.Item>
                    <Link to="/me">
                      <Image
                        src={user.avatar.url}
                        roundedCircle={true}
                        style={{ width: "30px", height: "30px" }}
                      />
                      Profile
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    My books
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/logout" className="text-danger">
                      Logout
                    </Link>
                  </NavDropdown.Item>
                </>
              )}
              {!auth && (
                <>
                  <NavDropdown.Item>
                    <Link to="/login">Login</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
