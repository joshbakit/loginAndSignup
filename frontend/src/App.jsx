import React, { useEffect } from "react";
import FloatingShape from "./components/FloatingShape";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPages from "./pages/DashboardPages";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const RedirecAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replaces />;
  }
  return children;
};

const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2c6e49] via-[#4c956c] to-[#bce784] flex items-center justify-center relative overflow-hidden">
      <FloatingShape
        color="bg-white"
        size="w-40 h-40"
        top="-5%"
        left="5%"
        delay={0}
      />
      <FloatingShape
        color="bg-white"
        size="w-32 h-32"
        top="10%"
        left="80%"
        delay={3}
      />
      <FloatingShape
        color="bg-white"
        size="w-24 h-24"
        top="60%"
        left="60%"
        delay={1}
      />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirecAuthenticatedUser>
              <SignupPage />
            </RedirecAuthenticatedUser>
          }
        />

        <Route
          path="/login"
          element={
            <RedirecAuthenticatedUser>
              <LoginPage />
            </RedirecAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/forgot-password"
          element={
            <RedirecAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirecAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirecAuthenticatedUser>
              <ResetPasswordPage />
            </RedirecAuthenticatedUser>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
