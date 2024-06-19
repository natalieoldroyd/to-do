import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ParentComponent from "./components/Parent";

import "./index.css";
import App from "./App";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <ParentComponent />
    </BrowserRouter>
  </React.StrictMode>
);
