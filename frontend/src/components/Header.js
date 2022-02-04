import React, { useEffect, useState } from "react";
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
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { logout } from "../actions/userActions";
import {} from "../actions/booksActions";

const Header = ({ user, auth }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchparams, setSearchParams] = useSearchParams();
  //const { user } = useSelector((state) => state.auth);
  //useEffect(() => {}, [user]);
  const [search, setSearch] = useState("");
  //regex fror book path
  const reg = /book/i;

  const logoutHandler = async (e) => {
    logout(dispatch);
    navigate("/");
  };
  useEffect(() => {
    setSearchParams({});
    if (reg.test(location.pathname) && search) {
      setSearchParams({ search });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    //e.preventDefault();
    if (!reg.test(location.pathname)) {
      navigate("/books");
    } else {
      setSearchParams({ search });
    }
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
          <form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-success" onClick={handleSubmit}>
              Search
            </Button>
          </form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
