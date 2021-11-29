import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import "./App.scss";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
