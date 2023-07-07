import ReactDOM from "react-dom/client";
import App from "./App";

import "react-toastify/dist/ReactToastify.css";

import theme from "./theme";

import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
