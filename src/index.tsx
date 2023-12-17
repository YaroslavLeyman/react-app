import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { ErrorModalProvider } from "./context/ErrorModalContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ErrorModalProvider>
      <App />
    </ErrorModalProvider>
  </Provider>
);
