import React from "react";
// import ReactDOM from 'react-dom'; //구버전
import { createRoot } from "react-dom/client";
import App from "./App";
import { SWRConfig } from "swr";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <SWRConfig>
    <App />
  </SWRConfig>
);
