import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import ToastContainer from "./Components/ToastNotification/ToastContainer.tsx"
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ToastContainer/>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
