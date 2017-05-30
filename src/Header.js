import React, { Component } from 'react';
import logo from './logo.svg';

class Header extends Component {
  render() {
    return (
      <div className="Gamestory-header">
        <img src={logo} className="Gamestory-logo" alt="logo" />
        <h2>Character</h2>
      </div>
    );
  }
}

export default Header;
