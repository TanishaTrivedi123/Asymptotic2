import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React, { useState } from "react";
import Home from "./pages/HomePage";
import Chatbot from "./pages/Chatbot";
import IDE from "./pages/IDE";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import PracticeQuestionsList from "./components/ide/PracticeQuestionsList";
import DetailQuestion from "./components/ide/DetailQuestion";
import LandingPage from "./pages/LandingPage";
import Submitted from "./components/ide/Submitted";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/submitted" element={<Submitted />} />

        <Route
          path="/ide/practice/:topic"
          element={<PracticeQuestionsList />}
        />

        <Route path="/ide/practice/:topic/:id" element={<DetailQuestion />} />

        <Route path="*" element={<NotFound />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat-bot"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ide"
          element={
            <ProtectedRoute>
              <IDE />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* Toast Container, globally available */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </BrowserRouter>
  );
};

export default App;
