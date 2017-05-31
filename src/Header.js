import React, { Component } from 'react';
import logo from './logo.svg';

class Header extends Component {
  render() {
    return (
      <div className="gamestory-header">
        <img src={logo} className="gamestory-logo" alt="logo" />
        <h2>Le site dont vous êtes le héros</h2>
      </div>
    );
  }
}

export default Header;
