import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Character extends Component {

  getPlayButton() {
    if (this.props.characterCreated) {
      return (<Link className="btn btn-primary" role="button" to="/game">Jouer</Link>)
    }
    return null
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <p className="gamestory-intro">
          Feuille de personnage
        </p>
        <label htmlFor="name">Nom du personnage :</label>
        <input id="name" type="text" value={this.props.name} onChange={this.props.handleChange.bind(this)} placeholder="John Doe"/>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={this.props.createCharacter.bind(this)}>Créer votre personnage</button>
        </div>
        <p>Force : {this.props.strenght}</p>
        <p>Santé : {this.props.health}</p>
        {this.getPlayButton()}
      </div>
    )
  }
}

export default Character;
