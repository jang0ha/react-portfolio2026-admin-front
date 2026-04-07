import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { authStorage } from "./services/storage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/projects/DashboardPage";
import DesignSystemPage from "./pages/DesignSystemPage";
import RegistrationPage from "./pages/projects/RegistrationPage";
import ListPage from "./pages/projects/ListPage";
import Layout from "./components/Layout";

// 보호된 라우트
function ProtectedRoute({ children }) {
  const isAuthenticated = authStorage.isAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// 루트 라우트 - 인증 상태에 따라 리다이렉트
function RootRedirect() {
  const isAuthenticated = authStorage.isAuthenticated();
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<RootRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects/register" element={<RegistrationPage />} />
          <Route path="/projects/list" element={<ListPage />} />
          <Route path="/design-system" element={<DesignSystemPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
