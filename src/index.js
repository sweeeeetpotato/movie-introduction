import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SWRConfig } from "swr";
import axios from "axios";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <SWRConfig
    value={{
      fetcher: async (API_URL) =>
        await axios.get(API_URL).then((res) => res.data),
    }}
  >
    <App />
  </SWRConfig>
);
