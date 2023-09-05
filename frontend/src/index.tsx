import ReactDOM from "react-dom/client";
import App from "./app/App";
import { BrowserRouter } from 'react-router-dom'
import "./global.css";
import { ConfigProvider } from "antd";
import React from "react";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#6a6ad5",
          },
        }}
      >
        <App />
      </ConfigProvider>
  </BrowserRouter>
);
