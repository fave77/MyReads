import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import Footer from './Footer';
import '../css/App.css';

const App = () => (
  <div className="app">
    <Route exact path="/" component={MainPage} />
    <Route exact path="/search" component={SearchPage} />
    <Footer />
  </div>
);

export default App;