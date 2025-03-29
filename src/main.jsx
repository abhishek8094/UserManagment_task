import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Navbar />
      <App />
      <Footer />
    </Provider>
  </StrictMode>
);
