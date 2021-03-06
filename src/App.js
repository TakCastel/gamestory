import React, { Component } from 'react'
import { BrowserRouter as Router,  Route,  Link } from 'react-router-dom'
import { getRandomDice } from './Services.js'
import Character from './Character.js'
import Game from './Game.js'
import Header from './Header.js'
import './App.css'

const Home = () => (
  <div>
    <h2 className="title">Le site dont <strong>vous</strong> êtes le héros.</h2>
    <Link className="btn btn-primary" to={process.env.PUBLIC_URL + '/character'}>Commencer l'aventure</Link>
  </div>
)

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      strenght: 0,
      maxstrenght: 0,
      health: 0,
      maxhealth: 0,
      gold: 10,
      position: 2,
      // potion: 0,
      // weapon: '',
      // items: ''
    };
  }

  // chooseDifficulty() {
  //   gold = difficulty.value + this.state.gold
  //   localStorage.setItem("gold", this.state.gold)
  // }

  componentDidMount() {
    const name = localStorage.getItem("name")
    const strenght = parseInt(localStorage.getItem("strenght"), 10)
    const health = parseInt(localStorage.getItem("health"), 10)
    const gold = parseInt(localStorage.getItem("gold"), 10)
    const position = parseInt(localStorage.getItem("position"), 10)
    // const potion = parseInt(localStorage.getItem("potion"), 0)
    // const weapon = localStorage.getItem("weapon")
    // const items = localStorage.getItem("items")

    if (name !== null) {
      this.setState({name})
    }
    if (!isNaN(strenght)) {
      this.setState({strenght})
    }
    if (!isNaN(health)) {
      this.setState({health})
    }
    if (!isNaN(gold)) {
      this.setState({gold})
    }
    if (!isNaN(position)) {
      this.setState({position})
    }
  }

  handleChange(event) {
    this.setState({name: event.target.value})
  }

  createCharacter() {
    const strenght = getRandomDice(6,12)
    const health = getRandomDice(12,24)

    this.setState({strenght: strenght})
    this.setState({health: health})
    this.setState({maxstrenght: strenght})
    this.setState({maxhealth: health})
    this.setState({position: 2})

    localStorage.setItem("name", this.state.name)
    localStorage.setItem("strenght", strenght)
    localStorage.setItem("health", health)
    localStorage.setItem("maxstrenght", strenght)
    localStorage.setItem("maxhealth", health)

    localStorage.removeItem("position")
    localStorage.removeItem("gold")
  }

  changePosition(id) {
    console.log(id)
    this.setState({position: id})
    localStorage.setItem("position", id)
  }

  getModification(step) {

    if (step.modifiers) {

      var strenght = this.state.strenght
      var health = this.state.health
      var gold = this.state.gold

      step.modifiers.map((modifier, i) => {
        console.log(modifier)

        switch (modifier.type) {
          case "strenght":
            strenght = modifier.value + this.state.strenght
            break
          case "health":
            health = modifier.value + this.state.health
            if (health < 0) {
              health = 0
            }
            break
          case "gold":
            gold = modifier.value + this.state.gold
            break
          default:
            break
        }
        return modifier
      })

      this.setState({strenght: strenght, health: health, gold: gold})

      localStorage.setItem("strenght", strenght)
      localStorage.setItem("health", health)
      localStorage.setItem("gold", gold)
    }
  }

  resetCharacter() {
    this.setState({name: ''})
    this.setState({strenght: 0})
    this.setState({health: 0})
    this.setState({gold: 10})
    this.setState({position: 2})

    localStorage.setItem("name", '')
    localStorage.setItem("strenght", 0)
    localStorage.setItem("health", 0)
    localStorage.removeItem("position")
    localStorage.removeItem("gold")
  }

  amountReached() {
    if (this.state.maxhealth < this.state.health) {
      this.setState('health': maxhealth)
    }
  }

  render() {

    const characterCreated = this.state.strenght !== 0 && this.state.health >= 0

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
              changePosition={(id) => this.changePosition(id)}
              getModification={(step) => this.getModification(step)}
              resetCharacter={() => this.resetCharacter()}
              name={this.state.name}
              strenght={this.state.strenght}
              health={this.state.health}
              gold={this.state.gold}
              position={this.state.position}/>
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
