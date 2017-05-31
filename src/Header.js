import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from './logo.svg';
import restart from './img/restart.svg';
import checkbox from './img/checkbox.svg';
import remove from './img/remove.svg';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  getRestartButton() {
    if (this.props.characterCreated) {
      return (
        <button className="btn btn-secondary btn-icon" alt="logo-redo" onClick={() => this.toggleModal()}>
          <img src={restart} alt="" /> Recommencer
        </button>
      )
    }
    return null
  }

  getModal() {
    if (this.state.modalVisible) {
      return (
        <div className="modal-alert">
          <p>Êtes-vous sûr de vouloir recommencer ? Votre progression ne sera pas sauvegardée.</p>
          <Link to="/character" className="btn btn-alert btn-icon" onClick={() => this.resetCharacter()}>
            <img src={checkbox} alt=""/> Oui
          </Link>
          <button className="btn btn-alert btn-icon" onClick={() => this.toggleModal()}>
            <img src={remove} alt=""/> Non
          </button>
        </div>
      )
    }
    return null
  }

  toggleModal() {
    this.setState({modalVisible: this.state.modalVisible ? false : true})
  }

  resetCharacter() {
    this.props.resetCharacter()
    this.toggleModal()
  }

  render() {
    return (
      <div>
        <div className="gamestory-header">
          <div className="gamestory-brand">
            <img src={logo} className="gamestory-logo" alt="logo" />
            <h2>Le site dont vous êtes le héros</h2>
          </div>
          {this.getRestartButton()}
        </div>
        {this.getModal()}
      </div>
    );
  }
}

export default Header;
