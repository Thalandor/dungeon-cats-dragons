import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { Web3Provider } from "./providers/Web3.tsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3Provider>
        <App />
        <ToastContainer />
      </Web3Provider>
    </BrowserRouter>
  </React.StrictMode>
);
