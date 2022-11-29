import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { baseUrl as quizBaseUrl } from "./api/QuizAPI";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
const container = document.getElementById("root");
const root = createRoot(container!);

injectStyle();

const client = new ApolloClient({
  uri: quizBaseUrl,
  cache: new InMemoryCache(),
});

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ToastContainer />
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
