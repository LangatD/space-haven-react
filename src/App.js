import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SpaceList from "./components/SpaceList";
import SpaceDetail from "./components/SpaceDetail";
import UserProfile from "./components/UserProfile";
import Membership from "./components/Membership";
import Contact from "./components/Contact";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home"; 
import SignUp from "./components/SignUp";
import Login from "./components/Login"; 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/spaces" element={<SpaceList />} />
          <Route path="/space/:id" element={<SpaceDetail />} />
          <Route path="/Profile" element={<UserProfile />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;