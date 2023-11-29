import ReactDOM from "react-dom/client";
import { App } from "@/components/app/App";
import "@/styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { spy } from "mobx";
import { StrictMode } from "react";

if (process.env.NODE_ENV === "development") {
  spy((e) => {
    e.type === "action" && e.name !== "<unnamed action>" && console.log(e);
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
