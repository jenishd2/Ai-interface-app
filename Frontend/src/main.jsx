import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import Protected from "./components/AuthLayout.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Register from "./components/Register.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected authentication={true}>
        <App />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: (
      <Protected authentication={false}>
        <Login />
      </Protected>
    ),
  },
  {
    path: "/signup",
    element: (
      <Protected authentication={false}>
        <Register />
      </Protected>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
