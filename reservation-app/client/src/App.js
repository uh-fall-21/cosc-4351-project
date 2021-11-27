import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Home from './components/home';
import Account from './components/account';
import Login from './components/login';


function App() {
  return (
    <Router>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/account"> Account </Link>
        <Link to="/login"> Login/Register </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/:username" element={<Account />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <div> Footer </div>
    </Router>
  );
}

export default App;