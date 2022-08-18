import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import store from "./store/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <BrowserRouter basename="/vrs">
    {/* <BrowserRouter> */}
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
