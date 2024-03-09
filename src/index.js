import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CombinedContextProvider } from "./contextApi/CombinedContextProvider ";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CombinedContextProvider>
    <App />
  </CombinedContextProvider>
);
