import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import InputData from './pages/InputData';
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
            <h1 className="company-name">Warehouse Vision</h1>
          </div>
          <div className="hamburger" onClick={toggleNav}>
            &#9776;
          </div>
          <div className={`navbar-links ${isNavVisible ? 'show' : ''}`}>
            <Link to="/" onClick={toggleNav}>Home</Link>
            <Link to="/about" onClick={toggleNav}>About</Link>
            <Link to="/contact" onClick={toggleNav}>Contact</Link>
            <Link to="/services" onClick={toggleNav}>Services</Link>
            <Link to="/input-data" onClick={toggleNav}>Input Data</Link> 
            <Link to="/forecast-sales" onClick={toggleNav}>Forecast Sales</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/input-data" element={<InputData />} /> 
          <Route path="/forecast-sales" element={<ForecastSales />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
