import "./App.css";
import { useEffect } from "react";
import { Provider, positions, transitions } from "react-alert";
import Template from "react-alert-template-basic";
import { useSelector, useDispatch } from "react-redux";
import { Spinner, Container } from "react-bootstrap";
import { useAlert } from "react-alert";
import { loadUser } from "./actions/userActions";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App({ children }) {
  const dispatch = useDispatch();
  //const alert = useAlert();
  const { loading, isAuthenticated, user, error } = useSelector(
    (state) => state.auth
  );
  const options = {
    position: positions.BOTTOM_CENTER,
    transition: transitions.FADE,
    timeout: 3000,
    offset: "30px",
  };
  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    // }
    loadUser(dispatch);
  }, []);
  return (
    <>
      <Provider template={Template} {...options}>
        <Header user={user} auth={isAuthenticated} />
        {loading ? (
          <Container>
            <Spinner animation="border" variant="primary" />
          </Container>
        ) : (
          children
        )}
        <Footer />
      </Provider>
    </>
  );
}

export default App;
