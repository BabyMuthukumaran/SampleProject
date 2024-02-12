import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Services from './components/Services';
import Gallery from './components/Gallery';
import ContactUs from './components/ContactUs';
import './App.css';
import CarLogo from './components/CarLogo';
import FilterCar from './components/FilterCar';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
          <li>
              <Link to="/logo">Logo</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to='/filtercar'>Filters</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </nav>

        <Routes>
        <Route path="/logo" element={<CarLogo/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path="/gallery" element={<Gallery/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="/" element={<Home/>} />
          <Route path='filtercar' element={<FilterCar />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
