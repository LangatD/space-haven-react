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
import AnimatedPage from "./components/AnimatedPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/spaces" element={<AnimatedPage><SpaceList /></AnimatedPage>} />
          <Route path="/space/:id" element={<AnimatedPage><SpaceDetail /></AnimatedPage>} />
          <Route path="/Profile" element={<AnimatedPage><UserProfile /></AnimatedPage>} />
          <Route path="/membership" element={<AnimatedPage><Membership /></AnimatedPage>} />
          <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
          <Route path="/signup" element={<AnimatedPage><SignUp /></AnimatedPage>} />
          <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;