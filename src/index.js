import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import {ToastContextProvider} from "./Context/ToastContext.tsx";
import {ToastContainer} from "react-toastify";
import {injectStyle} from "react-toastify/dist/inject-style";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
const container = document.getElementById("root");
const root = createRoot(container);

injectStyle();

const client = new ApolloClient({
  uri: "http://localhost:5199/api/graphql",
  cache: new InMemoryCache(),
});

root.render(
  <BrowserRouter>
    <React.StrictMode>
        <ToastContainer/>
          <ApolloProvider client={client}>
          <App />
          </ApolloProvider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
