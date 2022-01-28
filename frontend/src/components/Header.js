import React, { useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";

const Header = ({ user, auth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const { user } = useSelector((state) => state.auth);
  //useEffect(() => {}, [user]);
  const logoutHandler = async (e) => {
    logout(dispatch);
    navigate("/");
  };
  return (
    <Navbar
      bg="primary"
      className="text-light-50 shadow"
      sticky={"top"}
      expand="lg"
    >
      <Container>
        <Link to="/" className="text-decoration-none text-white-50 logo">
          <Navbar.Brand className="">BIBLI</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/books" className="text-decoration-none nav-link">
              Books
            </Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="" id="basic-nav-dropdown">
              {user && (
                <>
                  <NavDropdown.Item>
                    <Link to="/me" className="text-decoration-none">
                      <Image
                        src={user.avatar.url}
                        roundedCircle={true}
                        style={{ width: "30px", height: "30px" }}
                        className="me-10"
                      />
                      Profile
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/add" className="text-decoration-none">
                      Add Book
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>My books</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className="text-danger"
                    onClick={logoutHandler}
                  >
                    Logout
                  </NavDropdown.Item>
                </>
              )}
              {!user && (
                <>
                  <NavDropdown.Item>
                    <Link to="/login">Login</Link>
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
