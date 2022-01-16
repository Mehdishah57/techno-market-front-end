import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserProvider from "./global/UserContext";
import Navbar from './components/Navbar';
import jwtDecode from 'jwt-decode';
import ForgotPassword from './pages/ForgotPassword';

import "./App.scss";

const App = () => {
  const [state, setState] = useState({});

  useEffect(()=>{
    if(state && state.user) return;
    const token = localStorage.getItem("fyptoken");
    if(!token) return;
    const user = jwtDecode(token);
    setState({ user });
  },[state])

  return (
    <UserProvider value={{state, setState}}>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
