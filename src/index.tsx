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
import { PATH_AUTH, PATH_DASHBOARD } from "./routes/paths.ts";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={PATH_DASHBOARD.root} />} />
        <Route path={PATH_AUTH.login} element={<LoginPage />} />
        <Route path={PATH_AUTH.register} element={<RegisterPage />} />
        <Route
          path={PATH_DASHBOARD.root}
          element={
            <AuthComponent>
              <DashboardPage />
            </AuthComponent>
          }
        />
        <Route
          path="/dashboard/users/:userId/edit"
          element={
            <AuthComponent>
              <CreateEditUserPage />
            </AuthComponent>
          }
        />
        <Route
          path={PATH_DASHBOARD.users.create}
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
