import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserProvider from "./global/UserContext";
// import Navbar from './components/NavbarT';
import ForgotPassword from './pages/ForgotPassword';
import Messages from './pages/Messages';
import RequireAuth from './utils/RequireAuth';
import Verify from './pages/Verify';
import Sell from './pages/Sell';
// import NavigationDrawer from "./components/Drawer";
import Navbar from "./components/Navbar";

import "./App.scss";

const App = () => {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/messages/*" element={<RequireAuth Level={2} Element={Messages} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sell" element={<RequireAuth Level={2} Element={Sell} />} />
        <Route path="/sell/:id" element={<RequireAuth Level={2} Element={Sell} />} />
        <Route path="/profile/*" element={<RequireAuth Level={2} Element={Profile} />} />
        <Route path="/verify" element={<RequireAuth Level={1} Element={Verify} />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
