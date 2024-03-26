import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Header from "./header";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <div style={{ paddingTop: "200px" }}>
        <Header />
        <App />
      </div>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
