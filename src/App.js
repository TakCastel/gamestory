import React, { Component } from 'react'
import { BrowserRouter as Router,  Route,  Link } from 'react-router-dom'
import { getRandomDice } from './Services.js'
import Character from './Character.js'
import Game from './Game.js'
import Header from './Header.js'
import './App.css'

const Home = () => (
  <div>
    <p className="gamestory-intro">
      Le site dont <strong>vous</strong> êtes le héros.
    </p>
    <Link to="/character">Commencer l'aventure</Link>
  </div>
)

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      strenght: 0,
      health: 0,
      position: 2,
    };
  }

  componentDidMount() {
    const name = localStorage.getItem("name")
    const strenght = localStorage.getItem("strenght")
    const health = localStorage.getItem("health")
    const position = localStorage.getItem("position")

    if (name !== null) {
      this.setState({name})
    }
    if (strenght !== null) {
      this.setState({strenght})
    }
    if (health !== null) {
      this.setState({health})
    }
    if (position !== null) {
      this.setState({position})
    }
  }

  handleChange(event) {
    this.setState({name: event.target.value})
  }

  createCharacter() {
    const strenght = getRandomDice(7,12)
    const health = getRandomDice(14,24)

    this.setState({strenght: strenght})
    localStorage.setItem("strenght", strenght)

    this.setState({health: health})
    localStorage.setItem("health", health)

    this.setState({position: 2})

    localStorage.setItem("name", this.state.name)
    localStorage.removeItem("position")
  }

  getPlayButton() {
    if (this.state.strenght !== 0 && this.state.health !== 0) {
      return (<Link role="button" to="/game">Jouer</Link>)
    }
    return null
  }

  changePosition(id) {
    this.setState({position: id})
    localStorage.setItem("position", id)
  }

  render() {

    return (
      <Router>
        <div className="gamestory">
          <Header/>
          <Route exact path="/" component={Home}/>
          <Route path="/character" render={() => (
            <Character
              handleChange={this.handleChange.bind(this)}
              createCharacter={this.createCharacter.bind(this)}
              getPlayButton={this.getPlayButton.bind(this)}
              name={this.state.name}
              strenght={this.state.strenght}
              health={this.state.health}/>
          )} />
          <Route path="/game" render={() => (
            <Game
              changePosition={this.changePosition.bind(this)}
              name={this.state.name}
              strenght={this.state.strenght}
              health={this.state.health}
              position={this.state.position}/>
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
