import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserProvider from "./global/UserContext";
import Navbar from './components/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import ProductProvider from "./global/ProductContext";
import refreshUser from './services/refreshUser';
import Messages from './pages/Messages';

import "./App.scss";

const App = () => {
  const [user, setUser] = useState({});
  const [product, setProduct] = useState({});

  const fetchUser = useRef();
  fetchUser.current = async () => {
    if (user && user._id) return;
    const token = localStorage.getItem("fyptoken");
    if (!token) return;
    const [data, error] = await refreshUser(token);
    if(!error) setUser({ ...data });
  }

  useEffect(() => {
    fetchUser.current();
  }, [])

  return (
    <UserProvider value={{ user, setUser }}>
      <Navbar />
      <ProductProvider value={{product, setProduct}}>
        <Routes>
          <Route path="/messages" element={<Messages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
