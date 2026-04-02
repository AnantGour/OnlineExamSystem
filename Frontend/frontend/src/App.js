import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ExamPage from "./pages/ExamPage";
import ResultPage from "./pages/ResultPage";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";

import { UserProvider, UserData } from "./context/UserContext";


// 🔐 Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = UserData();

  return user ? children : <Navigate to="/login" />;
};


// 🔐 Admin Route (optional but useful)
const AdminRoute = ({ children }) => {
  const { user } = UserData();

  return user && user.role === "admin" ? children : <Navigate to="/dashboard" />;
};


function App() {
  return (
    <UserProvider>
      <BrowserRouter>

        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/exam/:id"
            element={
              <ProtectedRoute>
                <ExamPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <ResultPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin Route */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>

      </BrowserRouter>
    </UserProvider>
  );
}

export default App;