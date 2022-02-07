import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserProvider from "./global/UserContext";
import Navbar from './components/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import Messages from './pages/Messages';

import "./App.scss";

const App = () => {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/messages" element={<Messages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
