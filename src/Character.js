import React, { Component } from 'react';

class Character extends Component {

  render() {
    console.log(this.props)
    return (
      <div>
        <p className="gamestory-intro">
          Feuille de personnage
        </p>
        <label htmlFor="name">Nom du personnage :</label>
        <input id="name" type="text" value={this.props.name} onChange={this.props.handleChange.bind(this)} placeholder="John Doe"/>
        <button onClick={this.props.createCharacter.bind(this)}>Créer votre personnage</button>
        <p>Force : {this.props.strenght}</p>
        <p>Santé : {this.props.health}</p>
        {this.props.getPlayButton()}
      </div>
    )
  }
}

export default Character;
