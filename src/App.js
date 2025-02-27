import React from 'react';
import './App.css';
import Home from "./Home";
import Dice from "./Dice";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dice" element={<Dice />} />
        </Routes>
      </Router>
    
  );
}

export default App;
