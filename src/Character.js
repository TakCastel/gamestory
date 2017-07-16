import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dice from './img/dice.svg'
import checkbox from './img/checkbox.svg'

class Character extends Component {

  constructor(props) {
    super(props);
    this.state = {
      elementVisible: false,
      isClicked: false,
    };
  }

  getStatsGenerator() {
    if (this.state.elementVisible) {
      return (
        <div>
          <div className="btn-group">
            <button className="btn btn-primary btn-icon" onClick={() => this.props.createCharacter()}>
              <img src={dice} alt=""/> Générer
            </button>
          </div>
          <p>Force : {this.props.strenght}</p>
          <p>Santé : {this.props.health}</p>
        </div>
      )
    }
    return null
  }

  getWarning() {
    if (!this.state.elementVisible && this.state.isClicked) {
      return (
        <p>Vous devez renseigner un nom !</p>
      )
    }
  }

  showGenerator() {
    if (this.props.name !== '') {
      this.setState({elementVisible: true})
    }
    this.setState({isClicked: true})
  }

  getPlayButton() {
    if (this.props.characterCreated) {
      return (
        <div>
          <Link className="btn btn-primary" role="button" to={process.env.PUBLIC_URL + '/game'}>Jouer</Link>
        </div>
      )
    }
    return null
  }

  render() {

    return (
      <div>
        <h2 className="title">Feuille de personnage</h2>
        <label htmlFor="name">Nom du personnage :
          <input className="input-group" id="name" type="text" value={this.props.name} onChange={(event) => this.props.handleChange(event)} placeholder="John Doe"/>
            <button className="btn btn-input btn-icon" onClick={() => this.showGenerator()}>
              <img src={checkbox} alt=""/>
            </button>
        </label>
        {this.getStatsGenerator()}
        {this.getWarning()}
        {this.getPlayButton()}
      </div>
    )
  }
}

export default Character;
