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

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchparams, setSearchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
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
  }, [navigate, user]);

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
      className="text-light-50 shadow bibli-bg"
      sticky={"top"}
      expand="lg"
    >
      <Container>
        <Link to="/" className="text-decoration-none text-white-50 logo">
          <Navbar.Brand className="">
            <img
              src="/BIBLI-logo.png"
              style={{ width: "80px", height: "75px" }}
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav text-dark">
          <Nav className="me-auto">
            <Link
              to="/books"
              className="text-white text-decoration-none nav-link"
            >
              Books
            </Link>
            {!user && (
              <>
                <Link
                  className="text-white text-decoration-none nav-link"
                  to="/login"
                >
                  Login
                </Link>
              </>
            )}
            {user && (
              <>
                <Link
                  to="/me"
                  className="text-white w-100 text-decoration-none nav-link"
                >
                  Profile
                </Link>
              </>
            )}
          </Nav>
          <form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search Title"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              variant="outline-success"
              className=""
              onClick={handleSubmit}
            >
              Search
            </Button>
          </form>
          {user && (
            <NavDropdown
              title={
                <Image
                  src={user.avatar.url}
                  roundedCircle={true}
                  style={{
                    width: "30px",
                    height: "30px",
                    marginLeft: "10px",
                  }}
                  className="border"
                />
              }
              id="basic-nav-dropdown"
              style={{ outlineStyle: "none" }}
              className="px-0 px-lg-2"
            >
              <>
                <NavDropdown.Item>
                  <Link
                    to="/books/mine"
                    className="text-dark d-block text-decoration-none"
                  >
                    My books
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link
                    to="/add"
                    className="text-dark d-block text-decoration-none"
                  >
                    Add Book
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  className="text-danger d-block"
                  onClick={logoutHandler}
                >
                  Logout
                </NavDropdown.Item>
              </>
            </NavDropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
