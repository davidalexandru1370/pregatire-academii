import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { quizController as quizBaseUrl } from "./api/Constants";
import App from "./App";
import { AuthentificationContextProvider } from "./Context/AuthentificationContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
const container = document.getElementById("root");
const root = createRoot(container!);

injectStyle();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: quizBaseUrl,
  cache: new InMemoryCache(),
});

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ToastContainer />
      <AuthentificationContextProvider>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </AuthentificationContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
