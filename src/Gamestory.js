import React, { Component } from 'react';
import {  BrowserRouter as Router,  Route,  Link } from 'react-router-dom';
import Character from './Character.js';
import Header from './Header.js';
import './Gamestory.css';

class Gamestory extends Component {
  render() {
    return (
      <Router>
        <div className="Gamestory">
          <Header/>
          <Route exact path="/" component={Home}/>
          <Route path="/character" component={Character}/>
        </div>
      </Router>
    );
  }
}

const Home = () => (
  <div>
    <p className="Gamestory-intro">
      Le site dont <strong>vous</strong> êtes le héros.
    </p>
    <Link to="/character">Commencer l'aventure</Link>
  </div>
)

export default Gamestory;
