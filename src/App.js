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
    <Link className="btn btn-primary" to={process.env.PUBLIC_URL + '/character'}>Commencer l'aventure</Link>
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
    const strenght = parseInt(localStorage.getItem("strenght"), 10)
    const health = parseInt(localStorage.getItem("health"), 10)
    const position = parseInt(localStorage.getItem("position"), 10)

    if (name !== null) {
      this.setState({name})
    }
    if (!isNaN(strenght)) {
      this.setState({strenght})
    }
    if (!isNaN(health)) {
      this.setState({health})
    }
    if (!isNaN(position)) {
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

  changePosition(id) {
    this.setState({position: id})
    localStorage.setItem("position", id)
  }

  resetCharacter() {
    this.setState({name: ''})
    this.setState({strenght: 0})
    this.setState({health: 0})
    this.setState({position: 2})

    localStorage.setItem("name", '')
    localStorage.setItem("strenght", 0)
    localStorage.setItem("health", 0)
    localStorage.removeItem("position")

  }

  render() {

    console.log(this.state)

    const characterCreated = this.state.strenght !== 0 && this.state.health !== 0 && this.state.name !== ''

    return (
      <Router>
        <div className="gamestory">
          <Header
            characterCreated={characterCreated}
            resetCharacter={() => this.resetCharacter()}
          />
          <Route exact path={process.env.PUBLIC_URL + '/'} component={Home}/>
          <Route path={process.env.PUBLIC_URL + '/character'} render={() => (
            <Character
              characterCreated={characterCreated}
              handleChange={this.handleChange.bind(this)}
              createCharacter={this.createCharacter.bind(this)}
              name={this.state.name}
              strenght={this.state.strenght}
              health={this.state.health}/>
          )} />
          <Route path={process.env.PUBLIC_URL + '/game'} render={() => (
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
