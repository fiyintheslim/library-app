import "./App.css";
import { Provider, positions, transitions } from "react-alert";
import Template from "react-alert-template-basic";
import Header from "./components/Header";

function App({ children }) {
  const options = {
    position: positions.BOTTOM_CENTER,
    transition: transitions.FADE,
    timeout: 3000,
    offset: "30px",
  };
  return (
    <>
      <Provider template={Template} {...options}>
        <Header />
        {children}
      </Provider>
    </>
  );
}

export default App;
