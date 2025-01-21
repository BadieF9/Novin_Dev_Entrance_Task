import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import AuthComponent from "./components/AuthComponent.tsx";
import CreateEditUserPage from "./pages/CreateEditUserPage.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <AuthComponent>
              <DashboardPage />
            </AuthComponent>
          }
        />
        <Route
          path="/users/:userId/edit"
          element={
            <AuthComponent>
              <CreateEditUserPage />
            </AuthComponent>
          }
        />
        <Route
          path="/users/create"
          element={
            <AuthComponent>
              <CreateEditUserPage />
            </AuthComponent>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
