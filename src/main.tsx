import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./firebase.ts";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persister, store } from "./store/index.ts";
import { PersistGate } from "redux-persist/integration/react";
import { CircularProgress } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={<CircularProgress />} persistor={persister}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
