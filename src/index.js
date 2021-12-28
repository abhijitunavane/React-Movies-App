import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free-brands";
import "@fortawesome/fontawesome-free-solid";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
