import "./App.css";
import { useEffect } from "react";
import { Provider, positions, transitions } from "react-alert";
import Template from "react-alert-template-basic";
import { useSelector } from "react-redux";
import { Spinner, Container } from "react-bootstrap";

import Header from "./components/Header";

function App({ children }) {
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);
  const options = {
    position: positions.BOTTOM_CENTER,
    transition: transitions.FADE,
    timeout: 3000,
    offset: "30px",
  };
  useEffect(() => {}, []);
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
      </Provider>
    </>
  );
}

export default App;
