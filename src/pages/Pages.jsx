import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer'; // Import Footer component
import Home from './Home';
import Cuisine from './Cuisine';
import Category from '../components/Category';
import Search from '../components/Search';
import Searched from './Searched';
import Recipe from './Recipe';

const Pages = () => {
  return (
    <Router>
      <Header />
      <div className="pages-container">
        <Routes>
          <Route path="/" element={<React.Fragment><Search /><Category /><Home /></React.Fragment>} />
          <Route path="/cuisine/:type" element={<React.Fragment><Search /><Category /><Cuisine /></React.Fragment>} />
          <Route path="/searched/:search" element={<React.Fragment><Search /><Category /><Searched /></React.Fragment>} />
          <Route path="/searched/:search/recipe/:name" element={<Recipe />} />
          <Route path="/cuisine/:type/recipe/:name" element={<Recipe />} />
          <Route path="/recipe/:name" element={<Recipe />} />
        </Routes>
      </div>
      <Footer /> 
    </Router>
  );
}

export default Pages;
