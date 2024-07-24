import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Services from './pages/Services';
import ForecastSales from './pages/ForecastSales';
import './App.css';

const App = () => {
  const [isNavVisible, setNavVisible] = useState(false);

  const toggleNav = () => {
    setNavVisible(!isNavVisible);
  };

  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="navbar-left">
            <img src="/logo1.jpg" alt="Company Logo" className="logo" />
            <h1 className="company-name">Demand Cast</h1>
          </div>
          <div className="hamburger" onClick={toggleNav}>
            &#9776;
          </div>
          <div className={`navbar-links ${isNavVisible ? 'show' : ''}`}>
            <Link to="/" onClick={toggleNav}>Home</Link>
            <Link to="/forecast-sales" onClick={toggleNav}>Forecast Sales</Link>
            <Link to="/services" onClick={toggleNav}>Visualize</Link>
            <Link to="/contact" onClick={toggleNav}>Contact Us</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/services" element={<Services />} /> 
          <Route path="/forecast-sales" element={<ForecastSales />} />
        </Routes>
        <footer className="footer">
          <p>&copy; 2024 Demand Cast. All Rights Reserved ™</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;